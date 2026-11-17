"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

// Centered dialog on desktop, bottom sheet on phones.
export default function Modal({ open, onClose, title, eyebrow, children, footer, size = "md", labelledBy }) {
  return (
    <AnimatePresence>
      {open && (
        <Panel onClose={onClose} title={title} eyebrow={eyebrow} footer={footer} size={size} labelledBy={labelledBy}>
          {children}
        </Panel>
      )}
    </AnimatePresence>
  );
}

function Panel({ onClose, title, eyebrow, children, footer, size, labelledBy }) {
  const closeRef = useRef(null);
  const titleId = labelledBy ?? "modal-title";

  useEffect(() => {
    const prev = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey, true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.body.style.overflow = prevOverflow;
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="modal-root" data-lenis-prevent>
      <motion.div
        className="modal-scrim"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.div
        className={`modal modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.45, ease }}
      >
        <div className="modal-head">
          <div>
            {eyebrow && <p className="eyebrow eyebrow--plain">{eyebrow}</p>}
            <h2 id={titleId} className="modal-title">{title}</h2>
          </div>
          <button ref={closeRef} className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </motion.div>
    </div>
  );
}
