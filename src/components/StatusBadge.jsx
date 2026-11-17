import { STATUS_LABEL } from "@/data/drivers";

export default function StatusBadge({ status, label }) {
  return (
    <span className={`badge badge--${status}`}>
      <span className="badge-dot" aria-hidden="true" />
      {label ?? STATUS_LABEL[status]}
    </span>
  );
}
