import React from "react";
import { useBookmarks } from "../context/BookmarksContext.jsx";

export default function ArticleCard({ article }) {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(article.url);

  return (
    <article className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm">
      <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-900">
        <img
          src={
            article.urlToImage || "https://placehold.co/600x400?text=No+Image"
          }
          alt={article.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-lg line-clamp-2">{article.title}</h3>
        <p className="text-sm opacity-80 line-clamp-3">
          {article.description || "No description available."}
        </p>

        <div className="text-xs opacity-70 mt-1">
          <span>{article.author || "Unknown author"}</span>
          {" • "}
          <span>{article.source?.name || "Source"}</span>
          {" • "}
          <span>
            {article.publishedAt
              ? new Date(article.publishedAt).toLocaleString()
              : ""}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-sm"
          >
            Read Full ↗
          </a>

          <button
            onClick={() => toggleBookmark(article)}
            className={`px-3 py-2 rounded-xl border text-sm ${
              bookmarked
                ? "border-blue-600 text-blue-600"
                : "border-gray-300 dark:border-gray-700"
            }`}
          >
            {bookmarked ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </article>
  );
}
