import { ReactElement } from "react";

import Home from "./Home";
import UploadPersonalData from "./UploadPersonlData";

export type RouteItem = {
  path: string;
  name: string;
  element: ReactElement;
};

export const routesList: RouteItem[] = [
  { name: "Main page", path: "/", element: <Home /> },
  {
    name: "Upload personal data",
    path: "upload-personal-data",
    element: <UploadPersonalData />,
  },
];
