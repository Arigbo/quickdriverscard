// Demo data for the portfolio build.
// Each seed document stores its current expiry as a day offset from "today"
// (so the demo always shows a realistic mix of statuses); earlier versions are
// generated from it as the document's history.

import { docInfo, NG_DOCUMENTS } from "./nigeria";

const DAY = 24 * 60 * 60 * 1000;

function fromToday(days) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return new Date(d.getTime() + days * DAY).toISOString().slice(0, 10);
}

const seed = [
  {
    id: 1,
    first_name: "James",
    middle_name: "Akin",
    last_name: "Adeleke",
    date_of_birth: "1999-10-25",
    gender: "Male",
    phone_number: "0801 234 5678",
    emergency_phone_number: "0901 122 3344",
    emergency_contact_name: "Fatima Adeleke",
    relationship_to_driver: "Mother",
    state: "Lagos",
    lga: "Ikeja",
    house_address: "15 Bolanle Street, Ikeja, Lagos",
    car: "BMW X3",
    vendor_of_the_vehicle: "Elizade Motors",
    plate_number: "LAG 456 BB",
    vehicle_model_year: 2022,
    engine_number: "BMW-X12345678",
    chassis_number: "BMCHAS-ABCDE12345",
    last_service_date: "2026-08-20",
    occupation: "Software Engineer",
    driving_since: 2021,
    insurance_policy_number: "INS-LAG-0012345",
    vehicle_use: "private",
    imported: true,
    documents: [
      { doc: "Driver's Licence", in: 590 },
      { doc: "Vehicle Registration", in: null },
      { doc: "Vehicle Licence", in: 212 },
      { doc: "Proof of Ownership", in: 212 },
      { doc: "Motor Insurance", in: 41 },
      { doc: "Roadworthiness Certificate", in: 212 },
      { doc: "Customs Duty Papers", in: null },
    ],
  },
  {
    id: 2,
    first_name: "Maria",
    middle_name: "Chiamaka",
    last_name: "Okorie",
    date_of_birth: "1992-05-18",
    gender: "Female",
    phone_number: "0702 345 6789",
    emergency_phone_number: "0812 233 4455",
    emergency_contact_name: "Emeka Okorie",
    relationship_to_driver: "Brother",
    state: "Oyo",
    lga: "Ibadan South-West",
    house_address: "24 Femi-Johnson Street, Ring Road, Ibadan",
    car: "Toyota Camry",
    vendor_of_the_vehicle: "Kobo Motors",
    plate_number: "OYO 789 CD",
    vehicle_model_year: 2021,
    engine_number: "TOY-Y987654321",
    chassis_number: "TYCHAS-FGHIJ67890",
    last_service_date: "2026-09-10",
    occupation: "Accountant",
    driving_since: 2015,
    insurance_policy_number: "INS-OYO-0023456",
    vehicle_use: "private",
    imported: true,
    documents: [
      { doc: "Driver's Licence", in: 830 },
      { doc: "Vehicle Registration", in: null },
      { doc: "Vehicle Licence", in: 318 },
      { doc: "Proof of Ownership", in: 318 },
      { doc: "Motor Insurance", in: 351 },
      { doc: "Roadworthiness Certificate", in: 148 },
      { doc: "Customs Duty Papers", in: null },
    ],
  },
  {
    id: 3,
    first_name: "Carlos",
    middle_name: "Idris",
    last_name: "Muhammed",
    date_of_birth: "1978-08-12",
    gender: "Male",
    phone_number: "0813 456 7890",
    emergency_phone_number: "0704 455 6677",
    emergency_contact_name: "Hafsat Muhammed",
    relationship_to_driver: "Wife",
    state: "FCT",
    lga: "Bwari",
    house_address: "9 Abagana Street, Area 11, Garki, Abuja",
    car: "Ford F-150",
    vendor_of_the_vehicle: "Coscharis Motors",
    plate_number: "FCT 123 AB",
    vehicle_model_year: 2020,
    engine_number: "FRD-F150-123456",
    chassis_number: "FDCHAS-KLMNO12345",
    last_service_date: "2026-03-25",
    occupation: "Civil Servant",
    driving_since: 1999,
    insurance_policy_number: "INS-FCT-0034567",
    vehicle_use: "private",
    imported: true,
    documents: [
      { doc: "Driver's Licence", in: -18 },
      { doc: "Vehicle Registration", in: null },
      { doc: "Vehicle Licence", in: 22 },
      { doc: "Proof of Ownership", in: 22 },
      { doc: "Motor Insurance", in: 270 },
      { doc: "Roadworthiness Certificate", in: 104 },
      { doc: "Customs Duty Papers", in: null },
    ],
  },
  {
    id: 4,
    first_name: "Sophie",
    middle_name: "Ijeoma",
    last_name: "Okafor",
    date_of_birth: "1995-12-05",
    gender: "Female",
    phone_number: "0915 678 9012",
    emergency_phone_number: "0806 677 8899",
    emergency_contact_name: "Chidi Okafor",
    relationship_to_driver: "Father",
    state: "Rivers",
    lga: "Port Harcourt",
    house_address: "3B Elelenwo Street, GRA Phase 2, Port Harcourt",
    car: "Tesla Model 3",
    vendor_of_the_vehicle: "Private Seller",
    plate_number: "RIV 321 EF",
    vehicle_model_year: 2023,
    engine_number: "TSLA-MD3-789012",
    chassis_number: "TSCHAS-PQRST89012",
    last_service_date: "2026-10-01",
    occupation: "Entrepreneur",
    driving_since: 2018,
    insurance_policy_number: "INS-RIV-0045678",
    vehicle_use: "private",
    imported: true,
    documents: [
      { doc: "Driver's Licence", in: 1270 },
      { doc: "Vehicle Registration", in: null },
      { doc: "Vehicle Licence", in: 301 },
      { doc: "Proof of Ownership", in: 301 },
      { doc: "Motor Insurance", in: 296 },
      { doc: "Roadworthiness Certificate", in: 301 },
      { doc: "Customs Duty Papers", in: null },
    ],
  },
  {
    id: 5,
    first_name: "Ahmed",
    middle_name: "Tunde",
    last_name: "Bello",
    date_of_birth: "1968-07-02",
    gender: "Male",
    phone_number: "0807 890 1234",
    emergency_phone_number: "0708 899 0011",
    emergency_contact_name: "Adamu Bello",
    relationship_to_driver: "Son",
    state: "Enugu",
    lga: "Enugu East",
    house_address: "45 Udenu Avenue, Independence Layout, Enugu",
    car: "Honda Civic",
    vendor_of_the_vehicle: "Mandilas Motors",
    plate_number: "ENU 987 GH",
    vehicle_model_year: 2019,
    engine_number: "HND-CV-3456789",
    chassis_number: "HDCVCHAS-UVWXY90123",
    last_service_date: "2026-05-01",
    occupation: "Retired Teacher",
    driving_since: 1988,
    insurance_policy_number: "INS-ENU-0056789",
    vehicle_use: "private",
    imported: true,
    documents: [
      { doc: "Driver's Licence", in: 154 },
      { doc: "Vehicle Registration", in: null },
      { doc: "Vehicle Licence", in: 154 },
      { doc: "Proof of Ownership", in: 154 },
      { doc: "Motor Insurance", in: -63 },
      { doc: "Roadworthiness Certificate", in: 154 },
    ],
  },
  {
    id: 6,
    first_name: "Ngozi",
    middle_name: "Amara",
    last_name: "Eze",
    date_of_birth: "1988-03-14",
    gender: "Female",
    phone_number: "0703 112 9087",
    emergency_phone_number: "0811 765 4321",
    emergency_contact_name: "Obinna Eze",
    relationship_to_driver: "Husband",
    state: "Anambra",
    lga: "Awka South",
    house_address: "7 Zik Avenue, Awka, Anambra",
    car: "Kia Sportage",
    vendor_of_the_vehicle: "Kia Motors Nigeria",
    plate_number: "AWK 204 KA",
    vehicle_model_year: 2022,
    engine_number: "KIA-SP-55120934",
    chassis_number: "KACHAS-ZXCVB33421",
    last_service_date: "2026-07-14",
    occupation: "Pharmacist",
    driving_since: 2010,
    insurance_policy_number: "INS-ANA-0067890",
    vehicle_use: "private",
    imported: false,
    documents: [
      { doc: "Driver's Licence", in: 702 },
      { doc: "Vehicle Registration", in: null },
      { doc: "Vehicle Licence", in: 333 },
      { doc: "Proof of Ownership", in: 333 },
      { doc: "Motor Insurance", in: 189 },
      { doc: "Roadworthiness Certificate", in: 189 },
    ],
  },
  {
    id: 7,
    first_name: "Tobi",
    middle_name: "Olumide",
    last_name: "Fashola",
    date_of_birth: "2001-01-30",
    gender: "Male",
    phone_number: "0909 334 2210",
    emergency_phone_number: "0802 556 1188",
    emergency_contact_name: "Bisi Fashola",
    relationship_to_driver: "Mother",
    state: "Ogun",
    lga: "Abeokuta South",
    house_address: "12 Kuto Road, Abeokuta, Ogun",
    car: "Hyundai Elantra",
    vendor_of_the_vehicle: "Stallion Motors",
    plate_number: "ABK 611 TF",
    vehicle_model_year: 2020,
    engine_number: "HYN-EL-77231045",
    chassis_number: "HYCHAS-LKJHG55678",
    last_service_date: "2026-06-02",
    occupation: "Logistics Rider",
    driving_since: 2020,
    insurance_policy_number: "INS-OGN-0078901",
    vehicle_use: "commercial",
    imported: true,
    documents: [
      { doc: "Driver's Licence", in: 68 },
      { doc: "Vehicle Registration", in: null },
      { doc: "Vehicle Licence", in: 287 },
      { doc: "Proof of Ownership", in: 287 },
      { doc: "Motor Insurance", in: 12 },
      { doc: "Roadworthiness Certificate", in: 287 },
      { doc: "Customs Duty Papers", in: null },
    ],
  },
  {
    id: 8,
    first_name: "Halima",
    middle_name: "Zainab",
    last_name: "Sani",
    date_of_birth: "1990-09-09",
    gender: "Female",
    phone_number: "0816 220 4433",
    emergency_phone_number: "0705 448 9910",
    emergency_contact_name: "Musa Sani",
    relationship_to_driver: "Father",
    state: "Kano",
    lga: "Nassarawa",
    house_address: "21 Bompai Road, Nassarawa GRA, Kano",
    car: "Toyota Hilux",
    vendor_of_the_vehicle: "Toyota Nigeria",
    plate_number: "KAN 870 HS",
    vehicle_model_year: 2024,
    engine_number: "TOY-HX-90812233",
    chassis_number: "THCHAS-MNBVC77812",
    last_service_date: "2026-10-28",
    occupation: "Architect",
    driving_since: 2012,
    insurance_policy_number: "INS-KAN-0089012",
    vehicle_use: "private",
    imported: false,
    documents: [
      { doc: "Driver's Licence", in: 960 },
      { doc: "Vehicle Registration", in: null },
      { doc: "Vehicle Licence", in: 330 },
      { doc: "Proof of Ownership", in: 330 },
      { doc: "Motor Insurance", in: 352 },
      { doc: "Roadworthiness Certificate", in: 290 },
    ],
  },
];

export const EXPIRING_WINDOW_DAYS = 60;

export const DOCUMENT_TYPES = NG_DOCUMENTS;

const typeInfo = (type) => docInfo(type) ?? { type, prefix: "DOC", years: 1 };

/* ---------- Dates ---------- */

function toISO(d) {
  return d.toISOString().slice(0, 10);
}

export function addYears(iso, years) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCFullYear(d.getUTCFullYear() + years);
  return toISO(d);
}

export function addDays(iso, days) {
  const d = new Date(iso + "T00:00:00Z");
  return toISO(new Date(d.getTime() + days * DAY));
}

export function daysUntil(isoDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(isoDate + "T00:00:00");
  return Math.round((target - today) / DAY);
}

export function formatDate(isoDate) {
  if (!isoDate) return "—";
  return new Date(isoDate + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function relativeDays(isoDate) {
  if (!isoDate) return "no expiry";
  const days = daysUntil(isoDate);
  if (days === 0) return "today";
  if (days > 0) return days === 1 ? "in 1 day" : `in ${days} days`;
  const ago = Math.abs(days);
  return ago === 1 ? "1 day ago" : `${ago} days ago`;
}

/* ---------- Status ---------- */

export function docStatus(isoDate) {
  if (!isoDate) return "valid"; // documents that never expire
  const days = daysUntil(isoDate);
  if (days < 0) return "expired";
  if (days <= EXPIRING_WINDOW_DAYS) return "expiring";
  return "valid";
}

// Status of any version: the current one is valid/expiring/expired; an older
// one either ran out ("lapsed") or was replaced before it did.
export function versionStatus(doc, version) {
  if (version.id === doc.versions[0].id) return docStatus(version.expires);
  return version.expires && daysUntil(version.expires) < 0 ? "lapsed" : "replaced";
}

export function driverStatus(driver) {
  if (!driver.documents.length) return "none";
  const statuses = driver.documents.map((d) => docStatus(d.expires));
  if (statuses.includes("expired")) return "expired";
  if (statuses.includes("expiring")) return "expiring";
  return "valid";
}

export const STATUS_LABEL = {
  valid: "Valid",
  expiring: "Expiring soon",
  expired: "Expired",
  none: "No documents",
  lapsed: "Expired",
  replaced: "Replaced",
};

/* ---------- Names ---------- */

export const fullName = (d) =>
  [d.first_name, d.middle_name, d.last_name].filter(Boolean).join(" ");
export const shortName = (d) => [d.first_name, d.last_name].filter(Boolean).join(" ");
export const initials = (d) =>
  `${d.first_name?.[0] ?? ""}${d.last_name?.[0] ?? ""}`.toUpperCase();
export const cardNumber = (d) => `QDC-${String(d.id).padStart(4, "0")}`;

/* ---------- Assembly ---------- */

// Group versions by document type, newest first. `expires` on each document
// mirrors its current (latest) version so status checks stay simple.
export function buildDocuments(versions) {
  const byType = new Map();
  for (const v of versions) {
    if (!byType.has(v.type)) byType.set(v.type, []);
    byType.get(v.type).push(v);
  }
  return [...byType.entries()].map(([type, list]) => {
    const sorted = [...list].sort((a, b) =>
      a.issued === b.issued
        ? (b.uploadedAt ?? "").localeCompare(a.uploadedAt ?? "")
        : b.issued.localeCompare(a.issued)
    );
    return { type, versions: sorted, expires: sorted[0].expires };
  });
}

function docNumber(driver, prefix, k) {
  const state = driver.state.replace(/[^A-Z]/gi, "").slice(0, 3).toUpperCase();
  const n = ((driver.id * 7919 + [...prefix].reduce((a, c) => a * 31 + c.charCodeAt(0), 0) * 131 + k * 977) % 900000) + 100000;
  return `${prefix}-${state}-${n}`;
}

function seedVersions(driver) {
  const out = [];
  driver.documents.forEach(({ doc, in: days }, ti) => {
    const { prefix, years } = typeInfo(doc);
    const base = { driverId: driver.id, type: doc, file: null, source: "seed" };
    if (days === null) {
      // Non-expiring documents have a single version.
      out.push({
        ...base,
        id: `s-${driver.id}-${ti}-0`,
        number: doc === "Vehicle Registration" ? driver.plate_number : doc === "Customs Duty Papers" ? driver.chassis_number : docNumber(driver, prefix, 0),
        issued: fromToday(-(400 + driver.id * 53)),
        expires: null,
      });
      return;
    }
    // Longer-serving documents have more renewals on record.
    const history = years >= 5 ? 1 : 2 + ((driver.id + ti) % 2);
    let expires = fromToday(days);
    let issued = addYears(expires, -years);
    for (let k = 0; k <= history; k++) {
      out.push({ ...base, id: `s-${driver.id}-${ti}-${k}`, number: docNumber(driver, prefix, k), issued, expires });
      // Each earlier version expired the day before its successor was issued.
      expires = addDays(issued, -1);
      issued = addYears(expires, -years);
    }
  });
  return out;
}

// Illustrative verification results for the demo data (clearly marked as demo).
function seedVerifications(versions) {
  const out = [];
  for (const v of versions) {
    if (!v.id.endsWith("-0")) continue; // current versions only
    const info = typeInfo(v.type);
    const portal = info.verify?.portal;
    const driverId = v.driverId;
    const base = { versionId: v.id, driverId, demo: true, checkedAt: addDays(v.issued, 3) + "T10:00:00.000Z" };
    if (v.type === "Driver's Licence") {
      out.push({
        ...base,
        status: driverId === 3 ? "mismatch" : "verified",
        method: "api",
        provider: "FRSC licence lookup",
        reference: `DEMO-DL-${driverId}${v.number.slice(-4)}`,
        matches: [
          { field: "Licence number", ok: true },
          { field: "Name", ok: true },
          { field: "Expiry date", ok: driverId !== 3 },
        ],
        note: driverId === 3 ? "FRSC record shows the licence has expired." : "",
      });
    } else if (v.type === "Vehicle Registration") {
      out.push({ ...base, status: "verified", method: "api", provider: "NVIS plate lookup", reference: `DEMO-VR-${driverId}`, matches: [{ field: "Plate number", ok: true }, { field: "Vehicle", ok: true }] });
    } else if (v.type === "Motor Insurance" && driverId !== 7) {
      out.push({
        ...base,
        status: driverId === 5 ? "not_found" : "verified",
        method: "manual",
        provider: portal?.name,
        note: driverId === 5 ? "Policy not found on NIID for this plate." : "",
      });
    } else if (v.type === "Customs Duty Papers" && driverId % 2 === 0) {
      out.push({ ...base, status: "verified", method: "manual", provider: portal?.name, reference: `DEMO-CVMS-${driverId}` });
    }
  }
  return out;
}

// Combine driver records with their document versions (seed + uploads) and
// the latest verification result for each version.
export function assemble(records, versions, verifications = []) {
  const checks = new Map();
  for (const c of verifications) {
    const prev = checks.get(c.versionId);
    if (!prev || (c.checkedAt ?? "") >= (prev.checkedAt ?? "")) checks.set(c.versionId, c);
  }
  const byDriver = new Map();
  for (const v of versions) {
    const key = String(v.driverId);
    if (!byDriver.has(key)) byDriver.set(key, []);
    byDriver.get(key).push({ ...v, verification: checks.get(v.id) ?? null });
  }
  return records.map((r) => ({
    ...r,
    documents: buildDocuments(byDriver.get(String(r.id)) ?? []),
  }));
}

export function getSeedRecords() {
  return seed.map((d) => {
    const record = { ...d, source: "seed" };
    delete record.documents;
    return record;
  });
}

export function getSeedVersions() {
  return seed.flatMap(seedVersions);
}

export function getSeedVerifications() {
  return seedVerifications(getSeedVersions());
}

export function getDrivers() {
  return assemble(getSeedRecords(), getSeedVersions(), getSeedVerifications());
}

export function getDriver(id) {
  return getDrivers().find((d) => String(d.id) === String(id)) ?? null;
}
