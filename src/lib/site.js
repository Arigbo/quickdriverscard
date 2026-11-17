// Canonical site settings used by metadata, sitemap, robots and share images.
// Set NEXT_PUBLIC_SITE_URL in production (e.g. https://quickdriverscard.vercel.app).
// On Vercel, the production domain is picked up automatically.
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : null;

export const SITE = {
  name: "Quick Drivers Card",
  shortName: "QDC",
  url: (process.env.NEXT_PUBLIC_SITE_URL || fromVercel || "http://localhost:3000").replace(/\/$/, ""),
  title: "Quick Drivers Card — Driver identity, verified in one scan",
  description:
    "Issue printable driver ID cards with QR codes. Anyone can scan a card to verify the driver and see the live status and history of their vehicle documents.",
  keywords: [
    "driver ID card",
    "driver verification",
    "QR code ID card",
    "vehicle documents",
    "driver's licence verification",
    "fleet compliance",
    "document expiry tracking",
    "Nigeria",
  ],
  locale: "en_GB",
  themeColor: "#f7f7f4",
  ink: "#111110",
};
