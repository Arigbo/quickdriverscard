"use client";
import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Inertial smooth scrolling. Off for reduced-motion users; scrollable
// overlays opt out with `data-lenis-prevent`.
export default function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      anchors: { offset: -24 },
      autoRaf: true,
      autoToggle: true,
    });
    return () => lenis.destroy();
  }, [reduced]);

  return null;
}
