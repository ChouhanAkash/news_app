import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const KEY = "bookmarks:v1";
const BookmarksContext = createContext();

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(bookmarks)); } catch {}
  }, [bookmarks]);

  const isBookmarked = (url) => bookmarks.some((b) => b.url === url);
  const toggleBookmark = (article) => {
    setBookmarks((prev) => {
      const exists = prev.some((p) => p.url === article.url);
      if (exists) return prev.filter((p) => p.url !== article.url);
      return [article, ...prev].slice(0, 300);
    });
  };
  const clearBookmarks = () => setBookmarks([]);

  const value = useMemo(() => ({ bookmarks, toggleBookmark, isBookmarked, clearBookmarks }), [bookmarks]);
  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}

export const useBookmarks = () => useContext(BookmarksContext);
