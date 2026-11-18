import { NextResponse } from "next/server";
import { capabilities, runLookup } from "@/lib/verification/providers";
import { docInfo } from "@/data/nigeria";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Very small in-memory rate limit (per server instance) to stop accidental
// loops from burning paid lookups. Use a shared store in production.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 20;
}

const str = (v, max = 80) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function GET() {
  return NextResponse.json(capabilities());
}

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return NextResponse.json({ error: "Too many checks. Try again in a minute." }, { status: 429 });

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const info = docInfo(str(body.type));
  const kind = info?.verify?.api;
  if (!kind) return NextResponse.json({ error: "This document can't be checked automatically." }, { status: 400 });

  const record = {
    number: str(body.number),
    plate: str(body.plate, 20),
    chassis: str(body.chassis),
    vehicle: str(body.vehicle),
    firstName: str(body.firstName),
    lastName: str(body.lastName),
    dob: str(body.dob, 10),
    expires: str(body.expires, 10),
  };
  if (kind === "licence" && !record.number) return NextResponse.json({ error: "Add the licence number first." }, { status: 400 });
  if (kind === "plate" && !record.plate) return NextResponse.json({ error: "Add the plate number first." }, { status: 400 });

  try {
    const result = await runLookup(kind, record);
    return NextResponse.json({ ...result, method: "api", checkedAt: new Date().toISOString() });
  } catch (err) {
    console.error("verification failed", err);
    return NextResponse.json(
      { status: "error", method: "api", error: "The verification service didn't respond. Try again later.", checkedAt: new Date().toISOString() },
      { status: 502 }
    );
  }
}
