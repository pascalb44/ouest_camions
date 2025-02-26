import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Legal from "./pages/Legal";
import Presentation from "./pages/Presentation";

import "./style/main.scss"; // Charge tous les styles


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >

          <Route index element={<Home />} />
          <Route path="presentation" element={<Presentation />} />
          <Route path="legal" element={<Legal />} />

        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
