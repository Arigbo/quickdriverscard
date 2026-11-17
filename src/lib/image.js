"use client";
// Downscale an image file in the browser. Returns a Blob (or data URL).

function load(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ img, url });
    img.onerror = reject;
    img.src = url;
  });
}

async function draw(file, max, square) {
  const { img, url } = await load(file);
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;
  let sx = 0;
  let sy = 0;
  if (square) {
    const side = Math.min(sw, sh);
    sx = (sw - side) / 2;
    sy = (sh - side) / 2;
    sw = sh = side;
  }
  const scale = Math.min(1, max / Math.max(sw, sh));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(sw * scale);
  canvas.height = Math.round(sh * scale);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(url);
  return canvas;
}

// Square, small JPEG data URL for driver photos (stored inline on the record).
export async function photoToDataUrl(file) {
  const canvas = await draw(file, 320, true);
  return canvas.toDataURL("image/jpeg", 0.86);
}

// Large document scans are downscaled to keep storage small but legible.
export async function compressDocument(file) {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") return file;
  const canvas = await draw(file, 2000, false);
  const blob = await new Promise((r) => canvas.toBlob(r, "image/jpeg", 0.85));
  if (!blob || blob.size >= file.size) return file;
  return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
}
