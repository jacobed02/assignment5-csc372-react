export function textOrFallback(value, fallback = "Not available") {
  return value === null || value === undefined || value === ""
    ? fallback
    : String(value);
}

export function plainText(html) {
  if (!html) {
    return "";
  }
  const parsed = new DOMParser().parseFromString(String(html), "text/html");
  return (parsed.body.textContent || "").replace(/\s+/g, " ").trim();
}

export function formatDate(value, includeTime = false) {
  if (value === null || value === undefined || value === "") {
    return "Not available";
  }
  const date = includeTime
    ? new Date(Number(value) * 1000)
    : new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }
  return new Intl.DateTimeFormat(undefined, includeTime
    ? {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
    : {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
}
