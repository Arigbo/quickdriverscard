"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, ExternalLink, Paperclip } from "lucide-react";
import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/StatusBadge";
import { formatBytes } from "@/components/ui/Dropzone";
import { formatDate, relativeDays, versionStatus } from "@/data/drivers";
import VerificationBadge from "@/components/verification/VerificationBadge";
import { docInfo } from "@/data/nigeria";
import DocumentPreview, { openFile } from "./DocumentPreview";

// Full view of one document version, with newer/older navigation.
export default function DocumentViewer({ driver, doc, index, onIndex, onClose }) {
  const open = doc != null && index != null;
  const version = open ? doc.versions[index] : null;
  const total = doc?.versions.length ?? 0;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft" && index > 0) onIndex(index - 1);
      if (e.key === "ArrowRight" && index < total - 1) onIndex(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, total, onIndex]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      eyebrow={open ? (index === 0 ? "Current version" : `Version ${total - index} of ${total}`) : ""}
      title={doc?.type ?? ""}
      labelledBy="viewer-title"
    >
      {version && (
        <div className="viewer">
          <div className="viewer-stage">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={version.id}
                className="viewer-frame"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
              >
                <DocumentPreview driver={driver} doc={doc} version={version} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="viewer-side">
            <StatusBadge status={versionStatus(doc, version)} />
            <dl className="kv">
              <KV k="Document no." v={version.number || "—"} mono />
              <KV k="Issued" v={formatDate(version.issued)} />
              <KV k="Expires" v={version.expires ? `${formatDate(version.expires)} · ${relativeDays(version.expires)}` : "No expiry"} />
              <KV k="Issuer" v={docInfo(doc.type)?.issuer ?? "—"} />
              <KV
                k="Verification"
                v={
                  <span className="viewer-file">
                    <VerificationBadge verification={version.verification} />
                    {version.verification && (
                      <span className="cell-muted">
                        {version.verification.provider} · {formatDate(version.verification.checkedAt?.slice(0, 10))}
                      </span>
                    )}
                  </span>
                }
              />
              <KV k="Source" v={version.source === "local" ? `Uploaded ${formatDate(version.uploadedAt?.slice(0, 10))}` : "Demo record"} />
              {version.file && (
                <KV
                  k="File"
                  v={
                    <span className="viewer-file">
                      <Paperclip size={13} strokeWidth={1.75} /> {version.file.name}
                      <span className="cell-muted">{formatBytes(version.file.size)}</span>
                    </span>
                  }
                />
              )}
            </dl>

            {version.file && <FileActions version={version} />}

            <div className="viewer-nav">
              <button className="btn btn--ghost btn--sm" disabled={index === 0} onClick={() => onIndex(index - 1)}>
                <ChevronLeft size={15} strokeWidth={1.75} /> Newer
              </button>
              <span className="cell-muted mono">
                {total - index} / {total}
              </span>
              <button className="btn btn--ghost btn--sm" disabled={index === total - 1} onClick={() => onIndex(index + 1)}>
                Older <ChevronRight size={15} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

function FileActions({ version }) {
  const [busy, setBusy] = useState(false);
  const run = async (download) => {
    setBusy(true);
    const f = await openFile(version);
    setBusy(false);
    if (!f) return;
    const a = document.createElement("a");
    a.href = f.url;
    if (download) a.download = f.name;
    else a.target = "_blank";
    a.rel = "noopener";
    a.click();
    setTimeout(() => URL.revokeObjectURL(f.url), 60_000);
  };
  return (
    <div className="viewer-actions">
      <button className="btn btn--primary btn--sm" onClick={() => run(true)} disabled={busy}>
        <Download size={15} strokeWidth={1.75} /> Download
      </button>
      <button className="btn btn--ghost btn--sm" onClick={() => run(false)} disabled={busy}>
        Open <ExternalLink size={14} strokeWidth={1.75} />
      </button>
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
