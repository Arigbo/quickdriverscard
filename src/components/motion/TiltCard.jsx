"use client";
import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useAllowMotion, useFinePointer } from "./usePrefersMotion";

// 3D card: tilts toward the pointer with a moving glare, floats when idle,
// and (optionally) flips on click to reveal a back face.
export default function TiltCard({ front, back, max = 14, float = true, className = "", cursorLabel }) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const allow = useAllowMotion();
  const [flipped, setFlipped] = useState(false);
  const [hovering, setHovering] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 160, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const gx = useTransform(px, [0, 1], [0, 100]);
  const gy = useTransform(py, [0, 1], [0, 100]);
  // Light falls where the pointer is; the far side of the card dims slightly.
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.35) 0%, rgba(17,17,16,0) 35%, rgba(17,17,16,0.07) 90%)`;

  const interactive = fine && allow;

  const onMove = (e) => {
    if (!interactive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    setHovering(false);
  };

  const label = cursorLabel ?? (back ? (flipped ? "Front" : "Flip") : undefined);

  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={onMove}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={onLeave}
      onClick={back ? () => setFlipped((f) => !f) : undefined}
      data-cursor={label}
      role={back ? "button" : undefined}
      tabIndex={back ? 0 : undefined}
      aria-label={back ? (flipped ? "Show front of card" : "Flip card") : undefined}
      onKeyDown={back ? (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setFlipped((f) => !f)) : undefined}
      animate={float && allow && !hovering ? { y: [0, -10, 0] } : { y: 0 }}
      transition={float && !hovering ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }}
    >
      <motion.div className="tilt-inner" style={{ rotateX, rotateY }}>
        <motion.div
          className="tilt-flipper"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 14 }}
        >
          <div className="tilt-face">
            {front}
            {interactive && <motion.div className="tilt-glare" style={{ backgroundImage: glare, opacity: hovering ? 1 : 0 }} />}
          </div>
          {back && <div className="tilt-face tilt-face--back">{back}</div>}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
