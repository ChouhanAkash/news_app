import { useBookmarks } from "../context/BookmarksContext.jsx";

export default function BookmarkDrawer({ open, onClose }) {
  const { bookmarks, clearBookmarks } = useBookmarks();
  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-[480px] bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">Bookmarks ({bookmarks.length})</h3>
          <div className="flex gap-2 items-center">
            {bookmarks.length > 0 && (
              <button
                onClick={clearBookmarks}
                className="px-2 py-1 border rounded"
              >
                Clear
              </button>
            )}
            <button onClick={onClose} className="px-2 py-1 border rounded">
              Close
            </button>
          </div>
        </div>
        <div className="p-4 overflow-auto h-[calc(100%-56px)] grid gap-4">
          {bookmarks.length === 0 ? (
            <p className="opacity-70">No bookmarks yet.</p>
          ) : (
            bookmarks.map((b, i) => (
              <div key={b.url || i} className="border rounded p-2">
                <a href={b.url} target="_blank" rel="noreferrer">
                  {b.title}
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
