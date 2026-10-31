export default function SearchForm({ query, onChange, onSubmit }) {
  return (
    <section className="hero" aria-labelledby="page-title">
      <div className="hero-content">
        <p className="eyebrow"><span className="eyebrow-dot" /> THE TV SHOW FINDER</p>
        <h1 id="page-title">Find a show.<br /><span>Find your thing.</span></h1>
        <p className="hero-copy">Search thousands of shows and find your next story to get lost in.</p>
        <form className="search-form" role="search" onSubmit={onSubmit}>
          <label className="visually-hidden" htmlFor="search-input">
            Search shows by title or keyword
          </label>
          <span className="search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.3 4.3" />
            </svg>
          </span>
          <input
            id="search-input"
            name="q"
            type="search"
            value={query}
            placeholder="Try “The Bear” or “space adventure”"
            autoComplete="off"
            aria-describedby="search-hint"
            onChange={(event) => onChange(event.target.value)}
          />
          <button className="search-button" type="submit">
            Search <span aria-hidden="true">→</span>
          </button>
        </form>
        <p className="search-hint" id="search-hint">Search by show title or a few keywords</p>
      </div>
      <div className="hero-decoration" aria-hidden="true">
        <span className="decoration-ring ring-one" />
        <span className="decoration-ring ring-two" />
        <span className="decoration-star">✳</span>
        <span className="decoration-orb" />
      </div>
    </section>
  );
}
