/* don't import pages in the nav */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import Profile from "./pages/users/Profile";
import EditUser from './pages/users/EditUser';
import PaypalCheckout from './components/PaypalCheckout';

import Legal from "./pages/Legal";
import Cgv from "./pages/Cgv";
import Presentation from "./pages/Presentation";



import CategoriesTrucks from "./pages/categories-trucks/CategoriesTrucks"; /* version public */
import TruckDetail from './pages/trucks/TruckDetail';
import TrucksByCategory from './pages/trucks/TrucksByCategory';


import CategoriesTrailers from "./pages/categories-trailers/CategoriesTrailers"; /* version public */
import TrailerDetail from './pages/trailers/TrailerDetail';
import TrailersByCategory from './pages/trailers/TrailersByCategory';


import Dashboard from './pages/admin/Dashboard';

import CategoryTruck from './pages/admin/categories-trucks/CategoriesTrucks'; /* version admin */
import AddCategoryTruck from './pages/admin/categories-trucks/AddCategoryTruck';
import EditCategoryTruck from './pages/admin/categories-trucks/EditCategoryTruck';



import CategoryTrailer from './pages/admin/categories-trailers/CategoriesTrailers'; /* version admin */
import AddCategoryTrailer from './pages/admin/categories-trailers/AddCategoryTrailer';
import EditCategoryTrailer from './pages/admin/categories-trailers/EditCategoryTrailer';


import Truck from './pages/admin/trucks/Trucks'; /* version admin */
import AddTruck from './pages/admin/trucks/AddTruck';
import EditTruck from './pages/admin/trucks/EditTruck';

import Trailer from './pages/admin/trailers/Trailers'; /* version admin */
import AddTrailer from './pages/admin/trailers/AddTrailer';
import EditTrailer from './pages/admin/trailers/EditTrailer';



import Contact from './pages/Contact';

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

          <Route path="/contact" element={<Contact />} />
          <Route path="/paypal" element={<PaypalCheckout />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="user/edit-user/:id" element={<EditUser />} />

          <Route path="legal" element={<Legal />} />
          <Route path="cgv" element={<Cgv />} />
          <Route path="presentation" element={<Presentation />} />

          <Route path="categories-trucks" element={<CategoriesTrucks />} />
          <Route path="/trucks-by-category/:id" element={<TrucksByCategory />} />
          <Route path="/trucks/:id" element={<TruckDetail />} />

          <Route path="categories-trailers" element={<CategoriesTrailers />} />
          <Route path="/trailers-by-category/:id" element={<TrailersByCategory />} />
          <Route path="/trailers/:id" element={<TrailerDetail />} />

          <Route path="/trucks" element={<Truck />} />
          <Route path="/trailers" element={<Trailer />} />


          <Route path="/admin" element={<Dashboard />} /> {/* admin dashboard => routes admin only*/}

          <Route path="/admin/categories-trailers" element={<CategoryTrailer />} />
          <Route path="/admin/categories-trailers/add" element={<AddCategoryTrailer />} />{/* management by admin */}
          <Route path="/admin/categories-trailers/edit/:id" element={<EditCategoryTrailer />} />


          <Route path="/admin/categories-trucks" element={<CategoryTruck />} />
          <Route path="/admin/categories-trucks/add" element={<AddCategoryTruck />} />
          <Route path="/admin/categories-trucks/edit/:id" element={<EditCategoryTruck />} />

          <Route path="/admin/trucks" element={<Truck />} />
          <Route path="/admin/trucks/add" element={<AddTruck />} />
          <Route path="/admin/trucks/edit/:id" element={<EditTruck />} />

          <Route path="/admin/trailers" element={<Trailer />} />
          <Route path="/admin/trailers/add" element={<AddTrailer />} />
          <Route path="/admin/trailers/edit/:id" element={<EditTrailer />} />


          <Route path="cart" element={<Cart />} />
          <Route path="payment" element={<Payment />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
