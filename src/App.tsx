import React from "react";
import { Routes, Route } from "react-router-dom";

import AppHeader from "./сomponents/app-header";

import "./static/styles/global.scss";

// --Routes components
import Home from "./routes/Home";
import UploadPersonalData from "./routes/UploadPersonlData";

const App: React.FC = () => {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="upload-personal-data" element={<UploadPersonalData />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
