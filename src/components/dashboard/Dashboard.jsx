"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Plus, Search } from "lucide-react";
import Logo from "@/components/Logo";
import StatusBadge from "@/components/StatusBadge";
import DriverDrawer from "./DriverDrawer";
import AddDriverDialog from "./AddDriverDialog";
import Avatar from "@/components/Avatar";
import Magnetic from "@/components/motion/Magnetic";
import { useDrivers } from "@/lib/useDrivers";
import { missingTypes } from "@/data/nigeria";
import CountUp from "@/components/motion/CountUp";
import SplitReveal from "@/components/motion/SplitReveal";
import {
  cardNumber,
  docStatus,
  driverStatus,
  EXPIRING_WINDOW_DAYS,
  fullName,
  shortName,
} from "@/data/drivers";

const ease = [0.22, 1, 0.36, 1];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "valid", label: "Valid" },
  { key: "expiring", label: "Expiring" },
  { key: "expired", label: "Expired" },
];

export default function Dashboard({ seedRecords, seedVersions, seedVerifications }) {
  const { drivers } = useDrivers(seedRecords, seedVersions, seedVerifications);
  const [adding, setAdding] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  // After the first entrance, rows animate quickly on filter changes.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 1400);
    return () => clearTimeout(t);
  }, []);

  const rows = useMemo(
    () => drivers.map((d) => ({ ...d, status: driverStatus(d) })),
    [drivers]
  );

  const stats = useMemo(() => {
    const docs = rows.flatMap((d) => d.documents.map((x) => docStatus(x.expires)));
    const current = rows.flatMap((d) => d.documents.map((x) => x.versions[0]));
    return {
      drivers: rows.length,
      documents: docs.length,
      verified: current.filter((v) => v.verification?.status === "verified").length,
      missing: rows.reduce((n, d) => n + missingTypes(d).length, 0),
      expiring: docs.filter((s) => s === "expiring").length,
      expired: docs.filter((s) => s === "expired").length,
    };
  }, [rows]);

  const counts = useMemo(() => {
    const c = { all: rows.length, valid: 0, expiring: 0, expired: 0, none: 0 };
    rows.forEach((r) => (c[r.status] += 1));
    return c;
  }, [rows]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((d) => {
      if (filter !== "all" && d.status !== filter) return false;
      if (!q) return true;
      return [fullName(d), d.plate_number, d.car, cardNumber(d), d.state]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [rows, query, filter]);

  const selected = rows.find((d) => d.id === selectedId) ?? null;
  const nextId = rows.reduce((m, d) => Math.max(m, Number(d.id) || 0), 0) + 1;

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="app">
      <header className="app-bar">
        <div className="container app-bar-inner">
          <div className="app-bar-left">
            <Logo compact />
            <span className="app-bar-sep" aria-hidden="true">/</span>
            <span className="app-bar-title">Dashboard</span>
          </div>
          <Link href="/" className="link-arrow link-arrow--muted">
            Back to site <ArrowUpRight size={15} strokeWidth={1.75} />
          </Link>
        </div>
      </header>

      <main className="container app-main">
        <div className="page-head">
          <motion.p
            className="eyebrow eyebrow--plain"
            suppressHydrationWarning
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            {today}
          </motion.p>
          <div className="page-head-row">
            <SplitReveal className="page-title" lines={[["Drivers"]]} delay={0.05} />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
            >
              <Magnetic>
                <button className="btn btn--primary" onClick={() => setAdding(true)}>
                  <Plus size={16} strokeWidth={1.75} /> Add driver
                </button>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        <dl className="stats">
          <Stat i={0} label="Registered drivers" value={stats.drivers} />
          <Stat i={1} label={`of ${stats.documents} documents verified with issuers`} value={stats.verified} />
          <Stat
            i={2}
            label={`Expiring within ${EXPIRING_WINDOW_DAYS} days`}
            value={stats.expiring}
            tone={stats.expiring ? "expiring" : undefined}
          />
          <Stat
            i={3}
            label="Expired"
            value={stats.expired}
            tone={stats.expired ? "expired" : undefined}
          />
        </dl>

        <motion.div
          className="toolbar"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
        >
          <label className="search">
            <Search size={16} strokeWidth={1.75} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search name, plate or vehicle"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search drivers"
            />
          </label>
          <div className="segmented" role="group" aria-label="Filter by status">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                aria-pressed={filter === f.key}
                className={filter === f.key ? "is-active" : ""}
                onClick={() => setFilter(f.key)}
              >
                {filter === f.key && (
                  <motion.span
                    layoutId="segmented-pill"
                    className="segmented-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="segmented-text">
                  {f.label}
                  <span className="segmented-count">{counts[f.key]}</span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="table">
          <div className="table-row table-row--head" aria-hidden="true">
            <span>Driver</span>
            <span>Plate</span>
            <span className="hide-sm">Vehicle</span>
            <span className="hide-md">Documents</span>
            <span>Status</span>
            <span aria-hidden="true" />
          </div>

          <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((d, i) => (
            <motion.button
              key={d.id}
              layout
              className="table-row"
              onClick={() => setSelectedId(d.id)}
              aria-label={`Open ${shortName(d)}`}
              data-cursor="Open"
              initial={mounted ? { opacity: 0, scale: 0.98 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay: mounted ? 0 : 0.6 + i * 0.06, ease } }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
              transition={{ layout: { type: "spring", stiffness: 380, damping: 36 } }}
            >
              <span className="cell-driver">
                <Avatar driver={d} />
                <span>
                  <span className="cell-strong">
                    {shortName(d)}
                    {d.source === "local" && <span className="tag">New</span>}
                  </span>
                  <span className="cell-muted mono">{cardNumber(d)}</span>
                </span>
              </span>
              <span className="mono">{d.plate_number}</span>
              <span className="hide-sm">
                {d.car}
                <span className="cell-muted">{d.vehicle_model_year}</span>
              </span>
              <span className="hide-md doc-dots" aria-label="Document statuses">
                {d.documents.map((doc) => (
                  <span
                    key={doc.type}
                    className={`dot dot--${docStatus(doc.expires)} ${doc.versions[0].verification?.status === "verified" ? "dot--checked" : ""}`}
                    title={`${doc.type}${doc.versions[0].verification?.status === "verified" ? " · verified" : ""}`}
                  />
                ))}
                {missingTypes(d).length > 0 && (
                  <span className="doc-missing" title={`Missing: ${missingTypes(d).join(", ")}`}>
                    +{missingTypes(d).length} missing
                  </span>
                )}
              </span>
              <span>
                <StatusBadge status={d.status} />
              </span>
              <ChevronRight size={16} strokeWidth={1.5} className="row-chevron" aria-hidden="true" />
            </motion.button>
          ))}
          </AnimatePresence>

          {visible.length === 0 && (
            <div className="empty">
              <p>{query ? <>No drivers match &ldquo;{query}&rdquo;.</> : "No drivers in this view."}</p>
              <button className="link-arrow" onClick={() => { setQuery(""); setFilter("all"); }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>

      <DriverDrawer driver={selected} onClose={() => setSelectedId(null)} />
      <AddDriverDialog
        open={adding}
        onClose={() => setAdding(false)}
        nextId={nextId}
        onCreated={(id) => {
          setQuery("");
          setFilter("all");
          setTimeout(() => setSelectedId(id), 450);
        }}
      />
    </div>
  );
}

function Stat({ label, value, tone, i }) {
  return (
    <motion.div
      className="stat"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease }}
    >
      <dt>{label}</dt>
      <dd className={tone ? `tone--${tone}` : undefined}>
        <CountUp value={value} delay={0.3 + i * 0.08} />
      </dd>
    </motion.div>
  );
}
