import React from "react";
import { useTranslate } from "react-polyglot";

const NotFound: React.FC = () => {
  const f = useTranslate();
  return <div>{f("notFoundPage.title")}</div>;
};

export default NotFound;
