"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Download, Link2, X } from "lucide-react";
import IdCard from "@/components/IdCard";
import StatusBadge from "@/components/StatusBadge";
import { downloadCardPdf } from "@/lib/downloadCard";
import {
  cardNumber,
  docStatus,
  formatDate,
  fullName,
  relativeDays,
} from "@/data/drivers";

export default function DriverDrawer({ driver, onClose }) {
  return (
    <AnimatePresence>
      {driver && <Panel key={driver.id} driver={driver} onClose={onClose} />}
    </AnimatePresence>
  );
}

function Panel({ driver, onClose }) {
  const cardRef = useRef(null);
  const closeRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleDownload = async () => {
    setBusy(true);
    setError("");
    try {
      await downloadCardPdf(
        cardRef.current,
        `${cardNumber(driver)}-${driver.last_name}.pdf`
      );
    } catch (e) {
      console.error(e);
      setError("Couldn't generate the PDF. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/driver/${driver.id}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setError("Couldn't copy the link.");
    }
  };

  return (
    <>
      <motion.div
        className="scrim"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="drawer-head">
          <div>
            <p className="eyebrow eyebrow--plain mono">{cardNumber(driver)}</p>
            <h2 id="drawer-title" className="drawer-title">
              {fullName(driver)}
            </h2>
          </div>
          <button ref={closeRef} className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="drawer-body">
          <div className="idcard-frame">
            <IdCard driver={driver} ref={cardRef} />
          </div>

          <div className="drawer-actions">
            <button className="btn btn--primary" onClick={handleDownload} disabled={busy}>
              <Download size={16} strokeWidth={1.75} />
              {busy ? "Preparing…" : "Download card"}
            </button>
            <Link href={`/driver/${driver.id}`} target="_blank" className="btn btn--ghost">
              Verification page <ArrowUpRight size={16} strokeWidth={1.75} />
            </Link>
            <button className="icon-btn icon-btn--bordered" onClick={handleCopy} aria-label="Copy verification link">
              {copied ? <Check size={16} strokeWidth={1.75} /> : <Link2 size={16} strokeWidth={1.75} />}
            </button>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}

          <section className="drawer-section">
            <h3 className="drawer-label">Documents</h3>
            <ul className="doc-list">
              {driver.documents.map((doc) => {
                const s = docStatus(doc.expires);
                return (
                  <li key={doc.doc}>
                    <div>
                      <p className="cell-strong">{doc.doc}</p>
                      <p className="cell-muted">
                        {s === "expired" ? "Expired" : "Expires"} {formatDate(doc.expires)} · {relativeDays(doc.expires)}
                      </p>
                    </div>
                    <StatusBadge status={s} />
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="drawer-section">
            <h3 className="drawer-label">Driver</h3>
            <dl className="kv">
              <KV k="Date of birth" v={formatDate(driver.date_of_birth)} />
              <KV k="Gender" v={driver.gender} />
              <KV k="Phone" v={driver.phone_number} mono />
              <KV k="Occupation" v={driver.occupation} />
              <KV k="Address" v={driver.house_address} />
              <KV k="State / LGA" v={`${driver.state} · ${driver.lga}`} />
            </dl>
          </section>

          <section className="drawer-section">
            <h3 className="drawer-label">Vehicle</h3>
            <dl className="kv">
              <KV k="Make" v={`${driver.car} (${driver.vehicle_model_year})`} />
              <KV k="Plate" v={driver.plate_number} mono />
              <KV k="Engine no." v={driver.engine_number} mono />
              <KV k="Chassis no." v={driver.chassis_number} mono />
              <KV k="Insurance policy" v={driver.insurance_policy_number} mono />
              <KV k="Vendor" v={driver.vendor_of_the_vehicle} />
              <KV k="Last service" v={formatDate(driver.last_service_date)} />
            </dl>
          </section>

          <section className="drawer-section">
            <h3 className="drawer-label">Emergency contact</h3>
            <dl className="kv">
              <KV k="Name" v={`${driver.emergency_contact_name} (${driver.relationship_to_driver})`} />
              <KV k="Phone" v={driver.emergency_phone_number} mono />
            </dl>
          </section>
        </div>
      </motion.aside>
    </>
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
