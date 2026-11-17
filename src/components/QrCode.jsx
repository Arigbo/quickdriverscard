"use client";
import { useEffect, useState } from "react";
import QRious from "qrious";

// Renders a QR code that points at the public verification page for a driver.
export default function QrCode({ driverId, size = 256, className = "" }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const url = `${window.location.origin}/driver/${driverId}`;
    const qr = new QRious({
      value: url,
      size,
      level: "M",
      padding: 0,
      background: "#ffffff",
      foreground: "#0e0e0c",
    });
    setSrc(qr.toDataURL());
  }, [driverId, size]);

  return (
    <div className={`qr ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="QR code linking to the driver's verification page" />
      ) : (
        <span className="qr-placeholder" aria-hidden="true" />
      )}
    </div>
  );
}
