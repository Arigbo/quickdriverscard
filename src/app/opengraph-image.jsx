import { ImageResponse } from "next/og";
import OgMark from "@/components/og/OgMark";
import { ogFonts } from "@/lib/ogFonts";
import { SITE } from "@/lib/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const label = { fontSize: 13, letterSpacing: 2, color: "#9a9993", textTransform: "uppercase" };

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f7f7f4", padding: 72, fontFamily: "Serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <OgMark size={34} />
            <span style={{ fontSize: 26, color: "#111110" }}>{SITE.name}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 0.98, letterSpacing: -2.5, color: "#111110" }}>
            <span>Every driver,</span>
            <span>verified in</span>
            <span style={{ fontStyle: "italic", color: "#5c5b56" }}>one scan.</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#5c5b56" }}>
            Printable ID cards · QR verification · Document history
          </div>
        </div>

        {/* Card */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: 430,
              height: 271,
              padding: 30,
              background: "#ffffff",
              border: "1px solid #e7e6e1",
              borderRadius: 22,
              boxShadow: "0 40px 80px -30px rgba(17,17,16,0.35)",
              transform: "rotate(-5deg)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <OgMark size={18} />
                <span style={{ ...label, color: "#111110" }}>Driver card</span>
              </div>
              <span style={{ fontFamily: "Mono", fontSize: 13, color: "#5c5b56" }}>QDC-0001</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span style={{ fontSize: 38, color: "#111110" }}>James Adeleke</span>
                <div style={{ display: "flex", gap: 34 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={label}>Plate</span>
                    <span style={{ fontFamily: "Mono", fontSize: 18, color: "#111110" }}>LAG 456 BB</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={label}>Status</span>
                    <span style={{ fontFamily: "Mono", fontSize: 18, color: "#1f7a4d" }}>VALID</span>
                  </div>
                </div>
              </div>
              <QrGlyph />
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() }
  );
}

// A decorative QR-like grid (not a real code).
function QrGlyph() {
  const cells = "111011101100100010011101011000101110110100111011100110101100101011011101".split("");
  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: 96, height: 96 }}>
      {cells.slice(0, 64).map((c, i) => (
        <div key={i} style={{ width: 12, height: 12, background: c === "1" ? "#111110" : "transparent" }} />
      ))}
    </div>
  );
}
