import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/main.scss";

// Self-hosted via next/font so fonts are same-origin (needed to embed them
// in exported PDF cards) and load without layout shift.
const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Quick Drivers Card — Driver identity, verified in one scan",
  description:
    "Issue printable driver ID cards with QR codes. Anyone can scan to verify a driver and the status of their vehicle documents.",
};

export const viewport = {
  themeColor: "#f7f7f4",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
