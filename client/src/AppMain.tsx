import React from "react";
import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom";

import NotFound from "./NotFound";

import FormsMain from "./FormsMain";

const AppMain = () => {
  console.log(" in AppMain router");

  let routes = useRoutes([
    { path: "/", element: <FormsMain /> },
    { path: "/Main", element: <FormsMain /> },
    { path: "/NF", element: <NotFound /> }

    // ...
  ]);
  return routes;
};

export default AppMain;
