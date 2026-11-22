// Compare what we hold on file with what the issuing authority returned.

const tokens = (s) =>
  String(s ?? "")
    .toUpperCase()
    .replace(/[^A-Z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const alnum = (s) => String(s ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");

// Accepts YYYY-MM-DD, DD-MM-YYYY, DD/MM/YYYY and ISO timestamps.
export function toISODate(s) {
  if (!s) return null;
  const str = String(s).trim();
  let m = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = str.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  const d = new Date(str);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

export function matchLicence(record, found) {
  const out = [];
  if (found.number) out.push({ field: "Licence number", ok: alnum(found.number) === alnum(record.number) });
  if (found.firstName || found.lastName) {
    const have = new Set(tokens([found.firstName, found.middleName, found.lastName].join(" ")));
    const want = [...tokens(record.firstName), ...tokens(record.lastName)];
    out.push({ field: "Name", ok: want.length > 0 && want.every((t) => have.has(t)) });
  }
  if (found.birthDate && record.dob) out.push({ field: "Date of birth", ok: toISODate(found.birthDate) === toISODate(record.dob) });
  if (found.expires && record.expires) out.push({ field: "Expiry date", ok: toISODate(found.expires) === toISODate(record.expires) });
  return out;
}

export function matchPlate(record, found) {
  const out = [{ field: "Plate number", ok: alnum(found.plate || record.plate) === alnum(record.plate) }];
  if (found.vehicle && record.vehicle) {
    const want = tokens(record.vehicle);
    const have = new Set(tokens(found.vehicle));
    out.push({ field: "Vehicle", ok: want.some((t) => have.has(t)) });
  }
  if (found.chassis && record.chassis) out.push({ field: "Chassis number", ok: alnum(found.chassis) === alnum(record.chassis) });
  return out;
}

export const outcome = (matches) => (matches.every((m) => m.ok) ? "verified" : "mismatch");
