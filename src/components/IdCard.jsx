import { LogoMark } from "./Logo";
import QrCode from "./QrCode";
import { cardNumber, initials } from "@/data/drivers";

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
              {initials(driver)}
            </div>
            <div>
              <div className="idcard-name">
                {driver.first_name} {driver.last_name}
              </div>
              <div className="idcard-sub">{driver.occupation}</div>
            </div>
          </div>

          <dl className="idcard-fields">
            <div>
              <dt>Plate</dt>
              <dd className="mono">{driver.plate_number}</dd>
            </div>
            <div>
              <dt>Vehicle</dt>
              <dd>
                {driver.car} · {driver.vehicle_model_year}
              </dd>
            </div>
            <div>
              <dt>Emergency</dt>
              <dd className="mono">{driver.emergency_phone_number}</dd>
            </div>
            <div>
              <dt>Driving since</dt>
              <dd>{driver.driving_since}</dd>
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
