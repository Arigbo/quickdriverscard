"use client";
import { useEffect, useState } from "react";
import { getFile } from "@/lib/store";
import Specimen from "./Specimen";

// Shows an uploaded file (image or PDF) or, for demo data, a specimen.
export default function DocumentPreview({ driver, doc, version }) {
  const [url, setUrl] = useState(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!version.file) return;
    let objectUrl;
    let cancelled = false;
    getFile(version.file.id)
      .then((rec) => {
        if (cancelled) return;
        if (!rec) return setMissing(true);
        objectUrl = URL.createObjectURL(rec.blob);
        setUrl(objectUrl);
      })
      .catch(() => setMissing(true));
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setUrl(null);
      setMissing(false);
    };
  }, [version.file]);

  if (!version.file || missing) {
    return (
      <div className="preview">
        <Specimen driver={driver} type={doc.type} version={version} />
      </div>
    );
  }

  if (!url) return <div className="preview preview--loading" aria-busy="true" />;

  if (version.file.type === "application/pdf") {
    return (
      <div className="preview preview--pdf">
        <iframe src={url} title={`${doc.type} (PDF)`} />
      </div>
    );
  }

  return (
    <div className="preview">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={`${doc.type} — uploaded scan`} />
    </div>
  );
}

export async function openFile(version) {
  const rec = await getFile(version.file.id);
  if (!rec) return null;
  return { url: URL.createObjectURL(rec.blob), name: rec.name };
}
