import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <Link className="wordmark" to="/" aria-label="ScreenScout home">
        <span className="wordmark-icon" aria-hidden="true">S</span>
        <span>screen<span className="wordmark-accent">scout</span></span>
      </Link>
      <span className="header-note">Your next watch starts here</span>
    </header>
  );
}
