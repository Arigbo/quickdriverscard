"use client";
import { MotionConfig } from "framer-motion";
import SmoothScroll from "./SmoothScroll";
import Cursor from "./Cursor";

export default function Providers({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      {children}
      <Cursor />
    </MotionConfig>
  );
}
