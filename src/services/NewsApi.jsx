const API_BASE = "https://newsapi.org/v2";
const KEY = import.meta.env.VITE_NEWS_API_KEY;

function ensureKey() {
  if (!KEY) throw new Error("Missing VITE_NEWS_API_KEY in .env (restart dev server).");
}

async function request(path, params = {}) {
  ensureKey();
  const url = new URL(API_BASE + path);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && `${v}` !== "") url.searchParams.set(k, v);
  });
  url.searchParams.set("apiKey", KEY);

  const res = await fetch(url.toString());
  let data = {};
  try { data = await res.json(); } catch {}
  if (!res.ok) {
    const msg = data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  const articles = Array.isArray(data.articles) ? data.articles.filter(Boolean) : [];
  const totalResults = typeof data.totalResults === "number" ? data.totalResults : articles.length;
  return { articles, totalResults };
}

export function fetchTopHeadlines({ country = "in", category = "general", page = 1, pageSize = 20 } = {}) {
  return request("/top-headlines", { country, category, page, pageSize });
}

export function searchEverything({ q, sortBy = "publishedAt", page = 1, pageSize = 20, language = "en", from, to } = {}) {
  const query = (q && q.trim()) || "latest";
  return request("/everything", { q: query, sortBy, page, pageSize, language, from, to });
}
