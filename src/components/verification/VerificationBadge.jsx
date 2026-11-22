import { Shield, ShieldAlert, ShieldCheck, ShieldQuestion, ShieldX } from "lucide-react";

export const CHECK_LABEL = {
  verified: "Verified",
  mismatch: "Details don't match",
  not_found: "Not found",
  error: "Check failed",
  unverified: "Not verified",
};

const ICON = {
  verified: ShieldCheck,
  mismatch: ShieldAlert,
  not_found: ShieldX,
  error: ShieldQuestion,
  unverified: Shield,
};

export const checkStatus = (v) => v?.status ?? "unverified";

// Compact "checked with the issuer" indicator.
export default function VerificationBadge({ verification, compact = false }) {
  const status = checkStatus(verification);
  const Icon = ICON[status];
  return (
    <span className={`vbadge vbadge--${status}`} title={CHECK_LABEL[status]}>
      <Icon size={13} strokeWidth={1.75} aria-hidden="true" />
      {compact ? <span className="visually-hidden">{CHECK_LABEL[status]}</span> : CHECK_LABEL[status]}
    </span>
  );
}
