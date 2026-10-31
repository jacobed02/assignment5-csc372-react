export default function CastList({ entries = [], loading = false, error = "", limit }) {
  if (loading) {
    return <span className="cast-value is-loading">Loading cast…</span>;
  }
  if (error) {
    return <span className="cast-value">{error}</span>;
  }

  const availableCast = entries.filter((entry) => entry.person?.name);
  const cast = limit ? availableCast.slice(0, limit) : availableCast.slice(0, 15);

  if (!cast.length) {
    return <span className="cast-value">Not available</span>;
  }

  return (
    <ul className={limit ? "cast-list cast-list-compact" : "cast-list"}>
      {cast.map((entry) => (
        <li key={`${entry.person.id}-${entry.character?.id ?? "role"}`}>
          <span>{entry.person.name}</span>
          {!limit && entry.character?.name && (
            <span className="cast-character"> as {entry.character.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
