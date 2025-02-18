// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import Bootstrap CSS and Icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Import Bootstrap JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import your custom CSS (create this file)
import "./styles/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
