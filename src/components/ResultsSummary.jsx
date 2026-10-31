import { textOrFallback } from "../utils.js";

export default function ResultsSummary({ query, count }) {
  return (
    <p className="result-count" aria-live="polite">
      {count} {count === 1 ? "show" : "shows"} found
      {query ? <> for <strong>“{textOrFallback(query)}”</strong></> : " for the current search"}
    </p>
  );
}
