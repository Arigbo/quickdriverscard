"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useAllowMotion, useFinePointer } from "./usePrefersMotion";

const INTERACTIVE = "a, button, [data-cursor], input, label, [role='button']";

// A precise dot plus a lagging ring. The ring swells over interactive
// elements and can show a short label via `data-cursor="Label"`.
export default function Cursor() {
  const fine = useFinePointer();
  const allow = useAllowMotion();
  const enabled = fine && allow;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  const [state, setState] = useState({ hover: false, label: "", text: false, down: false, hidden: true });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target instanceof Element ? e.target : null;
      const hit = el?.closest(INTERACTIVE);
      const text = !!el?.closest("input, textarea");
      const label = hit?.closest("[data-cursor]")?.getAttribute("data-cursor") || "";
      setState((s) =>
        s.hover === !!hit && s.label === label && s.text === text && !s.hidden
          ? s
          : { ...s, hover: !!hit, label, text, hidden: false }
      );
    };
    const leave = () => setState((s) => ({ ...s, hidden: true }));
    const down = () => setState((s) => ({ ...s, down: true }));
    const up = () => setState((s) => ({ ...s, down: false }));

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = state.label ? 84 : state.hover ? 52 : 30;
  const scale = state.down ? 0.85 : 1;

  return (
    <div className="cursor" aria-hidden="true" data-hidden={state.hidden || state.text}>
      <motion.div className="cursor-dot-pos" style={{ x, y }}>
        <motion.div className="cursor-dot" animate={{ scale: state.hover ? 0 : 1 }} />
      </motion.div>
      <motion.div className="cursor-ring-pos" style={{ x: rx, y: ry }}>
        <motion.div
          className="cursor-ring"
          data-label={!!state.label}
          animate={{ width: size, height: size, scale }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          <AnimatePresence>
            {state.label && (
              <motion.span
                key={state.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
              >
                {state.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
