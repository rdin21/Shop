import React from "react";
import { Routes, Route } from "react-router-dom";
import { allRoutes } from "./AppRoutes";

function AppRoutes(): JSX.Element {
  return (
    <Routes>
      {allRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
}

export default AppRoutes;
