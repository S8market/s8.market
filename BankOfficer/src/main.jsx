import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppContextProvider from "./context/context.jsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <React.StrictMode>

          <App />
        </React.StrictMode>

    </AppContextProvider>
    </BrowserRouter>
  </StrictMode> // REMOVE AFTER DEPLOYMENT
);
