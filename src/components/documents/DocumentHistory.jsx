"use client";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Paperclip, Plus, Upload } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import {
  docStatus,
  formatDate,
  relativeDays,
  STATUS_LABEL,
  versionStatus,
} from "@/data/drivers";
import DocumentViewer from "./DocumentViewer";
import UploadVersionDialog from "./UploadVersionDialog";

const ease = [0.22, 1, 0.36, 1];

// Each document is a disclosure row: the summary shows current status, and
// expanding it reveals a timeline of every version. Selecting a version opens
// the viewer. `editable` adds upload controls (dashboard only).
export default function DocumentHistory({ driver, editable = false, defaultOpen = [] }) {
  const [open, setOpen] = useState(() => new Set(defaultOpen));
  const [viewing, setViewing] = useState(null); // { type, index }
  const [uploading, setUploading] = useState(null); // { type } | { type: null }

  const toggle = (type) =>
    setOpen((s) => {
      const next = new Set(s);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });

  const viewingDoc = viewing ? driver.documents.find((d) => d.type === viewing.type) : null;

  return (
    <>
      {driver.documents.length === 0 ? (
        <div className="docs-empty">
          <p className="cell-strong">No documents on file</p>
          <p className="cell-muted">Documents added for this driver will appear here with their full history.</p>
        </div>
      ) : (
        <ul className="docs">
          {driver.documents.map((doc) => (
            <DocRow
              key={doc.type}
              doc={doc}
              open={open.has(doc.type)}
              onToggle={() => toggle(doc.type)}
              onView={(index) => setViewing({ type: doc.type, index })}
              onUpload={editable ? () => setUploading({ type: doc.type }) : null}
            />
          ))}
        </ul>
      )}

      {editable && (
        <button className="btn btn--ghost btn--sm docs-add" onClick={() => setUploading({ type: null })}>
          <Plus size={15} strokeWidth={1.75} /> Add document
        </button>
      )}

      <DocumentViewer
        driver={driver}
        doc={viewingDoc}
        index={viewing?.index ?? null}
        onIndex={(index) => setViewing((v) => ({ ...v, index }))}
        onClose={() => setViewing(null)}
      />

      {editable && (
        <UploadVersionDialog
          open={uploading != null}
          driver={driver}
          type={uploading?.type ?? null}
          onClose={() => setUploading(null)}
          onSaved={(type) => setOpen((s) => new Set(s).add(type))}
        />
      )}
    </>
  );
}

function DocRow({ doc, open, onToggle, onView, onUpload }) {
  const panelId = useId();
  const status = docStatus(doc.expires);
  const count = doc.versions.length;

  return (
    <li className="doc-row" data-open={open}>
      <button className="doc-row-head" onClick={onToggle} aria-expanded={open} aria-controls={panelId}>
        <span className="doc-row-text">
          <span className="cell-strong">{doc.type}</span>
          <span className="cell-muted">
            {status === "expired" ? "Expired" : "Expires"} {formatDate(doc.expires)} · {relativeDays(doc.expires)}
          </span>
        </span>
        <span className="doc-row-meta">
          <span className="doc-row-count">
            {count} {count === 1 ? "version" : "versions"}
          </span>
          <StatusBadge status={status} />
          <ChevronDown size={16} strokeWidth={1.5} className="doc-row-chevron" aria-hidden="true" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            className="doc-row-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="doc-row-inner">
              <p className="timeline-label">History</p>
              <ol className="timeline">
                {doc.versions.map((v, i) => {
                  const s = versionStatus(doc, v);
                  return (
                    <motion.li
                      key={v.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease }}
                    >
                      <button className="timeline-item" onClick={() => onView(i)} data-cursor="View">
                        <span className={`timeline-dot timeline-dot--${s}`} aria-hidden="true" />
                        <span className="timeline-text">
                          <span className="timeline-title">
                            {i === 0 ? "Current" : `Version ${count - i}`}
                            {v.number && <span className="mono"> · {v.number}</span>}
                            {v.file && <Paperclip size={12} strokeWidth={1.75} aria-label="Has file" />}
                          </span>
                          <span className="cell-muted">
                            {formatDate(v.issued)} – {formatDate(v.expires)}
                          </span>
                        </span>
                        <span className={`timeline-status tone--${s}`}>{STATUS_LABEL[s]}</span>
                        <ArrowUpRight size={15} strokeWidth={1.5} className="timeline-go" aria-hidden="true" />
                      </button>
                    </motion.li>
                  );
                })}
              </ol>
              {onUpload && (
                <button className="link-arrow doc-row-upload" onClick={onUpload}>
                  <Upload size={14} strokeWidth={1.75} /> Upload renewal
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
