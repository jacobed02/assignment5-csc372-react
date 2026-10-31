const API_BASE = "https://api.tvmaze.com";
const searchCache = new Map();
const castCache = new Map();

export async function fetchJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = new Error(`TVmaze request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export async function searchShows(query, options) {
  const key = query.trim().toLocaleLowerCase();
  if (searchCache.has(key)) {
    return searchCache.get(key);
  }
  const results = await fetchJson(
    `${API_BASE}/search/shows?q=${encodeURIComponent(query)}`,
    options,
  );
  searchCache.set(key, results);
  return results;
}

export function fetchShow(showId, options) {
  return fetchJson(`${API_BASE}/shows/${encodeURIComponent(showId)}`, options);
}

export function fetchShowCast(showId) {
  const key = String(showId);
  if (!castCache.has(key)) {
    const request = fetchJson(`${API_BASE}/shows/${encodeURIComponent(showId)}/cast`)
      .catch((error) => {
        castCache.delete(key);
        throw error;
      });
    castCache.set(key, request);
  }
  return castCache.get(key);
}
