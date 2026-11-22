// Documents a Nigerian driver/vehicle owner is expected to carry, who issues
// them, and how each can be checked against the issuing authority.
//
// Research notes and sources: docs/nigeria-document-verification.md
// Portals and fees change; confirm details on official channels before relying
// on them in production.

export const REQUIREMENT = {
  required: "Required for every vehicle",
  commercial: "Required for commercial vehicles",
  imported: "Required for imported vehicles",
  optional: "Only in some cases",
};

// verify.api: which automatic lookup the server can run (see src/lib/verification).
// verify.portal: the official place to check by hand when there's no API.
export const NG_DOCUMENTS = [
  {
    type: "Driver's Licence",
    prefix: "DL",
    issuer: "Federal Road Safety Corps (FRSC)",
    requirement: "required",
    years: 5,
    numberLabel: "Licence number",
    numberHint: "e.g. ABC12345AA12",
    verify: {
      api: "licence",
      portal: {
        name: "FRSC Driver's Licence Verification",
        url: "https://www.ndlverification.frsc.gov.ng/",
        input: "licence number",
        field: "number",
      },
      summary: "Checked against FRSC licence records by licence number.",
    },
  },
  {
    type: "Vehicle Registration",
    prefix: "VR",
    issuer: "State Motor Licensing Authority · FRSC NVIS",
    requirement: "required",
    noExpiry: true,
    numberLabel: "Plate number",
    numberHint: "Uses the vehicle's plate number",
    numberFromPlate: true,
    verify: {
      api: "plate",
      portal: {
        name: "FRSC NVIS plate check",
        url: "https://nvis.frsc.gov.ng/VehicleManagement/VerifyPlateNo",
        input: "plate number",
        field: "plate",
      },
      summary: "Plate checked against the National Vehicle Identification Scheme.",
    },
  },
  {
    type: "Vehicle Licence",
    prefix: "VL",
    issuer: "State Motor Licensing Authority / Board of Internal Revenue",
    requirement: "required",
    years: 1,
    numberLabel: "Licence / receipt number",
    verify: {
      portal: {
        name: "AutoReg verification",
        url: "https://verify.autoreg.ng/",
        input: "plate number",
        field: "plate",
      },
      summary: "Checked on AutoReg by plate number (participating states).",
    },
  },
  {
    type: "Proof of Ownership",
    prefix: "PO",
    issuer: "State Motor Licensing Authority",
    requirement: "required",
    years: 1,
    numberLabel: "Certificate number",
    verify: {
      portal: {
        name: "AutoReg verification",
        url: "https://verify.autoreg.ng/",
        input: "plate number",
        field: "plate",
      },
      summary: "Ownership checked on AutoReg by plate number (participating states).",
    },
  },
  {
    type: "Motor Insurance",
    prefix: "MI",
    issuer: "Licensed insurer · recorded on NIID",
    requirement: "required",
    years: 1,
    numberLabel: "Policy number",
    note: "Third-party cover is the legal minimum.",
    verify: {
      portal: {
        name: "NIID (askniid.org)",
        url: "https://askniid.org/",
        input: "plate number (or chassis number)",
        field: "plate",
        alt: "USSD *565*11#",
      },
      summary: "Policy checked on the Nigerian Insurance Industry Database.",
    },
  },
  {
    type: "Roadworthiness Certificate",
    prefix: "RW",
    issuer: "State Vehicle Inspection Service (VIO/VIS)",
    requirement: "required",
    years: 1,
    numberLabel: "Inspection / certificate number",
    verify: {
      portal: {
        name: "Lagos DVIS (Lagos vehicles)",
        url: "https://dvis.lg.gov.ng/verify/",
        input: "vehicle inspection number or plate number",
        field: "number",
      },
      summary: "Lagos certificates can be checked on DVIS; other states verify at the VIO office.",
    },
  },
  {
    type: "Hackney Permit",
    prefix: "HP",
    issuer: "State Motor Licensing Authority",
    requirement: "commercial",
    years: 1,
    numberLabel: "Permit number",
    verify: {
      portal: {
        name: "AutoReg verification",
        url: "https://verify.autoreg.ng/",
        input: "plate number",
        field: "plate",
      },
      summary: "Checked on AutoReg by plate number (participating states).",
    },
  },
  {
    type: "Customs Duty Papers",
    prefix: "CD",
    issuer: "Nigeria Customs Service",
    requirement: "imported",
    noExpiry: true,
    numberLabel: "VIN / chassis number",
    numberFromChassis: true,
    verify: {
      portal: {
        name: "Customs Verification Management System (CVMS)",
        url: "https://customs.gov.ng/",
        input: "VIN (chassis number) · ₦15,000 fee",
        field: "chassis",
      },
      summary: "Duty and clearance checked on the Customs CVMS by VIN.",
    },
  },
  {
    type: "Police e-CMR Certificate",
    prefix: "CMR",
    issuer: "Nigeria Police Force",
    requirement: "optional",
    noExpiry: true,
    numberLabel: "e-CMR number",
    note: "Enforcement was suspended by the IGP in July 2024.",
    verify: {
      portal: {
        name: "Nigeria Police Force (e-CMR)",
        url: "https://www.npf.gov.ng/",
        input: "plate number",
        field: "plate",
      },
      summary: "Checked on the Police Central Motor Registry.",
    },
  },
];

export const docInfo = (type) => NG_DOCUMENTS.find((d) => d.type === type) ?? null;

// Which document types this driver's vehicle must have.
export function requiredTypes(driver) {
  return NG_DOCUMENTS.filter(
    (d) =>
      d.requirement === "required" ||
      (d.requirement === "commercial" && driver.vehicle_use === "commercial") ||
      (d.requirement === "imported" && driver.imported === true)
  ).map((d) => d.type);
}

export function missingTypes(driver) {
  const have = new Set(driver.documents.map((d) => d.type));
  return requiredTypes(driver).filter((t) => !have.has(t));
}

// The value a portal needs, taken from the version or the driver record.
export function portalInput(info, driver, version) {
  const f = info?.verify?.portal?.field;
  if (f === "plate") return driver.plate_number || "";
  if (f === "chassis") return version?.number || driver.chassis_number || "";
  return version?.number || "";
}
