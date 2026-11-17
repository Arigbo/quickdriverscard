"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/usePrefersMotion";

// Words brighten one after another as the paragraph scrolls through view.
export default function ScrubText({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const reduced = useReducedMotionSafe();
  const words = text.split(" ");
  return (
    <p ref={ref} className={`scrub ${className}`} aria-label={text.replace(/_/g, "")}>
      {words.map((w, i) => (
        <Word key={i} still={reduced} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range, still }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [6, 0]);
  const italic = children.startsWith("_");
  const text = italic ? children.slice(1) : children;
  return (
    <span className="scrub-word" aria-hidden="true">
      <motion.span style={still ? { display: "inline-block" } : { opacity, y, display: "inline-block" }}>
        {italic ? <em>{text}</em> : text}
      </motion.span>{" "}
    </span>
  );
}
