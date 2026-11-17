"use client";
import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/usePrefersMotion";
import IdCard from "@/components/IdCard";

// Pinned section: a stack of cards fans out in 3D as the page scrolls.
export default function Deck({ drivers }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const spring = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  // Reduced motion: show the fanned-out end state without scroll animation.
  const settled = useMotionValue(1);
  const p = useReducedMotionSafe() ? settled : spring;
  const count = useTransform(p, [0.05, 0.75], [1, drivers.length]);
  const counter = useTransform(count, (v) => String(Math.round(v)).padStart(2, "0"));

  return (
    <section ref={ref} className="deck">
      <div className="deck-sticky container">
        <div className="deck-copy">
          <p className="section-label">Issue</p>
          <h2 className="section-title">One record. One card. One code.</h2>
          <p className="lede">
            Every card carries a QR code unique to its driver, so a scan always
            resolves to the right record&nbsp;— even when the cards look alike.
          </p>
          <p className="deck-counter mono">
            <motion.span>{counter}</motion.span>
            <span className="deck-counter-total"> / {String(drivers.length).padStart(2, "0")} cards</span>
          </p>
        </div>
        <div className="deck-stage">
          {drivers.map((d, i) => (
            <DeckCard key={d.id} driver={d} i={i} n={drivers.length} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DeckCard({ driver, i, n, p }) {
  const mid = (n - 1) / 2;
  const offset = i - mid;
  const x = useTransform(p, [0, 0.8], ["0%", `${offset * 24}%`]);
  const y = useTransform(p, [0, 0.8], [`${-i * 3}%`, `${Math.abs(offset) * 7}%`]);
  const rotateZ = useTransform(p, [0, 0.8], [-6 + i * 1.5, offset * 7]);
  const rotateX = useTransform(p, [0, 0.8], [55, 0]);
  const rotateY = useTransform(p, [0, 0.8], [-20, offset * -6]);
  const scale = useTransform(p, [0, 0.8], [0.9, 1]);

  return (
    <motion.div
      className="deck-card"
      style={{ x, y, rotateZ, rotateX, rotateY, scale, zIndex: n - Math.abs(Math.round(offset)) }}
      whileHover={{ y: "-6%", transition: { duration: 0.3 } }}
    >
      <div className="idcard-frame">
        <IdCard driver={driver} />
      </div>
    </motion.div>
  );
}
