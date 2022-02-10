import { ReactElement } from "react";

import NotFound from "./notFoundPage";
import Main from "./mainPage";
import UploadPersonalData from "./uploadPersonlDataPage";

export type RouteItem = {
  path: string;
  name: string;
  element: ReactElement;
  hideOnNavbar?: boolean;
};

/**
 * name - i18n dictionary key is displayed in the nav menu and so on.
 * path - url.
 * element - corresponding React element
 */
export const routesList: RouteItem[] = [
  // { name: "routes.mainPage", path: "/", element: <Main /> },
  {
    name: "routes.uploadPersonalData",
    path: "/", // upload-personal-data
    element: <UploadPersonalData />,
  },
  {
    name: "routes.notFoundPage",
    path: "*",
    element: <NotFound />,
    hideOnNavbar: true,
  },
];
