"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, Search } from "lucide-react";
import Logo from "@/components/Logo";
import StatusBadge from "@/components/StatusBadge";
import DriverDrawer from "./DriverDrawer";
import {
  cardNumber,
  docStatus,
  driverStatus,
  EXPIRING_WINDOW_DAYS,
  fullName,
  initials,
  shortName,
} from "@/data/drivers";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "valid", label: "Valid" },
  { key: "expiring", label: "Expiring" },
  { key: "expired", label: "Expired" },
];

export default function Dashboard({ drivers }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  const rows = useMemo(
    () => drivers.map((d) => ({ ...d, status: driverStatus(d) })),
    [drivers]
  );

  const stats = useMemo(() => {
    const docs = rows.flatMap((d) => d.documents.map((x) => docStatus(x.expires)));
    return {
      drivers: rows.length,
      documents: docs.length,
      expiring: docs.filter((s) => s === "expiring").length,
      expired: docs.filter((s) => s === "expired").length,
    };
  }, [rows]);

  const counts = useMemo(() => {
    const c = { all: rows.length, valid: 0, expiring: 0, expired: 0 };
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
          <p className="eyebrow eyebrow--plain" suppressHydrationWarning>
            {today}
          </p>
          <h1 className="page-title">Drivers</h1>
        </div>

        <dl className="stats">
          <Stat label="Registered drivers" value={stats.drivers} />
          <Stat label="Documents on file" value={stats.documents} />
          <Stat
            label={`Expiring within ${EXPIRING_WINDOW_DAYS} days`}
            value={stats.expiring}
            tone={stats.expiring ? "expiring" : undefined}
          />
          <Stat
            label="Expired"
            value={stats.expired}
            tone={stats.expired ? "expired" : undefined}
          />
        </dl>

        <div className="toolbar">
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
                {f.label}
                <span className="segmented-count">{counts[f.key]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="table">
          <div className="table-row table-row--head" aria-hidden="true">
            <span>Driver</span>
            <span>Plate</span>
            <span className="hide-sm">Vehicle</span>
            <span className="hide-md">Documents</span>
            <span>Status</span>
            <span aria-hidden="true" />
          </div>

          {visible.map((d) => (
            <button
              key={d.id}
             
              className="table-row"
              onClick={() => setSelectedId(d.id)}
              aria-label={`Open ${shortName(d)}`}
            >
              <span className="cell-driver">
                <span className="avatar">{initials(d)}</span>
                <span>
                  <span className="cell-strong">{shortName(d)}</span>
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
                    key={doc.doc}
                    className={`dot dot--${docStatus(doc.expires)}`}
                    title={doc.doc}
                  />
                ))}
              </span>
              <span>
                <StatusBadge status={d.status} />
              </span>
              <ChevronRight size={16} strokeWidth={1.5} className="row-chevron" aria-hidden="true" />
            </button>
          ))}

          {visible.length === 0 && (
            <div className="empty">
              <p>No drivers match &ldquo;{query}&rdquo;.</p>
              <button className="link-arrow" onClick={() => { setQuery(""); setFilter("all"); }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>

      <DriverDrawer driver={selected} onClose={() => setSelectedId(null)} />
    </div>
  );
}

function Stat({ label, value, tone }) {
  return (
    <div className="stat">
      <dt>{label}</dt>
      <dd className={tone ? `tone--${tone}` : undefined}>{value}</dd>
    </div>
  );
}
