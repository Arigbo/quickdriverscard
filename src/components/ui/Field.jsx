export default function Field({ label, required, error, hint, children, className = "", htmlFor }) {
  return (
    <div className={`field ${error ? "field--error" : ""} ${className}`}>
      <label className="field-label" htmlFor={htmlFor}>
        {label}
        {required && <span className="field-req" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error ? (
        <p className="field-msg" role="alert">{error}</p>
      ) : hint ? (
        <p className="field-hint">{hint}</p>
      ) : null}
    </div>
  );
}
