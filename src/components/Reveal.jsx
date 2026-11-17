"use client";
import { motion } from "framer-motion";

// Quiet fade-up on first view. Disabled automatically for reduced motion.
export default function Reveal({ children, delay = 0, as = "div", className }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
