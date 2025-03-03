/* don't import pages in the nav */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Legal from "./pages/Legal";
import CategoriesTrailers from "./pages/categories-trailers/category-trailer";

import "./style/main.scss"; // for general style


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >

          <Route index element={<Home />} />
          <Route path="legal" element={<Legal />} />
          <Route path="categories-trailers" element={<CategoriesTrailers />} />
          

        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
