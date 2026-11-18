"use client";
import { useMemo } from "react";
import Link from "next/link";
import { FileWarning, Phone, ShieldAlert, ShieldCheck } from "lucide-react";
import { missingTypes } from "@/data/nigeria";
import Logo from "@/components/Logo";
import Avatar from "@/components/Avatar";
import Reveal from "@/components/Reveal";
import Scramble from "@/components/motion/Scramble";
import Magnetic from "@/components/motion/Magnetic";
import DocumentHistory from "@/components/documents/DocumentHistory";
import { useDrivers } from "@/lib/useDrivers";
import { cardNumber, docStatus, driverStatus, formatDate, fullName } from "@/data/drivers";

const SUMMARY = {
  valid: () => "All documents are valid",
  expiring: (n) => `${n} document${n > 1 ? "s" : ""} expiring soon`,
  expired: (n) => `${n} document${n > 1 ? "s" : ""} expired`,
  none: () => "No documents on file",
};

const EMPTY = [];

export default function VerifyView({ id, seedRecord, seedVersions, seedVerifications }) {
  const records = useMemo(() => (seedRecord ? [seedRecord] : EMPTY), [seedRecord]);
  const { drivers, ready } = useDrivers(records, seedVersions, seedVerifications);
  const driver = drivers.find((d) => String(d.id) === String(id));

  if (!driver) {
    return (
      <main className="verify">
        <VerifyTop />
        {ready ? <NotFound /> : <div className="verify-loading" aria-busy="true" aria-label="Loading record" />}
      </main>
    );
  }

  const status = driverStatus(driver);
  const flagged = driver.documents.filter((d) => docStatus(d.expires) === status).length;
  const verified = driver.documents.filter((d) => d.versions[0].verification?.status === "verified").length;
  const flaggedChecks = driver.documents.filter((d) => ["mismatch", "not_found"].includes(d.versions[0].verification?.status)).length;
  const missing = missingTypes(driver);
  const checkedAt = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main className="verify">
      <VerifyTop />

      <section className="verify-hero">
        <Reveal delay={1.0} className={`verify-status verify-status--${status}`}>
          <span className="badge-dot badge-dot--pulse" aria-hidden="true" />
          {SUMMARY[status](flagged)}
        </Reveal>

        <Reveal delay={1.1} className="verify-facts">
          <span>
            <ShieldCheck size={15} strokeWidth={1.75} /> {verified} of {driver.documents.length} confirmed with issuing authorities
          </span>
          {flaggedChecks > 0 && (
            <span className="tone--expired">
              <ShieldAlert size={15} strokeWidth={1.75} /> {flaggedChecks} failed verification
            </span>
          )}
          {missing.length > 0 && (
            <span className="tone--expiring">
              <FileWarning size={15} strokeWidth={1.75} /> Missing: {missing.join(", ")}
            </span>
          )}
        </Reveal>

        <Reveal as="p" className="verify-label">Plate number</Reveal>
        <p className="verify-plate mono">
          <Scramble text={driver.plate_number} delay={250} />
        </p>

        <Reveal delay={0.7} className="verify-person">
          <Avatar driver={driver} size="lg" />
          <div>
            <h1 className="verify-name">{fullName(driver)}</h1>
            <p className="cell-muted" suppressHydrationWarning>
              <span className="mono">{cardNumber(driver)}</span> · Checked {checkedAt}
            </p>
          </div>
        </Reveal>
      </section>

      <Reveal as="section" delay={1.15} className="verify-section">
        <div className="verify-section-head">
          <h2 className="drawer-label">Documents</h2>
          <p className="cell-muted">Tap a document to see its history and verification.</p>
        </div>
        <DocumentHistory driver={driver} checklist={missing.length > 0} />
      </Reveal>

      <Reveal as="section" className="verify-section">
        <h2 className="drawer-label">Vehicle</h2>
        <dl className="kv">
          <KV k="Make" v={driver.car} />
          <KV k="Model year" v={driver.vehicle_model_year} />
          <KV k="Engine no." v={driver.engine_number} mono />
          <KV k="Chassis no." v={driver.chassis_number} mono />
          <KV k="Last service" v={driver.last_service_date && formatDate(driver.last_service_date)} />
        </dl>
      </Reveal>

      {(driver.emergency_contact_name || driver.emergency_phone_number) && (
        <Reveal as="section" className="verify-section">
          <h2 className="drawer-label">In case of emergency</h2>
          <div className="emergency">
            <div>
              <p className="cell-strong">{driver.emergency_contact_name || "Emergency contact"}</p>
              <p className="cell-muted">
                {driver.relationship_to_driver && <>{driver.relationship_to_driver} · </>}
                <span className="mono">{driver.emergency_phone_number}</span>
              </p>
            </div>
            {driver.emergency_phone_number && (
              <Magnetic>
                <a href={`tel:${driver.emergency_phone_number.replace(/\s/g, "")}`} className="btn btn--primary btn--sm">
                  <Phone size={15} strokeWidth={1.75} /> Call
                </a>
              </Magnetic>
            )}
          </div>
        </Reveal>
      )}

      <footer className="verify-foot">
        <Logo />
        <p>Issued and verified by Quick Drivers Card.</p>
      </footer>
    </main>
  );
}

function NotFound() {
  return (
    <div className="verify-missing">
      <p className="eyebrow eyebrow--plain">Not found</p>
      <h1 className="display display--sm">No record matches this card.</h1>
      <p className="lede">
        The code may be damaged or the card may have been revoked. Ask the driver for another form of identification.
      </p>
      <Link href="/" className="btn btn--ghost">Go to homepage</Link>
    </div>
  );
}

function VerifyTop() {
  return (
    <div className="verify-top">
      <Logo />
      <span className="eyebrow eyebrow--plain">Verification</span>
    </div>
  );
}

function KV({ k, v, mono }) {
  const empty = v == null || v === "";
  return (
    <div>
      <dt>{k}</dt>
      <dd className={mono && !empty ? "mono" : undefined}>{empty ? "—" : v}</dd>
    </div>
  );
}
