import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import NewsList from "./components/NewsList.jsx";
import BookmarkDrawer from "./components/BookmarkDrawer.jsx";
import { useBookmarks } from "./context/BookmarksContext.jsx";

export default function App() {
  const [category, setCategory] = useState("business");
  const [country, setCountry] = useState("in");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("publishedAt");
  const [showBookmarks, setShowBookmarks] = useState(false);
  const { bookmarks } = useBookmarks();

  const mode = query && query.trim().length>0 ? "search" : "top";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      <Navbar
        category={category}
        onCategoryChange={(c)=>{ setCategory(c); setQuery(""); }}
        country={country}
        onCountryChange={setCountry}
        onSearch={(q)=>{ setQuery(q); }}
        sortBy={sortBy}
        onSortBy={setSortBy}
        openBookmarks={()=>setShowBookmarks(true)}
        bookmarksCount={bookmarks.length}
      />

      <NewsList
        mode={mode}
        category={category}
        country={country}
        query={query}
        sortBy={sortBy}
      />

      <BookmarkDrawer open={showBookmarks} onClose={()=>setShowBookmarks(false)} />
    </div>
  );
}
