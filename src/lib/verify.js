"use client";
import { docInfo } from "@/data/nigeria";
import { saveVerification } from "./store";

// Can this document be checked automatically by the server?
export const canAutoVerify = (type) => !!docInfo(type)?.verify?.api;

// Run an automatic check for one document version and store the result.
export async function runCheck(driver, version) {
  const res = await fetch("/api/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: version.type,
      number: version.number,
      plate: driver.plate_number,
      chassis: driver.chassis_number,
      vehicle: driver.car,
      firstName: driver.first_name,
      lastName: driver.last_name,
      dob: driver.date_of_birth,
      expires: version.expires,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok && data.status !== "error") throw new Error(data.error || "Verification failed.");
  const result = {
    ...data,
    versionId: version.id,
    driverId: driver.id,
    note: data.error ?? data.note ?? "",
  };
  await saveVerification(result);
  return result;
}

// Record the outcome of a check done by hand on an official portal.
export async function recordManualCheck(driver, version, { status, reference, note }) {
  const info = docInfo(version.type);
  const result = {
    versionId: version.id,
    driverId: driver.id,
    status,
    method: "manual",
    provider: info?.verify?.portal?.name ?? "Manual check",
    reference: reference || null,
    note: note || "",
    matches: [],
    checkedAt: new Date().toISOString(),
  };
  await saveVerification(result);
  return result;
}
