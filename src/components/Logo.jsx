import Link from "next/link";

export function LogoMark({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="logo-mark"
    >
      <rect width="20" height="20" rx="5" fill="currentColor" />
      <rect x="4" y="4" width="5" height="5" rx="1.2" fill="var(--logo-fg, #fff)" />
      <rect x="11" y="4" width="5" height="5" rx="1.2" fill="var(--logo-fg, #fff)" />
      <rect x="4" y="11" width="5" height="5" rx="1.2" fill="var(--logo-fg, #fff)" />
      <rect x="12.5" y="12.5" width="2" height="2" rx="0.5" fill="var(--logo-fg, #fff)" />
    </svg>
  );
}

export default function Logo({ href = "/", compact = false }) {
  return (
    <Link href={href} className="logo" aria-label="Quick Drivers Card — home">
      <LogoMark />
      {!compact && <span className="logo-text">Quick Drivers Card</span>}
    </Link>
  );
}
