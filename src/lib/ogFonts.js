import { readFile } from "node:fs/promises";
import path from "node:path";

const dir = path.join(process.cwd(), "src/assets/fonts");

// Fonts for next/og share images (WOFF; the renderer can't read WOFF2).
export async function ogFonts() {
  const [serif, serifItalic, mono] = await Promise.all([
    readFile(path.join(dir, "InstrumentSerif-Regular.woff")),
    readFile(path.join(dir, "InstrumentSerif-Italic.woff")),
    readFile(path.join(dir, "JetBrainsMono-Medium.woff")),
  ]);
  return [
    { name: "Serif", data: serif, style: "normal", weight: 400 },
    { name: "Serif", data: serifItalic, style: "italic", weight: 400 },
    { name: "Mono", data: mono, style: "normal", weight: 500 },
  ];
}
