import React from "react";
import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom";

import NotFound from "./NotFound";
import FormsMain from "./FormsMain";
import QuestionsPage2 from "./QuestionsPage2";

const AppMain = () => {
  console.log(" in AppMain router");

  let routes = useRoutes([
    { path: "/", element: <FormsMain /> },
    { path: "/Main", element: <FormsMain /> },
    { path: "/QuestionsPage2", element: <QuestionsPage2 /> },
    { path: "/NF", element: <NotFound /> }

    // ...
  ]);
  return routes;
};

export default AppMain;
