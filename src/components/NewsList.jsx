import React, { useEffect, useMemo, useRef, useState } from "react";
import ArticleCard from "./ArticleCard.jsx";
import useInfiniteScroll from "../hooks/useInfiniteScroll.jsx";
import { fetchTopHeadlines, searchEverything } from "../services/NewsApi.jsx";

const PAGE_SIZE = 12;

export default function NewsList({ mode="top", category="business", country="in", query="", sortBy="publishedAt" }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("idle");
  const [err, setErr] = useState("");
  const sentinelRef = useRef(null);

  const isSearch = (query || "").trim().length > 0;

  const requestFn = useMemo(() => {
    return isSearch
      ? (p) => searchEverything({ q: query, sortBy, page: p, pageSize: PAGE_SIZE })
      : (p) => fetchTopHeadlines({ country, category, page: p, pageSize: PAGE_SIZE });
  }, [isSearch, query, sortBy, country, category]);
  useEffect(() => {
    let alive = true;
    (async () => {
      setStatus("loading");
      setErr("");
      try {
        const res = await fetch(`https://newsapi.org/v2/everything?q=tesla&from=2025-07-25&sortBy=publishedAt&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`);
        let data=await res.json()
        if (!alive) return;
        setArticles(data.articles || []);
        setTotal(res.totalResults || (res.articles ? res.articles.length : 0));
        setPage(1);
        setStatus("idle");
      } catch (e) {
        setErr(e?.message || "Failed to fetch");
        setStatus("error");
      }
    })();
    return () => { alive = false; };
  }, [requestFn]);

  useInfiniteScroll({
    targetRef: sentinelRef,
    disabled: status === "loading" || articles.length >= total,
    onIntersect: async () => {
      try {
        setStatus("loading");
        const next = page + 1;
        const res = await requestFn(next);
        setArticles((prev) => prev.concat(res.articles || []));
        setTotal(res.totalResults || (res.articles ? res.articles.length : total));
        setPage(next);
        setStatus("idle");
      } catch (e) {
        setErr(e?.message || "Failed to load more");
        setStatus("error");
      }
    },
    rootMargin: "300px"
  });

  return (
    <section className="mt-6 max-w-7xl mx-auto px-4">
      {status === "error" && (
        <div className="mt-10 text-center">
          <p className="text-red-600 font-medium">{err}</p>
          <p className="text-sm opacity-70 mt-1">Try changing category, search term, or country.</p>
        </div>
      )}

      {articles.length === 0 && status !== "loading" && status !== "error" && (
        <div className="mt-10 text-center opacity-80"><p>No articles found.</p></div>
      )}

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a, idx) => <ArticleCard key={`${a.url||idx}-${idx}`} article={a} />)}
      </div>

      <div ref={sentinelRef} className="h-8" />

      <div className="flex justify-center items-center h-20">
        {status === "loading" && <div className="animate-spin h-6 w-6 rounded-full border-2 border-gray-400 border-t-transparent" />}
      </div>
    </section>
  );
}
