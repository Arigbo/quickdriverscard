"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/usePrefersMotion";
import Scramble from "@/components/motion/Scramble";

const docs = [
  { doc: "Driver's Licence", note: "Until Jun 2028", status: "valid" },
  { doc: "Vehicle Registration", note: "Until Jun 2027", status: "valid" },
  { doc: "Insurance Certificate", note: "In 41 days", status: "expiring" },
];

const ease = [0.22, 1, 0.36, 1];

// Phone preview that stands up in 3D as it scrolls into view, then "scans".
export default function Phone() {
  const ref = useRef(null);
  const reduced = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [38, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-8, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);

  return (
    <div className="phone-stage" ref={ref}>
      <motion.div className="phone" style={reduced ? undefined : { rotateX, rotateZ, y, scale }}>
        <motion.div
          className="phone-screen"
          aria-label="Preview of a verification page"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
        >
          <div className="phone-bar">
            <span className="mono">quickdriverscard.app</span>
          </div>
          <motion.span
            className="phone-scan"
            variants={{ hidden: { top: "0%", opacity: 0 }, show: { top: ["0%", "100%"], opacity: [0, 1, 1, 0], transition: { duration: 1.4, ease: "easeInOut", delay: 0.2 } } }}
            aria-hidden="true"
          />
          <div className="phone-body">
            <p className="phone-label">Plate</p>
            <p className="phone-plate mono">
              <InViewScramble text="LAG 456 BB" />
            </p>
            <motion.p
              className="phone-name"
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.8, ease } } }}
            >
              James Akin Adeleke
            </motion.p>
            <motion.div
              className="phone-status"
              variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1, transition: { delay: 1.1, type: "spring", stiffness: 300, damping: 18 } } }}
            >
              <span className="badge badge--expiring">
                <span className="badge-dot badge-dot--pulse" /> 1 document expiring soon
              </span>
            </motion.div>
            <ul className="phone-docs">
              {docs.map((d, i) => (
                <motion.li
                  key={d.doc}
                  variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { delay: 1.25 + i * 0.12, duration: 0.6, ease } } }}
                >
                  <span>
                    {d.doc}
                    <small>{d.note}</small>
                  </span>
                  <motion.span
                    className={`dot dot--${d.status}`}
                    variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { delay: 1.45 + i * 0.12, type: "spring", stiffness: 500, damping: 15 } } }}
                  />
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Starts decoding the text once it scrolls into view.
function InViewScramble({ text }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  return (
    <span ref={ref}>
      {inView ? <Scramble text={text} delay={500} /> : <span style={{ opacity: 0 }}>{text}</span>}
    </span>
  );
}
