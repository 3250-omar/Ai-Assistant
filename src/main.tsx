import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://8c5bbba3149a7d38c0f5b967c7e0b6a1@o4509400652972032.ingest.de.sentry.io/4509442683371600",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  // Setting this option to true will enable tracing for performance monitoring.
  tracesSampleRate: 1.0, // Adjust this value based on your needs
});

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
