"use client";
// Browser-side persistence for drivers and documents added in the dashboard.
//
// Everything lives in IndexedDB (files can be several MB, beyond localStorage
// limits). Data is per browser: a verification link opened on another device
// only sees the seed data. To share data across devices, replace these
// functions with calls to an API backed by a database; nothing else needs to
// change.

const DB_NAME = "quickdriverscard";
const DB_VERSION = 2;
const CHANNEL = "qdc-store";

let dbPromise = null;

function openDb() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      const has = (n) => db.objectStoreNames.contains(n);
      if (!has("drivers")) db.createObjectStore("drivers", { keyPath: "id" });
      if (!has("versions")) db.createObjectStore("versions", { keyPath: "id" }).createIndex("driverId", "driverId");
      if (!has("files")) db.createObjectStore("files", { keyPath: "id" });
      // v2: latest verification result per document version.
      if (!has("verifications")) db.createObjectStore("verifications", { keyPath: "versionId" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

async function tx(stores, mode, fn) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const t = db.transaction(stores, mode);
    const result = fn(...stores.map((s) => t.objectStore(s)));
    t.oncomplete = () => resolve(result?.result ?? result);
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error);
  });
}

const all = (store) => tx([store], "readonly", (s) => s.getAll());

/* ---------- Change notifications (this tab + other tabs) ---------- */

let channel = null;
function getChannel() {
  if (!channel && typeof BroadcastChannel !== "undefined") channel = new BroadcastChannel(CHANNEL);
  return channel;
}

function notify() {
  window.dispatchEvent(new Event(CHANNEL));
  getChannel()?.postMessage("change");
}

export function subscribe(cb) {
  window.addEventListener(CHANNEL, cb);
  const ch = getChannel();
  ch?.addEventListener("message", cb);
  return () => {
    window.removeEventListener(CHANNEL, cb);
    ch?.removeEventListener("message", cb);
  };
}

/* ---------- Reads ---------- */

export async function loadLocal() {
  const [drivers, versions, verifications] = await Promise.all([all("drivers"), all("versions"), all("verifications")]);
  return { drivers, versions, verifications };
}

export function getFile(id) {
  return tx(["files"], "readonly", (s) => s.get(id));
}

/* ---------- Writes ---------- */

const uid = (p) => `${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

async function putFile(file) {
  if (!file) return null;
  const record = { id: uid("f"), blob: file, name: file.name, type: file.type, size: file.size };
  await tx(["files"], "readwrite", (s) => s.put(record));
  return { id: record.id, name: record.name, type: record.type, size: record.size };
}

// `versions` items: { type, number, issued, expires, file?: File }
export async function addVersions(driverId, versions) {
  const now = new Date().toISOString();
  const records = [];
  for (const v of versions) {
    records.push({
      id: uid("v"),
      driverId,
      type: v.type,
      number: v.number || "",
      issued: v.issued,
      expires: v.expires,
      file: await putFile(v.file),
      uploadedAt: now,
      source: "local",
    });
  }
  await tx(["versions"], "readwrite", (s) => records.forEach((r) => s.put(r)));
  notify();
  return records;
}

export async function createDriver(record, versions = []) {
  const driver = { ...record, source: "local", createdAt: new Date().toISOString() };
  await tx(["drivers"], "readwrite", (s) => s.put(driver));
  const saved = versions.length ? await addVersions(driver.id, versions) : (notify(), []);
  return { ...driver, versions: saved };
}

export async function saveVerification(result) {
  await tx(["verifications"], "readwrite", (s) => s.put(result));
  notify();
}

export async function deleteDriver(id) {
  const { versions } = await loadLocal();
  const mine = versions.filter((v) => String(v.driverId) === String(id));
  await tx(["drivers", "versions", "files", "verifications"], "readwrite", (d, v, f, c) => {
    d.delete(id);
    mine.forEach((x) => {
      v.delete(x.id);
      c.delete(x.id);
      if (x.file) f.delete(x.file.id);
    });
  });
  notify();
}

export async function deleteVersion(version) {
  await tx(["versions", "files"], "readwrite", (v, f) => {
    v.delete(version.id);
    if (version.file) f.delete(version.file.id);
  });
  notify();
}
