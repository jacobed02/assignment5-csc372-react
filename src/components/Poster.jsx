import { useState } from "react";
import { textOrFallback } from "../utils.js";

export default function Poster({ show, detail = false }) {
  const [failed, setFailed] = useState(false);
  const image = show.image?.original || show.image?.medium;
  const name = textOrFallback(show.name, "this show");

  if (!image || failed) {
    return (
      <div
        className={detail ? "detail-poster poster-placeholder" : "poster-placeholder"}
        role="img"
        aria-label={`No poster available for ${name}`}
      >
        ✦
      </div>
    );
  }

  return (
    <img
      className={detail ? "detail-poster" : "poster"}
      src={image}
      alt={`Poster for ${name}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
