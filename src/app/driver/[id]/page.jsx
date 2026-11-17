import Link from "next/link";
import { Phone } from "lucide-react";
import Logo from "@/components/Logo";
import StatusBadge from "@/components/StatusBadge";
import Reveal from "@/components/Reveal";
import Scramble from "@/components/motion/Scramble";
import Magnetic from "@/components/motion/Magnetic";
import {
  cardNumber,
  docStatus,
  driverStatus,
  formatDate,
  fullName,
  getDriver,
  initials,
  relativeDays,
} from "@/data/drivers";

// Document status depends on today's date, so render per request.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const driver = getDriver(id);
  return {
    title: driver
      ? `${driver.plate_number} — Verification · Quick Drivers Card`
      : "Record not found · Quick Drivers Card",
    robots: { index: false },
  };
}

const SUMMARY = {
  valid: () => "All documents are valid",
  expiring: (n) => `${n} document${n > 1 ? "s" : ""} expiring soon`,
  expired: (n) => `${n} document${n > 1 ? "s" : ""} expired`,
};

export default async function VerifyPage({ params }) {
  const { id } = await params;
  const driver = getDriver(id);

  if (!driver) {
    return (
      <main className="verify">
        <VerifyTop />
        <div className="verify-missing">
          <p className="eyebrow eyebrow--plain">Not found</p>
          <h1 className="display display--sm">No record matches this card.</h1>
          <p className="lede">
            The code may be damaged or the card may have been revoked. Ask the
            driver for another form of identification.
          </p>
          <Link href="/" className="btn btn--ghost">Go to homepage</Link>
        </div>
      </main>
    );
  }

  const status = driverStatus(driver);
  const docs = driver.documents.map((d) => ({ ...d, status: docStatus(d.expires) }));
  const flagged = docs.filter((d) => d.status === status).length;
  const checkedAt = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="verify">
      <VerifyTop />

      <section className="verify-hero">
        <Reveal delay={1.0} className={`verify-status verify-status--${status}`}>
          <span className="badge-dot badge-dot--pulse" aria-hidden="true" />
          {SUMMARY[status](flagged)}
        </Reveal>

        <Reveal as="p" className="verify-label">Plate number</Reveal>
        <p className="verify-plate mono">
          <Scramble text={driver.plate_number} delay={250} />
        </p>

        <Reveal delay={0.7} className="verify-person">
          <span className="avatar avatar--lg">{initials(driver)}</span>
          <div>
            <h1 className="verify-name">{fullName(driver)}</h1>
            <p className="cell-muted">
              <span className="mono">{cardNumber(driver)}</span> · Checked {checkedAt}
            </p>
          </div>
        </Reveal>
      </section>

      <Reveal as="section" delay={1.15} className="verify-section">
        <h2 className="drawer-label">Documents</h2>
        <ul className="doc-list">
          {docs.map((doc) => (
            <li key={doc.doc}>
              <div>
                <p className="cell-strong">{doc.doc}</p>
                <p className="cell-muted">
                  {doc.status === "expired" ? "Expired" : "Expires"} {formatDate(doc.expires)} · {relativeDays(doc.expires)}
                </p>
              </div>
              <StatusBadge status={doc.status} />
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal as="section" className="verify-section">
        <h2 className="drawer-label">Vehicle</h2>
        <dl className="kv">
          <KV k="Make" v={driver.car} />
          <KV k="Model year" v={driver.vehicle_model_year} />
          <KV k="Engine no." v={driver.engine_number} mono />
          <KV k="Chassis no." v={driver.chassis_number} mono />
          <KV k="Last service" v={formatDate(driver.last_service_date)} />
        </dl>
      </Reveal>

      <Reveal as="section" className="verify-section">
        <h2 className="drawer-label">In case of emergency</h2>
        <div className="emergency">
          <div>
            <p className="cell-strong">{driver.emergency_contact_name}</p>
            <p className="cell-muted">
              {driver.relationship_to_driver} · <span className="mono">{driver.emergency_phone_number}</span>
            </p>
          </div>
          <Magnetic>
            <a
              href={`tel:${driver.emergency_phone_number.replace(/\s/g, "")}`}
              className="btn btn--primary btn--sm"
            >
              <Phone size={15} strokeWidth={1.75} /> Call
            </a>
          </Magnetic>
        </div>
      </Reveal>

      <footer className="verify-foot">
        <Logo />
        <p>Issued and verified by Quick Drivers Card.</p>
      </footer>
    </main>
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
  return (
    <div>
      <dt>{k}</dt>
      <dd className={mono ? "mono" : undefined}>{v}</dd>
    </div>
  );
}
