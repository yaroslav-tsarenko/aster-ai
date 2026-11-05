import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.jsx";
import ToastProvider from "./components/ui/ToastProvider";
import CommandPaletteProvider from "./components/layout/CommandPalette";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToastProvider>
        <CommandPaletteProvider>
          <App />
        </CommandPaletteProvider>
      </ToastProvider>
    </Router>
  </React.StrictMode>
);
