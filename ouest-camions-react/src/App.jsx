/* don't import pages in the nav */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import Profile from "./pages/users/Profile";
import EditUser from './pages/users/EditUser';


import Legal from "./pages/Legal";


import CategoriesTrucks from "./pages/categories-trucks/CategoriesTrucks";
import TruckDetail from './pages/trucks/TruckDetail';
import TrucksByCategory from './pages/trucks/TrucksByCategory';


import CategoriesTrailers from "./pages/categories-trailers/CategoriesTrailers"; /* version public */
import TrailerDetail from './pages/trailers/TrailerDetail';
import TrailersByCategory from './pages/trailers/TrailersByCategory';


import Dashboard from './pages/admin/Dashboard';

import CategoryTruck from './pages/admin/categories-trucks/CategoriesTrucks';

import CategoryTrailer from './pages/admin/categories-trailers/CategoriesTrailers'; /* version admin */
import AddCategoryTrailer from './pages/admin/categories-trailers/AddCategoryTrailer';
//import Contact from './pages/admin/Contact';
//import Trailer from './pages/admin/Trailer';
import Cart from './pages/order/Cart';
import Payment from './pages/order/Payment';
import Orders from './pages/order/Orders';



import "./style/main.scss"; // for general style


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >

          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          <Route path="/profile" element={<Profile />} />

          <Route path="user/edit-user/:id" element={<EditUser />} />

          <Route path="legal" element={<Legal />} />
          <Route path="categories-trucks" element={<CategoriesTrucks />} />
          <Route path="/trucks-by-category/:id" element={<TrucksByCategory />} />
          <Route path="/trucks/:id" element={<TruckDetail />} />

          <Route path="categories-trailers" element={<CategoriesTrailers />} />
          <Route path="/trailers-by-category/:id" element={<TrailersByCategory />} />
          <Route path="/trailers/:id" element={<TrailerDetail />} />



          <Route path="/admin" element={<Dashboard />} /> {/* admin dashboard => routes admin only*/}
          <Route path="/admin/categories-trailers/add" element={<AddCategoryTrailer />} />{/* management by admin */}
          <Route path="/admin/categories-trailers" element={<CategoryTrailer />} />

          {/*     <Route path="/admin/contacts" element={<Contact />} />*/}
          {/*     <Route path="/admin/trucks" element={<Truck />} />*/}
          {/*      <Route path="/admin/trailers" element={<Trailer />} />*/}
          <Route path="/admin/categories-trucks" element={<CategoryTruck />} />

          <Route path="cart" element={<Cart />} />
          <Route path="payment" element={<Payment />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
