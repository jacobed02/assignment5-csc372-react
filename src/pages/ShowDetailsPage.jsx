import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { fetchShow, fetchShowCast } from "../api.js";
import CastList from "../components/CastList.jsx";
import DetailField from "../components/DetailField.jsx";
import Poster from "../components/Poster.jsx";
import StatusMessage from "../components/StatusMessage.jsx";
import { formatDate, plainText, textOrFallback } from "../utils.js";

export default function ShowDetailsPage() {
  const { showId } = useParams();
  const [searchParams] = useSearchParams();
  const [state, setState] = useState({ loading: true, show: null, error: "" });
  const [castState, setCastState] = useState({ loading: false, entries: [], error: "" });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setState({ loading: true, show: null, error: "" });
    setCastState({ loading: false, entries: [], error: "" });

    fetchShow(showId, { signal: controller.signal })
      .then((show) => {
        if (active) {
          setState({ loading: false, show, error: "" });
        }
      })
      .catch((error) => {
        if (!active || error.name === "AbortError") {
          return;
        }
        console.error("Unable to load show details:", error);
        setState({
          loading: false,
          show: null,
          error: error.status === 404
            ? "That show could not be found. Check the URL and try again."
            : error.status === 429
              ? "TVmaze is receiving too many requests right now. Please wait a moment and try again."
              : "We couldn’t load this show right now. Please check your connection and try again.",
        });
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [showId]);

  useEffect(() => {
    if (!state.show) {
      return undefined;
    }

    let active = true;
    setCastState({ loading: true, entries: [], error: "" });
    fetchShowCast(state.show.id)
      .then((entries) => {
        if (active) {
          setCastState({ loading: false, entries, error: "" });
        }
      })
      .catch((error) => {
        if (!active) {
          return;
        }
        console.error(`Unable to load cast for show ${state.show.id}:`, error);
        setCastState({
          loading: false,
          entries: [],
          error: error.status === 429
            ? "TVmaze rate limit reached. Try again shortly."
            : "Cast is unavailable right now.",
        });
      });

    return () => {
      active = false;
    };
  }, [state.show]);

  const backToGallery = `/${searchParams.has("q")
    ? `?q=${encodeURIComponent(searchParams.get("q") || "")}`
    : ""}`;
  const show = state.show;
  const network = show?.network?.name || show?.webChannel?.name;
  const tvmazeUrl = show?.url || `https://www.tvmaze.com/shows/${encodeURIComponent(showId)}`;

  return (
    <section className="detail-section" aria-labelledby="detail-heading">
      <Link className="back-link" to={backToGallery}>← Back to search</Link>
      {state.loading && <StatusMessage message="Loading show details…" state="loading" />}
      {state.error && <StatusMessage message={state.error} state="error" />}
      {show && (
        <>
          <article className="show-detail">
            <div className="detail-poster-wrap">
              <Poster key={show.id} show={show} detail />
            </div>
            <div className="show-detail-copy">
              <p className="section-kicker">SHOW DETAILS</p>
              <h1 className="detail-page-title" id="detail-heading">{textOrFallback(show.name)}</h1>
              <div className="detail-meta">
                <span className="rating">
                  {show.rating?.average != null ? `★ ${show.rating.average} / 10` : "Rating not available"}
                </span>
                <span>Premiered {formatDate(show.premiered)}</span>
                <span>{textOrFallback(show.status)}</span>
              </div>
              <div className="genres">
                {show.genres?.length
                  ? show.genres.map((genre) => <span className="genre-tag" key={genre}>{genre}</span>)
                  : <span className="genre-tag">Genre not available</span>}
              </div>
              <p className="detail-summary">{plainText(show.summary) || "No summary available."}</p>
              <div className="detail-facts">
                <DetailField label="Last updated">{formatDate(show.updated, true)}</DetailField>
                <DetailField label={show.webChannel ? "Streaming channel" : "Network"}>
                  {textOrFallback(network)}
                </DetailField>
              </div>
              <a
                className="tvmaze-link detail-tvmaze-link"
                href={tvmazeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on TVmaze ↗
              </a>
            </div>
          </article>
          <section className="detail-cast" aria-labelledby="cast-heading">
            <h2 id="cast-heading">Cast</h2>
            <CastList
              entries={castState.entries}
              loading={castState.loading}
              error={castState.error}
            />
          </section>
        </>
      )}
    </section>
  );
}
