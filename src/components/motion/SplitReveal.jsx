"use client";
import { motion } from "framer-motion";

// Headline that rises word by word from behind a mask.
// `lines` is an array of lines; each line is an array of words.
// A word prefixed with "_" renders in italics.
// Set `inView` to play when scrolled into view instead of on load.
export default function SplitReveal({ lines, as = "h1", className = "", delay = 0, stagger = 0.06, inView = false }) {
  const Tag = motion[as];
  let i = 0;
  return (
    <Tag
      className={className}
      initial="hidden"
      {...(inView ? { whileInView: "show", viewport: { once: true, margin: "-80px" } } : { animate: "show" })}
      aria-label={lines.flat().join(" ").replace(/_/g, "")}>
      {lines.map((line, li) => (
        <span className="split-line" key={li} aria-hidden="true">
          {line.map((word, wi) => {
            const italic = word.startsWith("_");
            const text = italic ? word.slice(1) : word;
            const d = delay + i++ * stagger;
            return (
              <span className="split-mask" key={wi}>
                <motion.span
                  className="split-word"
                  variants={{
                    hidden: { y: "110%", rotate: 4 },
                    show: { y: "0%", rotate: 0, transition: { duration: 1, delay: d, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  {italic ? <em>{text}</em> : text}
                </motion.span>
                {wi < line.length - 1 ? " " : null}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
