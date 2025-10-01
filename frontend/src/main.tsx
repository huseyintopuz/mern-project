import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "@/components/ui/provider.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <Router>
        <App />
        <Toaster />
      </Router>
    </Provider>
  </StrictMode>
);
