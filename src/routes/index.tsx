import { ReactElement } from "react";

import NotFound from "./NotFound";
import Main from "./Main";
import UploadPersonalData from "./UploadPersonlData";

export type RouteItem = {
  path: string;
  name: string;
  element: ReactElement;
};

/**
 * name - i18n dictionary key is displayed in the nav menu and so on.
 * path - url.
 * element - corresponding React element
 */
export const routesList: RouteItem[] = [
  { name: "routes.mainPage", path: "/", element: <Main /> },
  {
    name: "routes.uploadPersonalData",
    path: "upload-personal-data",
    element: <UploadPersonalData />,
  },
  { name: "routes.notFoundPage", path: "*", element: <NotFound /> },
];
