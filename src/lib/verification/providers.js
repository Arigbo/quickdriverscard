import "server-only";
import { matchLicence, matchPlate, outcome } from "./match";

// Server-side adapters for third-party verification APIs. Keys never reach the
// browser. With no keys configured, lookups run in a clearly labelled
// simulated mode so the product can be demoed end to end.
//
// Request shapes follow each provider's published docs at the time of writing.
// Confirm field names against the current API reference before going live.

const env = (k, d = "") => process.env[k] || d;

export function capabilities() {
  const dojah = !!(env("DOJAH_APP_ID") && env("DOJAH_SECRET_KEY"));
  const prembly = !!(env("PREMBLY_APP_ID") && env("PREMBLY_API_KEY"));
  return {
    licence: { live: dojah, provider: dojah ? "FRSC via Dojah" : "FRSC licence lookup" },
    plate: { live: prembly, provider: prembly ? "NVIS via Prembly" : "NVIS plate lookup" },
  };
}

async function call(url, init) {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(15000), cache: "no-store" });
  const body = await res.json().catch(() => ({}));
  return { res, body };
}

const pick = (o, ...keys) => keys.map((k) => o?.[k]).find((v) => v != null && v !== "");

/* ---------- Driver's licence (FRSC) via Dojah ---------- */
// GET {base}/api/v1/kyc/dl?license_number=…  headers: AppId, Authorization (secret key)
// Sandbox base: https://sandbox.dojah.io · Live: https://api.dojah.io
async function dojahLicence(record) {
  const base = env("DOJAH_BASE_URL", "https://api.dojah.io");
  const url = `${base}/api/v1/kyc/dl?license_number=${encodeURIComponent(record.number)}`;
  const { res, body } = await call(url, {
    headers: { AppId: env("DOJAH_APP_ID"), Authorization: env("DOJAH_SECRET_KEY"), Accept: "application/json" },
  });
  if (res.status === 404 || (res.ok && !body?.entity)) return { found: null };
  if (!res.ok) throw new Error(body?.error || `Dojah responded ${res.status}`);
  const e = body.entity;
  return {
    found: {
      number: pick(e, "licenseNo", "license_no", "licence_no"),
      firstName: pick(e, "firstName", "first_name"),
      middleName: pick(e, "middleName", "middle_name"),
      lastName: pick(e, "lastName", "last_name"),
      birthDate: pick(e, "birthDate", "date_of_birth", "dob"),
      issued: pick(e, "issuedDate", "issued_date"),
      expires: pick(e, "expiryDate", "expiry_date"),
      state: pick(e, "stateOfIssue", "state_of_issue"),
    },
    reference: pick(e, "uuid", "reference"),
  };
}

/* ---------- Plate / registration (NVIS) via Prembly ---------- */
// POST {base}{path}  headers: app-id, x-api-key  body: { vehicle_number }
async function premblyPlate(record) {
  const base = env("PREMBLY_BASE_URL", "https://api.prembly.com");
  const path = env("PREMBLY_PLATE_PATH", "/identitypass/verification/vehicle");
  const { res, body } = await call(`${base}${path}`, {
    method: "POST",
    headers: {
      "app-id": env("PREMBLY_APP_ID"),
      "x-api-key": env("PREMBLY_API_KEY"),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ vehicle_number: record.plate.replace(/\s+/g, "") }),
  });
  if (!res.ok && res.status !== 404) throw new Error(body?.detail || `Prembly responded ${res.status}`);
  const data = body?.vehicle_data ?? body?.data ?? null;
  const ok = body?.status === true || body?.verification?.status === "VERIFIED";
  if (!ok || !data) return { found: null, reference: body?.verification?.reference };
  return {
    found: {
      plate: pick(data, "plate_number", "vehicle_number", "plateNumber") ?? record.plate,
      vehicle: [pick(data, "vehicle_make", "make"), pick(data, "vehicle_model", "model", "vehicle_name", "name")].filter(Boolean).join(" "),
      chassis: pick(data, "chassis_number", "vin"),
      colour: pick(data, "vehicle_color", "color", "colour"),
    },
    reference: body?.verification?.reference,
  };
}

/* ---------- Simulated lookups ---------- */
// Deterministic so the demo is predictable: numbers containing "000" are
// treated as not found; everything else echoes the record back.
function simulated(kind, record) {
  const key = kind === "licence" ? record.number : record.plate;
  if (/000/.test(key)) return { found: null, reference: `SIM-${Date.now().toString(36).toUpperCase()}` };
  const found =
    kind === "licence"
      ? { number: record.number, firstName: record.firstName, lastName: record.lastName, expires: record.expires }
      : { plate: record.plate, vehicle: record.vehicle };
  return { found, reference: `SIM-${Date.now().toString(36).toUpperCase()}` };
}

export async function runLookup(kind, record) {
  const caps = capabilities()[kind];
  let result;
  if (!caps.live) result = simulated(kind, record);
  else if (kind === "licence") result = await dojahLicence(record);
  else result = await premblyPlate(record);

  if (!result.found) {
    return { status: "not_found", provider: caps.provider, simulated: !caps.live, reference: result.reference ?? null, matches: [] };
  }
  const matches = kind === "licence" ? matchLicence(record, result.found) : matchPlate(record, result.found);
  return {
    status: outcome(matches),
    provider: caps.provider,
    simulated: !caps.live,
    reference: result.reference ?? null,
    matches,
    // Expose only non-sensitive fields from the authority's record.
    authority: kind === "licence" ? { expires: result.found.expires ?? null, state: result.found.state ?? null } : { vehicle: result.found.vehicle || null, colour: result.found.colour ?? null },
  };
}
