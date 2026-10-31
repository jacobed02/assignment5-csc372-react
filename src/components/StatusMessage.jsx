export default function StatusMessage({ message, state = "default" }) {
  return (
    <div
      className={`status-message${state === "error" ? " is-error" : ""}`}
      role="status"
      aria-live="polite"
    >
      {state === "loading"
        ? <span className="spinner" aria-hidden="true" />
        : <span className="status-icon" aria-hidden="true">{state === "error" ? "!" : "✦"}</span>}
      <span>{message}</span>
    </div>
  );
}
