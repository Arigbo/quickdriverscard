import { ImageResponse } from "next/og";
import OgMark from "@/components/og/OgMark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#111110" }}>
        <OgMark size={110} bg="#111110" fg="#f7f7f4" />
      </div>
    ),
    size
  );
}
