"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Field from "@/components/ui/Field";
import { docInfo, portalInput } from "@/data/nigeria";
import { recordManualCheck } from "@/lib/verify";

const OUTCOMES = [
  { value: "verified", label: "Verified", hint: "The portal shows a matching, valid record." },
  { value: "mismatch", label: "Details don't match", hint: "A record exists but something differs." },
  { value: "not_found", label: "Not found", hint: "The portal has no record for this input." },
];

// Guides a check on the official portal, then records what it showed.
export default function ManualCheckDialog({ open, onClose, driver, version }) {
  const info = version ? docInfo(version.type) : null;
  const portal = info?.verify?.portal;
  const input = info ? portalInput(info, driver, version) : "";
  const [status, setStatus] = useState("verified");
  const [reference, setReference] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) {
      setStatus("verified");
      setReference("");
      setNote("");
    }
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const save = async () => {
    setBusy(true);
    await recordManualCheck(driver, version, { status, reference, note });
    setBusy(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow={version?.type}
      title="Verify on the official portal"
      labelledBy="manual-title"
      footer={
        <>
          <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary" onClick={save} disabled={busy}>
            {busy ? "Saving…" : "Save result"}
          </button>
        </>
      }
    >
      {portal && (
        <ol className="steps-list">
          <li>
            <span className="steps-n">1</span>
            <div>
              <p className="cell-strong">Open {portal.name}</p>
              <a href={portal.url} target="_blank" rel="noopener noreferrer" className="link-arrow">
                {portal.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} <ArrowUpRight size={14} strokeWidth={1.75} />
              </a>
              {portal.alt && <p className="cell-muted">No internet? {portal.alt}</p>}
            </div>
          </li>
          <li>
            <span className="steps-n">2</span>
            <div>
              <p className="cell-strong">Enter the {portal.input}</p>
              {input ? (
                <button type="button" className="copy-chip mono" onClick={copy}>
                  {input}
                  {copied ? <Check size={13} strokeWidth={2} /> : <Copy size={13} strokeWidth={1.75} />}
                  <span className="visually-hidden">{copied ? "Copied" : "Copy"}</span>
                </button>
              ) : (
                <p className="cell-muted">Not on file for this document — add it first.</p>
              )}
            </div>
          </li>
          <li>
            <span className="steps-n">3</span>
            <div className="steps-grow">
              <p className="cell-strong">Record what the portal showed</p>
              <div className="outcomes" role="radiogroup" aria-label="Result">
                {OUTCOMES.map((o) => (
                  <label key={o.value} className={`outcome ${status === o.value ? "is-active" : ""}`}>
                    <input
                      type="radio"
                      name="outcome"
                      value={o.value}
                      checked={status === o.value}
                      onChange={() => setStatus(o.value)}
                      className="visually-hidden"
                    />
                    <span className="cell-strong">{o.label}</span>
                    <span className="cell-muted">{o.hint}</span>
                  </label>
                ))}
              </div>
              <div className="form-grid" style={{ marginTop: 16 }}>
                <Field label="Reference (optional)" htmlFor="mc-ref">
                  <input id="mc-ref" className="input mono" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Receipt or result ID" />
                </Field>
                <Field label="Note (optional)" htmlFor="mc-note">
                  <input id="mc-note" className="input" value={note} onChange={(e) => setNote(e.target.value)} />
                </Field>
              </div>
            </div>
          </li>
        </ol>
      )}
    </Modal>
  );
}
