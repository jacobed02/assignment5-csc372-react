import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchShows } from "../api.js";
import ResultsSummary from "../components/ResultsSummary.jsx";
import SearchForm from "../components/SearchForm.jsx";
import ShowList from "../components/ShowList.jsx";
import StatusMessage from "../components/StatusMessage.jsx";

const DEFAULT_QUERY = "The Bear";
const MAX_RESULTS = 10;

export default function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.has("q")
    ? searchParams.get("q") || ""
    : DEFAULT_QUERY;
  const [query, setQuery] = useState(queryFromUrl);
  const [shows, setShows] = useState([]);
  const [request, setRequest] = useState({
    type: "loading",
    message: `Looking for “${DEFAULT_QUERY}”…`,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => setQuery(queryFromUrl), [queryFromUrl]);

  useEffect(() => {
    const searchTerm = queryFromUrl.trim();
    const controller = new AbortController();
    let active = true;

    setShows([]);
    if (!searchTerm) {
      setLoading(false);
      setRequest({
        type: "default",
        message: "Enter a show title or keyword to search TVmaze.",
      });
      return () => controller.abort();
    }

    setLoading(true);
    setRequest({ type: "loading", message: `Looking for “${searchTerm}”…` });

    searchShows(searchTerm, { signal: controller.signal })
      .then((results) => {
        if (!active) {
          return;
        }
        const matches = results
          .map((result) => result.show)
          .filter(Boolean)
          .slice(0, MAX_RESULTS);
        setShows(matches);
        setRequest(matches.length
          ? null
          : {
            type: "default",
            message: `No shows found for “${searchTerm}”. Try another title or keyword.`,
          });
      })
      .catch((error) => {
        if (!active || error.name === "AbortError") {
          return;
        }
        console.error("Unable to search TVmaze:", error);
        setRequest({
          type: "error",
          message: error.status === 429
            ? "TVmaze is receiving too many requests right now. Please wait a moment before searching again."
            : "We couldn’t load shows right now. Please check your connection and try again.",
        });
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [queryFromUrl]);

  function handleSubmit(event) {
    event.preventDefault();
    setSearchParams({ q: query.trim() });
  }

  return (
    <>
      <SearchForm query={query} onChange={setQuery} onSubmit={handleSubmit} />
      <section className="results-section" aria-labelledby="results-heading">
        <div className="results-heading-row">
          <div>
            <p className="section-kicker">PICK YOUR NEXT BINGE</p>
            <h2 id="results-heading">Explore shows<span className="heading-period">.</span></h2>
          </div>
          <ResultsSummary query={queryFromUrl.trim()} count={shows.length} />
        </div>
        {request && <StatusMessage message={request.message} state={request.type} />}
        <div aria-busy={loading}>
          <ShowList shows={shows} />
        </div>
      </section>
    </>
  );
}
