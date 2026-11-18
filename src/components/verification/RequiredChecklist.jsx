"use client";
import { Check, Plus } from "lucide-react";
import { docInfo, REQUIREMENT, requiredTypes } from "@/data/nigeria";

// Which documents Nigerian law expects for this vehicle, and which are on file.
export default function RequiredChecklist({ driver, onAdd }) {
  const have = new Set(driver.documents.map((d) => d.type));
  const types = requiredTypes(driver);
  const missing = types.filter((t) => !have.has(t)).length;
  return (
    <div className="checklist">
      <p className="cell-muted checklist-sum">
        {driver.vehicle_use === "commercial" ? "Commercial" : "Private"} vehicle
        {driver.imported ? " · imported" : ""} · {types.length - missing} of {types.length} required documents on file
      </p>
      <ul>
        {types.map((t) => {
          const ok = have.has(t);
          const info = docInfo(t);
          return (
            <li key={t} className={ok ? "ok" : "missing"}>
              <span className="checklist-icon" aria-hidden="true">{ok ? <Check size={12} strokeWidth={2.25} /> : null}</span>
              <span className="checklist-text">
                <span>{t}</span>
                {info.requirement !== "required" && <span className="cell-muted">{REQUIREMENT[info.requirement]}</span>}
              </span>
              {!ok && onAdd && (
                <button className="link-arrow" onClick={() => onAdd(t)}>
                  <Plus size={13} strokeWidth={2} /> Add
                </button>
              )}
              {!ok && !onAdd && <span className="checklist-missing">Missing</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
