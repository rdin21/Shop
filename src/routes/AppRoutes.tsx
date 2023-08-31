import { FC } from "react";
import { HOME_ROUTE, ALL_ROUTES } from "./Paths";
import Home from "../components/Home/Home";
import Index from "../components/NotFoundRoute/Index";

interface IRoutes {
  path: string;
  Component: FC;
}

export const allRoutes: IRoutes[] = [
  {
    path: HOME_ROUTE,
    Component: Home,
  },
  {
    path: ALL_ROUTES,
    Component: Index,
  },
];
