"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Field from "@/components/ui/Field";
import Dropzone from "@/components/ui/Dropzone";
import { addVersions } from "@/lib/store";
import { compressDocument } from "@/lib/image";
import { DOCUMENT_TYPES, shortName } from "@/data/drivers";

const today = () => new Date().toISOString().slice(0, 10);

export function emptyVersion(type = "") {
  return { type, customType: "", number: "", issued: today(), expires: "", file: null };
}

// Validates one document entry; shared with the add-driver form.
export function validateVersion(v) {
  const e = {};
  const type = v.type === "__other" ? v.customType.trim() : v.type;
  if (!type) e.type = "Choose a document type.";
  if (!v.expires) e.expires = "Add the expiry date.";
  if (v.issued && v.expires && v.issued > v.expires) e.expires = "Expiry must be after the issue date.";
  return { errors: e, type };
}

export function VersionFields({ value, onChange, errors = {}, lockType = false, idPrefix = "v" }) {
  const set = (k) => (e) => onChange({ ...value, [k]: e.target ? e.target.value : e });
  const [fileError, setFileError] = useState("");
  return (
    <div className="form-grid">
      {!lockType && (
        <Field label="Document type" required error={errors.type} htmlFor={`${idPrefix}-type`} className="span-2">
          <select id={`${idPrefix}-type`} className="input" value={value.type} onChange={set("type")}>
            <option value="">Select…</option>
            {DOCUMENT_TYPES.map((t) => (
              <option key={t.type} value={t.type}>{t.type}</option>
            ))}
            <option value="__other">Other…</option>
          </select>
          {value.type === "__other" && (
            <input
              className="input"
              placeholder="Document name"
              value={value.customType}
              onChange={set("customType")}
              aria-label="Document name"
            />
          )}
        </Field>
      )}
      <Field label="Document number" htmlFor={`${idPrefix}-num`} className="span-2">
        <input id={`${idPrefix}-num`} className="input mono" value={value.number} onChange={set("number")} placeholder="e.g. DL-LAG-123456" />
      </Field>
      <Field label="Issued" htmlFor={`${idPrefix}-iss`}>
        <input id={`${idPrefix}-iss`} type="date" className="input" value={value.issued} onChange={set("issued")} />
      </Field>
      <Field label="Expires" required error={errors.expires} htmlFor={`${idPrefix}-exp`}>
        <input id={`${idPrefix}-exp`} type="date" className="input" value={value.expires} onChange={set("expires")} />
      </Field>
      <Field label="Scan or photo" error={fileError} hint="Optional — without a file, a placeholder is shown." className="span-2">
        <Dropzone file={value.file} onChange={(f) => onChange({ ...value, file: f })} onError={setFileError} compact />
      </Field>
    </div>
  );
}

export default function UploadVersionDialog({ open, driver, type, onClose, onSaved }) {
  const [value, setValue] = useState(emptyVersion(type ?? ""));
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState("");

  useEffect(() => {
    if (open) {
      setValue(emptyVersion(type ?? ""));
      setErrors({});
      setFailure("");
    }
  }, [open, type]);

  const save = async (e) => {
    e?.preventDefault();
    const { errors: errs, type: finalType } = validateVersion(value);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    try {
      const file = value.file ? await compressDocument(value.file) : null;
      await addVersions(driver.id, [{ ...value, type: finalType, file }]);
      onSaved?.(finalType);
      onClose();
    } catch (err) {
      console.error(err);
      setFailure("Couldn't save the document. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow={shortName(driver)}
      title={type ? `Renew ${type}` : "Add document"}
      labelledBy="upload-title"
      footer={
        <>
          {failure && <p className="form-error">{failure}</p>}
          <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary" onClick={save} disabled={busy}>
            {busy ? "Saving…" : "Save document"}
          </button>
        </>
      }
    >
      <form onSubmit={save} noValidate>
        {type && (
          <p className="modal-lede">
            The new version becomes current. Earlier versions stay in the history.
          </p>
        )}
        <VersionFields value={value} onChange={setValue} errors={errors} lockType={!!type} idPrefix="up" />
        <button type="submit" hidden />
      </form>
    </Modal>
  );
}
