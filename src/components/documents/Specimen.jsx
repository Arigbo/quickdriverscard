import { LogoMark } from "@/components/Logo";
import { formatDate, fullName } from "@/data/drivers";

// Illustrative stand-in for demo documents that have no uploaded file.
// Clearly marked as a specimen; deliberately not styled like any real issuer.
export default function Specimen({ driver, type, version }) {
  return (
    <div className="specimen" role="img" aria-label={`Specimen ${type} for ${fullName(driver)}`}>
      <div className="specimen-band">Specimen · demo document</div>
      <div className="specimen-inner">
        <div className="specimen-head">
          <span className="specimen-brand">
            <LogoMark size={14} /> Quick Drivers Card
          </span>
          <span className="mono">{version.number || "—"}</span>
        </div>
        <p className="specimen-title">{type}</p>
        <dl className="specimen-fields">
          <div>
            <dt>Holder</dt>
            <dd>{fullName(driver)}</dd>
          </div>
          <div>
            <dt>Vehicle</dt>
            <dd>
              {driver.car} · <span className="mono">{driver.plate_number}</span>
            </dd>
          </div>
          <div>
            <dt>Issued</dt>
            <dd>{formatDate(version.issued)}</dd>
          </div>
          <div>
            <dt>Expires</dt>
            <dd>{formatDate(version.expires)}</dd>
          </div>
        </dl>
        <div className="specimen-lines" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="specimen-foot">
          Generated for demonstration. Not valid for any official purpose.
        </p>
      </div>
      <span className="specimen-mark" aria-hidden="true">Specimen</span>
    </div>
  );
}
