"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Field from "@/components/ui/Field";
import Dropzone from "@/components/ui/Dropzone";
import { addVersions } from "@/lib/store";
import { compressDocument } from "@/lib/image";
import { shortName } from "@/data/drivers";
import { docInfo, NG_DOCUMENTS, REQUIREMENT } from "@/data/nigeria";
import { canAutoVerify, runCheck } from "@/lib/verify";

const today = () => new Date().toISOString().slice(0, 10);

export function emptyVersion(type = "") {
  return { type, customType: "", number: "", issued: today(), expires: "", file: null };
}

// Validates one document entry; shared with the add-driver form.
export function validateVersion(v) {
  const e = {};
  const type = v.type === "__other" ? v.customType.trim() : v.type;
  if (!type) e.type = "Choose a document type.";
  if (!v.expires && !docInfo(type)?.noExpiry) e.expires = "Add the expiry date.";
  if (v.issued && v.expires && v.issued > v.expires) e.expires = "Expiry must be after the issue date.";
  return { errors: e, type };
}

const GROUPS = ["required", "commercial", "imported", "optional"];

export function VersionFields({ value, onChange, errors = {}, lockType = false, idPrefix = "v" }) {
  const set = (k) => (e) => onChange({ ...value, [k]: e.target ? e.target.value : e });
  const [fileError, setFileError] = useState("");
  const info = docInfo(value.type);
  return (
    <div className="form-grid">
      {!lockType && (
        <Field label="Document type" required error={errors.type} htmlFor={`${idPrefix}-type`} className="span-2">
          <select id={`${idPrefix}-type`} className="input" value={value.type} onChange={set("type")}>
            <option value="">Select…</option>
            {GROUPS.map((g) => (
              <optgroup key={g} label={REQUIREMENT[g]}>
                {NG_DOCUMENTS.filter((t) => t.requirement === g).map((t) => (
                  <option key={t.type} value={t.type}>{t.type}</option>
                ))}
              </optgroup>
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
      {info && (
        <p className="doc-info span-2">
          Issued by {info.issuer}. {info.verify?.summary}
          {info.note && <> {info.note}</>}
        </p>
      )}
      <Field
        label={info?.numberLabel ?? "Document number"}
        htmlFor={`${idPrefix}-num`}
        className="span-2"
        hint={info?.verify?.api === "licence" ? "Needed for the automatic FRSC check." : info?.numberHint}
      >
        <input
          id={`${idPrefix}-num`}
          className="input mono"
          value={value.number}
          onChange={set("number")}
          placeholder={info?.numberFromPlate ? "Plate number" : info?.numberFromChassis ? "VIN" : "e.g. ABC12345AA12"}
        />
      </Field>
      <Field label="Issued" htmlFor={`${idPrefix}-iss`}>
        <input id={`${idPrefix}-iss`} type="date" className="input" value={value.issued} onChange={set("issued")} />
      </Field>
      <Field label="Expires" required={!info?.noExpiry} hint={info?.noExpiry ? "This document doesn't expire." : undefined} error={errors.expires} htmlFor={`${idPrefix}-exp`}>
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
  const renewing = !!type && driver.documents.some((d) => d.type === type);

  useEffect(() => {
    if (open) {
      const preset = emptyVersion(type ?? "");
      if (docInfo(type)?.numberFromPlate) preset.number = driver.plate_number ?? "";
      if (docInfo(type)?.numberFromChassis) preset.number = driver.chassis_number ?? "";
      setValue(preset);
      setErrors({});
      setFailure("");
    }
  }, [open, type, driver]);

  const save = async (e) => {
    e?.preventDefault();
    const { errors: errs, type: finalType } = validateVersion(value);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    try {
      const file = value.file ? await compressDocument(value.file) : null;
      const [saved] = await addVersions(driver.id, [{ ...value, type: finalType, file }]);
      onSaved?.(finalType);
      onClose();
      // Check with the issuing authority straight away where an API exists.
      if (canAutoVerify(finalType) && (saved.number || driver.plate_number)) {
        runCheck(driver, saved).catch((err) => console.warn("Automatic check failed", err));
      }
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
      title={type ? `${renewing ? "Renew" : "Add"} ${type}` : "Add document"}
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
        {renewing && (
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
