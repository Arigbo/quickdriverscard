"use client";
import { useRef } from "react";

// Section with a soft light that follows the pointer.
export default function Spotlight({ children, className = "", as: Tag = "section" }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${e.clientX - r.left}px`);
    el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };
  return (
    <Tag ref={ref} className={`spotlight ${className}`} onPointerMove={onMove}>
      {children}
    </Tag>
  );
}
