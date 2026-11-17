"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/usePrefersMotion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import IdCard, { IdCardBack } from "@/components/IdCard";
import TiltCard from "@/components/motion/TiltCard";
import SplitReveal from "@/components/motion/SplitReveal";
import Magnetic from "@/components/motion/Magnetic";

const ease = [0.22, 1, 0.36, 1];

export default function Hero({ driver }) {
  const ref = useRef(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [-4, 10]);
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [0, 35]);

  return (
    <section
      ref={ref}
      className="hero container spotlight"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
      }}
    >
      <motion.div className="hero-copy" style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="eyebrow-dot" /> Driver identity, simplified
        </motion.p>
        <SplitReveal
          className="display"
          delay={0.1}
          lines={[["Every", "driver,"], ["verified", "in"], ["_one", "_scan."]]}
        />
        <motion.p
          className="lede"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease }}
        >
          Quick Drivers Card turns driver and vehicle records into a printable
          ID with a QR code. Scan it to confirm who&rsquo;s behind the
          wheel&nbsp;— and whether their papers are in order.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease }}
        >
          <Magnetic>
            <Link href="/dashboard" className="btn btn--primary">
              Open dashboard <ArrowRight size={16} strokeWidth={1.75} />
            </Link>
          </Magnetic>
          <Link href="/driver/1" className="link-arrow">
            View a sample record <ArrowUpRight size={16} strokeWidth={1.75} />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-figure"
        initial={{ opacity: 0, y: 60, rotateX: 40, rotateZ: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0, rotateZ: 0 }}
        transition={{ duration: 1.6, delay: 0.35, ease }}
      >
        <motion.div className="hero-card-stage" style={reduced ? undefined : { y: cardY, rotateZ: cardRotate, rotateX: cardRotateX }}>
          <TiltCard
            className="idcard-frame"
            front={<IdCard driver={driver} />}
            back={<IdCardBack driver={driver} />}
          />
        </motion.div>
        <p className="caption">Fig. 1 — Card issued to driver QDC-0001 · click to flip</p>
      </motion.div>

      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{ opacity: copyOpacity }}
        aria-hidden="true"
      >
        <span>Scroll</span>
        <span className="scroll-hint-line" />
      </motion.div>
    </section>
  );
}
