"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Logo from "@/components/Logo";
import Magnetic from "@/components/motion/Magnetic";

// Hides while scrolling down, returns on scroll up; gains a hairline once scrolled.
export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setScrolled(y > 8);
  });

  return (
    <motion.header
      className="site-nav"
      data-scrolled={scrolled}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container site-nav-inner">
        <Logo />
        <nav className="site-nav-links" aria-label="Primary">
          <a href="#how" className="nav-link">How it works</a>
          <a href="#features" className="nav-link">Features</a>
          <Magnetic>
            <Link href="/dashboard" className="btn btn--ghost btn--sm">
              Dashboard
            </Link>
          </Magnetic>
        </nav>
      </div>
    </motion.header>
  );
}
