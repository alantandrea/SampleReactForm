import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import AppMain from "./AppMain";

const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AppMain />
  </Router>
);
