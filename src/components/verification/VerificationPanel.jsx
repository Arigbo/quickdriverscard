"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Loader2, RefreshCw, X } from "lucide-react";
import { docInfo, portalInput } from "@/data/nigeria";
import { formatDate } from "@/data/drivers";
import { canAutoVerify, runCheck } from "@/lib/verify";
import VerificationBadge, { checkStatus } from "./VerificationBadge";
import ManualCheckDialog from "./ManualCheckDialog";

// "Is this document genuine?" — status of the latest check against the
// issuing authority, plus the actions to (re)check it in the dashboard.
export default function VerificationPanel({ driver, version, editable }) {
  const info = docInfo(version.type);
  const v = version.verification;
  const status = checkStatus(v);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [manual, setManual] = useState(false);
  const auto = canAutoVerify(version.type);
  const portal = info?.verify?.portal;

  const check = async () => {
    setBusy(true);
    setError("");
    try {
      await runCheck(driver, version);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`vpanel vpanel--${status}`}>
      <div className="vpanel-head">
        <div>
          <p className="timeline-label">Verification</p>
          <VerificationBadge verification={v} />
        </div>
        {v && (
          <p className="cell-muted vpanel-meta">
            {v.method === "api" ? "Automatic" : "Manual"} · {v.provider}
            {v.simulated && " (simulated)"}
            {v.demo && " (demo)"}
            <br />
            {formatDate(v.checkedAt?.slice(0, 10))}
            {v.reference && <> · <span className="mono">{v.reference}</span></>}
          </p>
        )}
      </div>

      {v?.matches?.length > 0 && (
        <ul className="vpanel-matches">
          {v.matches.map((m) => (
            <li key={m.field} className={m.ok ? "ok" : "bad"}>
              {m.ok ? <Check size={13} strokeWidth={2} /> : <X size={13} strokeWidth={2} />}
              {m.field}
            </li>
          ))}
        </ul>
      )}
      {v?.note && <p className="vpanel-note">{v.note}</p>}
      {!v && <p className="cell-muted vpanel-note">{info?.verify?.summary ?? "No official verification channel is listed for this document."}</p>}

      {editable && info && (
        <div className="vpanel-actions">
          {auto && (
            <button className="btn btn--primary btn--sm" onClick={check} disabled={busy}>
              {busy ? <Loader2 size={14} className="spin" /> : <RefreshCw size={14} strokeWidth={1.75} />}
              {v ? "Check again" : `Check with ${info.verify.api === "licence" ? "FRSC" : "NVIS"}`}
            </button>
          )}
          {portal && (
            <>
              <a className="btn btn--ghost btn--sm" href={portal.url} target="_blank" rel="noopener noreferrer">
                {portal.name.split(" (")[0]} <ArrowUpRight size={14} strokeWidth={1.75} />
              </a>
              <button className="link-arrow link-arrow--muted" onClick={() => setManual(true)}>
                Record manual result
              </button>
            </>
          )}
        </div>
      )}
      {editable && !auto && portal && !portalInput(info, driver, version) && (
        <p className="cell-muted vpanel-note">Tip: add the {portal.input} to make the portal check easier.</p>
      )}
      {error && <p className="form-error">{error}</p>}

      {editable && <ManualCheckDialog open={manual} onClose={() => setManual(false)} driver={driver} version={version} />}
    </div>
  );
}
