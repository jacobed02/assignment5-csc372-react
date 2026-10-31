export default function DetailField({ label, children, className = "" }) {
  return (
    <div className={className}>
      <span className="detail-label">{label}</span>
      <span className="detail-value">{children}</span>
    </div>
  );
}
