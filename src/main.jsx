import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { BookmarksProvider } from "./context/BookmarksContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BookmarksProvider>
        <App />
      </BookmarksProvider>
    </ThemeProvider>
  </React.StrictMode>
);
