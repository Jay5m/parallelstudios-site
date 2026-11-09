import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Maintenance from "./components/Maintenance";
import { site } from "./config";
import "./index.css";

// While maintenance is on, visitors see the "Undergoing Updates" page.
// Add ?preview to the URL to see the real site anyway.
const preview = new URLSearchParams(location.search).has("preview");

createRoot(document.getElementById("root")!).render(
  <StrictMode>{site.maintenance && !preview ? <Maintenance /> : <App />}</StrictMode>,
);
