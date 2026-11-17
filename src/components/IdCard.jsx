import { LogoMark } from "./Logo";
import QrCode from "./QrCode";
import { cardNumber, initials } from "@/data/drivers";

const or = (v) => (v === undefined || v === null || v === "" ? "—" : v);

// A CR80-proportioned driver card. All sizes are in `em`, and the base
// font-size scales with the card's container, so it renders identically at
// any width — including the off-screen copy used for PDF export.
export default function IdCard({ driver, ref }) {
  return (
    <div className="idcard" ref={ref}>
      <div className="idcard-head">
        <span className="idcard-brand">
          <LogoMark size={14} />
          Driver Card
        </span>
        <span className="idcard-no">{cardNumber(driver)}</span>
      </div>

      <div className="idcard-body">
        <div className="idcard-main">
          <div className="idcard-person">
            <div className="idcard-avatar" aria-hidden="true">
              {driver.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={driver.photo} alt="" />
              ) : (
                initials(driver)
              )}
            </div>
            <div>
              <div className="idcard-name">
                {driver.first_name} {driver.last_name}
              </div>
              {driver.occupation && <div className="idcard-sub">{driver.occupation}</div>}
            </div>
          </div>

          <dl className="idcard-fields">
            <div>
              <dt>Plate</dt>
              <dd className="mono">{driver.plate_number}</dd>
            </div>
            <div>
              <dt>Vehicle</dt>
              <dd>{[driver.car, driver.vehicle_model_year].filter(Boolean).join(" · ")}</dd>
            </div>
            <div>
              <dt>Emergency</dt>
              <dd className="mono">{or(driver.emergency_phone_number)}</dd>
            </div>
            <div>
              <dt>Driving since</dt>
              <dd>{or(driver.driving_since)}</dd>
            </div>
          </dl>
        </div>

        <div className="idcard-qr">
          <QrCode driverId={driver.id} />
          <span>Scan to verify</span>
        </div>
      </div>
    </div>
  );
}

export function IdCardBack({ driver }) {
  return (
    <div className="idcard idcard--back">
      <div className="idcard-stripe" />
      <div className="idcard-back-body">
        <LogoMark size={28} />
        <p className="idcard-back-title">Quick Drivers Card</p>
        <p className="idcard-back-text">
          This card identifies the holder as a registered driver. Scan the code
          on the front to verify the record and document status.
        </p>
      </div>
      <div className="idcard-head idcard-back-foot">
        <span>If found, return to any registry office</span>
        <span className="idcard-no">{cardNumber(driver)}</span>
      </div>
    </div>
  );
}
