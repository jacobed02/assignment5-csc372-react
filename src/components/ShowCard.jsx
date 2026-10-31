import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchShowCast } from "../api.js";
import { formatDate, plainText, textOrFallback } from "../utils.js";
import CastList from "./CastList.jsx";
import DetailField from "./DetailField.jsx";
import Poster from "./Poster.jsx";

export default function ShowCard({ show }) {
  const location = useLocation();
  const [castState, setCastState] = useState({ loading: true, entries: [], error: "" });
  const name = textOrFallback(show.name);
  const detailLocation = { pathname: `/shows/${show.id}`, search: location.search };
  const tvmazeUrl = show.url || `https://www.tvmaze.com/shows/${encodeURIComponent(show.id)}`;

  useEffect(() => {
    let active = true;
    setCastState({ loading: true, entries: [], error: "" });

    fetchShowCast(show.id)
      .then((entries) => {
        if (active) {
          setCastState({ loading: false, entries, error: "" });
        }
      })
      .catch((error) => {
        if (!active) {
          return;
        }
        console.error(`Unable to load cast for show ${show.id}:`, error);
        setCastState({
          loading: false,
          entries: [],
          error: error.status === 429
            ? "TVmaze rate limit reached. Try again shortly."
            : "Cast unavailable",
        });
      });

    return () => {
      active = false;
    };
  }, [show.id]);

  return (
    <article className="show-card">
      <div className="card-main">
        <Link className="poster-link" to={detailLocation} aria-label={`Details for ${name}`}>
          <Poster show={show} />
        </Link>
        <div className="card-copy">
          <h3 className="show-title"><Link to={detailLocation}>{name}</Link></h3>
          <div className="show-meta">
            <span>Premiered {formatDate(show.premiered)}</span>
            <span className="rating">
              {show.rating?.average != null ? `★ ${show.rating.average} / 10` : "Rating not available"}
            </span>
          </div>
          <p className="summary">{plainText(show.summary) || "No summary available."}</p>
          <div className="genres">
            {show.genres?.length
              ? show.genres.map((genre) => <span className="genre-tag" key={genre}>{genre}</span>)
              : <span className="genre-tag">Genre not available</span>}
          </div>
        </div>
      </div>
      <div className="card-details">
        <DetailField label="Last updated">{formatDate(show.updated, true)}</DetailField>
        <DetailField label="Main cast" className="cast-row">
          <CastList entries={castState.entries} loading={castState.loading} error={castState.error} limit={5} />
        </DetailField>
      </div>
      <div className="card-footer">
        <a className="tvmaze-link" href={tvmazeUrl} target="_blank" rel="noopener noreferrer">
          View on TVmaze ↗
        </a>
      </div>
    </article>
  );
}
