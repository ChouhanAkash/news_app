import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

const CATS = [
  "business",
  "sports",
  "technology",
  "health",
  "entertainment",
  "science",
];
const COUNTRIES = [
  { code: "in", label: "India" },
  { code: "us", label: "United States" },
  { code: "gb", label: "United Kingdom" },
];

export default function Navbar({
  category,
  onCategoryChange,
  country,
  onCountryChange,
  onSearch,
  sortBy,
  onSortBy,
  openBookmarks,
  bookmarksCount,
}) {
  const { theme, toggleTheme } = useTheme();
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(q.trim());
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-800 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold">NewsNow</div>
          <nav className="hidden md:flex gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => onCategoryChange(c)}
                className={`capitalize px-3 py-1 rounded-full text-sm ${
                  category === c
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                    : "border border-gray-300 dark:border-gray-700"
                }`}
              >
                {c}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={submit} className="flex items-center gap-2 flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search news..."
            className="flex-1 px-3 py-2 rounded-l-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-gray-900 text-white rounded-r-lg"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2">
          <select
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => onSortBy(e.target.value)}
            className="px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
          >
            <option value="relevancy">Relevancy</option>
            <option value="popularity">Popularity</option>
            <option value="publishedAt">Published date</option>
          </select>

          <button
            onClick={toggleTheme}
            className="px-2 py-1 border rounded border-gray-300 dark:border-gray-700"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button
            onClick={openBookmarks}
            className="px-2 py-1 border rounded border-gray-300 dark:border-gray-700"
          >
            🔖{" "}
            {bookmarksCount > 0 && (
              <span className="ml-1 text-sm">({bookmarksCount})</span>
            )}
          </button>
        </div>

        <div className="md:hidden mt-2 overflow-x-auto flex gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => onCategoryChange(c)}
              className={`capitalize px-3 py-1 rounded-full text-sm ${
                category === c
                  ? "bg-gray-900 text-white"
                  : "border border-gray-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
