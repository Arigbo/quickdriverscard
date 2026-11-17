"use client";
import { useId, useRef, useState } from "react";
import { FileText, ImageIcon, Upload, X } from "lucide-react";

export const MAX_FILE_MB = 10;

export function formatBytes(n) {
  if (!n && n !== 0) return "";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

// Drag-and-drop (or click) file picker for one file.
export default function Dropzone({ file, onChange, accept = "image/*,application/pdf", label = "Upload document", compact = false, onError }) {
  const id = useId();
  const input = useRef(null);
  const [drag, setDrag] = useState(false);

  const take = (f) => {
    if (!f) return;
    if (f.size > MAX_FILE_MB * 1024 * 1024) return onError?.(`File is larger than ${MAX_FILE_MB} MB.`);
    const ok = accept.split(",").some((a) => (a.endsWith("/*") ? f.type.startsWith(a.slice(0, -1)) : f.type === a));
    if (!ok) return onError?.("Use an image or a PDF.");
    onError?.("");
    onChange(f);
  };

  if (file) {
    const Icon = file.type === "application/pdf" ? FileText : ImageIcon;
    return (
      <div className="dropzone-file">
        <Icon size={18} strokeWidth={1.5} />
        <span className="dropzone-name">{file.name}</span>
        <span className="cell-muted">{formatBytes(file.size)}</span>
        <button type="button" className="icon-btn" onClick={() => onChange(null)} aria-label="Remove file">
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  return (
    <label
      htmlFor={id}
      className={`dropzone ${drag ? "is-drag" : ""} ${compact ? "dropzone--compact" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        take(e.dataTransfer.files?.[0]);
      }}
    >
      <Upload size={18} strokeWidth={1.5} />
      <span>
        <strong>{label}</strong>
        <span className="cell-muted">Drag a file here or click to browse · image or PDF, up to {MAX_FILE_MB} MB</span>
      </span>
      <input
        ref={input}
        id={id}
        type="file"
        accept={accept}
        className="visually-hidden"
        onChange={(e) => {
          take(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </label>
  );
}
