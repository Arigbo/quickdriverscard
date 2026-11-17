import { ImageResponse } from "next/og";
import OgMark from "@/components/og/OgMark";
import { ogFonts } from "@/lib/ogFonts";
import { SITE } from "@/lib/site";
import { cardNumber, driverStatus, getDriver } from "@/data/drivers";

export const alt = "Driver verification record";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TONE = {
  valid: ["#1f7a4d", "#e6f1ea", "All documents valid"],
  expiring: ["#9a6210", "#f6ecd8", "Documents expiring soon"],
  expired: ["#b0402a", "#f5e3de", "Documents expired"],
  none: ["#5c5b56", "#f0efea", "No documents on file"],
};

// Share preview for a verification link. Shows the plate and status only;
// the driver's name is left out on purpose.
export default async function Image({ params }) {
  const { id } = await params;
  const driver = getDriver(id);
  const status = driver ? driverStatus(driver) : "none";
  const [fg, bg, text] = TONE[status];

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#f7f7f4", padding: 72, fontFamily: "Serif" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <OgMark size={34} />
            <span style={{ fontSize: 26 }}>{SITE.name}</span>
          </div>
          <span style={{ fontSize: 16, letterSpacing: 3, color: "#9a9993", textTransform: "uppercase" }}>Verification</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontSize: 18, letterSpacing: 3, color: "#9a9993", textTransform: "uppercase" }}>Plate number</span>
          <span style={{ fontFamily: "Mono", fontSize: 150, letterSpacing: -6, color: "#111110", lineHeight: 1 }}>
            {driver ? driver.plate_number : "Record"}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 26px", borderRadius: 999, background: bg, color: fg, fontSize: 30 }}>
            <div style={{ width: 12, height: 12, borderRadius: 99, background: fg }} />
            {driver ? text : "Open to verify"}
          </div>
          <span style={{ fontFamily: "Mono", fontSize: 22, color: "#5c5b56" }}>{driver ? cardNumber(driver) : ""}</span>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() }
  );
}
