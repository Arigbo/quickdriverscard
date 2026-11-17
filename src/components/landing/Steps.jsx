"use client";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function Steps({ steps }) {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <motion.li
          key={s.n}
          className="step"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          whileHover="hover"
        >
          <motion.span
            className="step-rule"
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, delay: i * 0.15, ease } } }}
          />
          <motion.span
            className="step-n"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.3 + i * 0.15 } } }}
          >
            {s.n}
          </motion.span>
          <motion.h3
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.35 + i * 0.15, ease } },
              hover: { x: 6, transition: { duration: 0.4, ease } },
            }}
          >
            {s.title}
          </motion.h3>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.45 + i * 0.15, ease } },
            }}
          >
            {s.body}
          </motion.p>
        </motion.li>
      ))}
    </ol>
  );
}
