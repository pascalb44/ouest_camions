/* don't import pages in the nav */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Legal from "./pages/Legal";
import CategoriesTrucks from "./pages/categories-trucks/CategoriesTrucks";
import CategoriesTrailers from "./pages/categories-trailers/CategoriesTrailers"; /* version public */
import Dashboard from './pages/admin/Dashboard';
import CategoryTrailer from './pages/admin/categories-trailers/CategoriesTrailers'; /* version admin */
import AddCategoryTrailer from './pages/admin/categories-trailers/AddCategoryTrailer';
//import Contact from './pages/admin/Contact';
//import Truck from './pages/admin/Truck';
//import Trailer from './pages/admin/Trailer';
//import CategoryTruck from './pages/admin/CategoryTruck';

import "./style/main.scss"; // for general style


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >

          <Route index element={<Home />} />
          <Route path="legal" element={<Legal />} />
          <Route path="categories-trailers" element={<CategoriesTrailers />} />
          <Route path="categories-trucks" element={<CategoriesTrucks />} />
          <Route path="/admin" element={<Dashboard />} /> {/* admin dashboard => routes admin only*/}
          <Route path="/admin/categories-trailers/add" element={<AddCategoryTrailer />} />{/* management by admin */}
          <Route path="/admin/categories-trailers" element={<CategoryTrailer />} /> 

          {/*     <Route path="/admin/contacts" element={<Contact />} />*/}
          {/*     <Route path="/admin/trucks" element={<Truck />} />*/}
          {/*      <Route path="/admin/trailers" element={<Trailer />} />*/}
          {/*<Route path="/admin/category-trucks" element={<CategoryTruck />} />*/}

        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
