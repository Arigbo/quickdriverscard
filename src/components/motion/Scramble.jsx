"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";

// Decodes text from random glyphs, left to right — like a scanner locking on.
export default function Scramble({ text, delay = 200, speed = 38, className = "" }) {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    let timer;
    const hold = Math.round(delay / speed);
    const total = hold + text.length * 3;
    const tick = () => {
      frame++;
      const settled = Math.max(0, Math.floor((frame - hold) / 3));
      setOut(
        text
          .split("")
          .map((c, i) => (c === " " || i < settled ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
          .join("")
      );
      if (frame < total) timer = setTimeout(tick, speed);
    };
    tick();
    return () => clearTimeout(timer);
  }, [text, delay, speed, reduced]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}
