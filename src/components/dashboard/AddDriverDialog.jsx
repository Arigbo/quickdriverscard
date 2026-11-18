"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Plus, Trash2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Field from "@/components/ui/Field";
import { emptyVersion, validateVersion, VersionFields } from "@/components/documents/UploadVersionDialog";
import { createDriver } from "@/lib/store";
import { canAutoVerify, runCheck } from "@/lib/verify";
import { docInfo, requiredTypes } from "@/data/nigeria";
import { compressDocument, photoToDataUrl } from "@/lib/image";

const EMPTY = {
  photo: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  date_of_birth: "",
  gender: "",
  phone_number: "",
  occupation: "",
  house_address: "",
  state: "",
  lga: "",
  driving_since: "",
  car: "",
  vehicle_model_year: "",
  plate_number: "",
  engine_number: "",
  chassis_number: "",
  insurance_policy_number: "",
  vendor_of_the_vehicle: "",
  last_service_date: "",
  emergency_contact_name: "",
  relationship_to_driver: "",
  emergency_phone_number: "",
  vehicle_use: "private",
  imported: "yes",
};

const REQUIRED = {
  first_name: "Add a first name.",
  last_name: "Add a last name.",
  phone_number: "Add a phone number.",
  car: "Add the vehicle make and model.",
  plate_number: "Add the plate number.",
};

function validate(form) {
  const e = {};
  for (const [k, msg] of Object.entries(REQUIRED)) if (!String(form[k]).trim()) e[k] = msg;
  const year = Number(form.vehicle_model_year);
  if (form.vehicle_model_year && (year < 1950 || year > new Date().getFullYear() + 1)) e.vehicle_model_year = "Enter a valid year.";
  const since = Number(form.driving_since);
  if (form.driving_since && (since < 1940 || since > new Date().getFullYear())) e.driving_since = "Enter a valid year.";
  return e;
}

export default function AddDriverDialog({ open, onClose, nextId, onCreated }) {
  const [form, setForm] = useState(EMPTY);
  const [docs, setDocs] = useState([]);
  const [errors, setErrors] = useState({});
  const [docErrors, setDocErrors] = useState([]);
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState("");

  useEffect(() => {
    if (open) {
      setForm(EMPTY);
      setDocs([emptyVersion("Driver's Licence")]);
      setErrors({});
      setDocErrors([]);
      setFailure("");
    }
  }, [open]);

  const required = requiredTypes({ vehicle_use: form.vehicle_use, imported: form.imported === "yes" });

  const bind = (k) => ({
    id: `f-${k}`,
    value: form[k],
    onChange: (e) => setForm((f) => ({ ...f, [k]: e.target.value })),
    "aria-invalid": !!errors[k],
  });

  const onPhoto = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !file.type.startsWith("image/")) return;
    try {
      const photo = await photoToDataUrl(file);
      setForm((f) => ({ ...f, photo }));
    } catch {
      setErrors((x) => ({ ...x, photo: "Couldn't read that image." }));
    }
  };

  const save = async (e) => {
    e?.preventDefault();
    const errs = validate(form);
    const dErrs = docs.map((d) => validateVersion(d).errors);
    setErrors(errs);
    setDocErrors(dErrs);
    if (Object.keys(errs).length || dErrs.some((x) => Object.keys(x).length)) {
      const first = document.querySelector(".modal [aria-invalid='true'], .modal .field--error input, .modal .field--error select");
      first?.focus();
      return;
    }
    setBusy(true);
    try {
      const record = {
        ...form,
        id: nextId,
        plate_number: form.plate_number.trim().toUpperCase(),
        vehicle_model_year: form.vehicle_model_year ? Number(form.vehicle_model_year) : "",
        driving_since: form.driving_since ? Number(form.driving_since) : "",
        imported: form.imported === "yes",
      };
      const versions = [];
      for (const d of docs) {
        const { type } = validateVersion(d);
        versions.push({ ...d, type, file: d.file ? await compressDocument(d.file) : null });
      }
      const driver = await createDriver(record, versions);
      onCreated?.(record.id);
      onClose();
      // Run automatic checks for documents that have an API (licence, plate).
      for (const v of driver.versions ?? []) {
        if (canAutoVerify(v.type)) runCheck(record, v).catch((err) => console.warn("Automatic check failed", err));
      }
    } catch (err) {
      console.error(err);
      setFailure("Couldn't save the driver. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="xl"
      eyebrow={`New record · QDC-${String(nextId).padStart(4, "0")}`}
      title="Add driver"
      labelledBy="add-driver-title"
      footer={
        <>
          {failure && <p className="form-error">{failure}</p>}
          <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary" onClick={save} disabled={busy}>
            {busy ? "Saving…" : "Save driver"}
          </button>
        </>
      }
    >
      <form className="add-form" onSubmit={save} noValidate>
        <section className="form-section">
          <div className="form-section-head">
            <h3>Driver</h3>
            <p className="cell-muted">Identity and contact details.</p>
          </div>
          <div className="form-grid">
            <div className="photo-field span-2">
              <label className="photo-pick" data-cursor="Photo">
                {form.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.photo} alt="Driver photo preview" />
                ) : (
                  <Camera size={20} strokeWidth={1.5} />
                )}
                <input type="file" accept="image/*" className="visually-hidden" onChange={onPhoto} aria-label="Driver photo" />
              </label>
              <div>
                <p className="cell-strong">Photo</p>
                <p className="cell-muted">Optional. Shown on the card and verification page.</p>
                {form.photo && (
                  <button type="button" className="link-arrow link-arrow--muted" onClick={() => setForm((f) => ({ ...f, photo: "" }))}>
                    Remove photo
                  </button>
                )}
              </div>
            </div>
            <Field label="First name" required error={errors.first_name} htmlFor="f-first_name">
              <input className="input" autoComplete="off" {...bind("first_name")} />
            </Field>
            <Field label="Last name" required error={errors.last_name} htmlFor="f-last_name">
              <input className="input" autoComplete="off" {...bind("last_name")} />
            </Field>
            <Field label="Middle name" htmlFor="f-middle_name">
              <input className="input" autoComplete="off" {...bind("middle_name")} />
            </Field>
            <Field label="Date of birth" htmlFor="f-date_of_birth">
              <input type="date" className="input" {...bind("date_of_birth")} />
            </Field>
            <Field label="Gender" htmlFor="f-gender">
              <select className="input" {...bind("gender")}>
                <option value="">Select…</option>
                <option>Female</option>
                <option>Male</option>
                <option>Prefer not to say</option>
              </select>
            </Field>
            <Field label="Phone" required error={errors.phone_number} htmlFor="f-phone_number">
              <input type="tel" className="input mono" {...bind("phone_number")} />
            </Field>
            <Field label="Occupation" htmlFor="f-occupation">
              <input className="input" {...bind("occupation")} />
            </Field>
            <Field label="Driving since" error={errors.driving_since} htmlFor="f-driving_since">
              <input type="number" inputMode="numeric" className="input" placeholder="Year" {...bind("driving_since")} />
            </Field>
            <Field label="Address" className="span-2" htmlFor="f-house_address">
              <input className="input" {...bind("house_address")} />
            </Field>
            <Field label="State" htmlFor="f-state">
              <input className="input" {...bind("state")} />
            </Field>
            <Field label="LGA" htmlFor="f-lga">
              <input className="input" {...bind("lga")} />
            </Field>
          </div>
        </section>

        <section className="form-section">
          <div className="form-section-head">
            <h3>Vehicle</h3>
            <p className="cell-muted">What they drive.</p>
          </div>
          <div className="form-grid">
            <Field label="Make & model" required error={errors.car} htmlFor="f-car">
              <input className="input" placeholder="e.g. Toyota Corolla" {...bind("car")} />
            </Field>
            <Field label="Plate number" required error={errors.plate_number} htmlFor="f-plate_number">
              <input className="input mono" placeholder="LAG 123 AB" {...bind("plate_number")} style={{ textTransform: "uppercase" }} />
            </Field>
            <Field label="Model year" error={errors.vehicle_model_year} htmlFor="f-vehicle_model_year">
              <input type="number" inputMode="numeric" className="input" {...bind("vehicle_model_year")} />
            </Field>
            <Field label="Use" htmlFor="f-vehicle_use" hint="Commercial vehicles also need a hackney permit.">
              <select className="input" {...bind("vehicle_use")}>
                <option value="private">Private</option>
                <option value="commercial">Commercial (taxi, ride-hailing, logistics)</option>
              </select>
            </Field>
            <Field label="Imported?" htmlFor="f-imported" hint="Imported vehicles also need customs duty papers.">
              <select className="input" {...bind("imported")}>
                <option value="yes">Yes — foreign-used or new import</option>
                <option value="no">No — locally assembled</option>
              </select>
            </Field>
            <Field label="Last service" htmlFor="f-last_service_date">
              <input type="date" className="input" {...bind("last_service_date")} />
            </Field>
            <Field label="Engine no." htmlFor="f-engine_number">
              <input className="input mono" {...bind("engine_number")} />
            </Field>
            <Field label="Chassis no." htmlFor="f-chassis_number">
              <input className="input mono" {...bind("chassis_number")} />
            </Field>
            <Field label="Insurance policy" htmlFor="f-insurance_policy_number">
              <input className="input mono" {...bind("insurance_policy_number")} />
            </Field>
            <Field label="Vendor" htmlFor="f-vendor_of_the_vehicle">
              <input className="input" {...bind("vendor_of_the_vehicle")} />
            </Field>
          </div>
        </section>

        <section className="form-section">
          <div className="form-section-head">
            <h3>Emergency contact</h3>
            <p className="cell-muted">Shown on the public verification page.</p>
          </div>
          <div className="form-grid">
            <Field label="Name" htmlFor="f-emergency_contact_name">
              <input className="input" {...bind("emergency_contact_name")} />
            </Field>
            <Field label="Relationship" htmlFor="f-relationship_to_driver">
              <input className="input" {...bind("relationship_to_driver")} />
            </Field>
            <Field label="Phone" htmlFor="f-emergency_phone_number">
              <input type="tel" className="input mono" {...bind("emergency_phone_number")} />
            </Field>
          </div>
        </section>

        <section className="form-section">
          <div className="form-section-head">
            <h3>Documents</h3>
            <p className="cell-muted">Add each document&rsquo;s current version. Renewals can be uploaded later and build its history.</p>
          </div>
          <div className="doc-entries">
            <div className="req-chips" aria-label="Required documents for this vehicle">
              <p className="cell-muted">Required for this vehicle — tap to add:</p>
              <div>
                {required.map((t) => {
                  const added = docs.some((d) => d.type === t);
                  return (
                    <button
                      key={t}
                      type="button"
                      className={`req-chip ${added ? "is-added" : ""}`}
                      aria-pressed={added}
                      onClick={() => {
                        if (added) return;
                        const v = emptyVersion(t);
                        if (docInfo(t)?.numberFromPlate) v.number = form.plate_number.toUpperCase();
                        if (docInfo(t)?.numberFromChassis) v.number = form.chassis_number;
                        setDocs((x) => [...x, v]);
                      }}
                    >
                      {added ? "✓ " : "+ "}
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
            <AnimatePresence initial={false}>
              {docs.map((d, i) => (
                <motion.div
                  key={i}
                  className="doc-entry"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="doc-entry-head">
                    <span className="mono cell-muted">{String(i + 1).padStart(2, "0")}</span>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => {
                        setDocs((x) => x.filter((_, j) => j !== i));
                        setDocErrors((x) => x.filter((_, j) => j !== i));
                      }}
                      aria-label={`Remove document ${i + 1}`}
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                  <VersionFields
                    value={d}
                    idPrefix={`d${i}`}
                    errors={docErrors[i]}
                    onChange={(v) => setDocs((x) => x.map((y, j) => (j === i ? v : y)))}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => setDocs((x) => [...x, emptyVersion()])}>
              <Plus size={15} strokeWidth={1.75} /> Add another document
            </button>
          </div>
        </section>
        <button type="submit" hidden />
      </form>
    </Modal>
  );
}
