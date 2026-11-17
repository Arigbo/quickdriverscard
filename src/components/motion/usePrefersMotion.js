"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// True only on devices with a precise pointer (mouse/trackpad).
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return fine;
}

// True when it's OK to run decorative motion.
export function useAllowMotion() {
  const reduced = useReducedMotion();
  return !reduced;
}

// Like useReducedMotion, but always false on the first render so server and
// client markup match; the real preference applies right after hydration.
export function useReducedMotionSafe() {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(false);
  useEffect(() => setValue(!!reduced), [reduced]);
  return value;
}
