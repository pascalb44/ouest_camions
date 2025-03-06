import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; /* for the link on the pictures'scaption */


export default function ImageHome() {

  const [categoriesTrucks, setCategoriesTrucks] = useState([]);
  const [categoriesTrailers, setCategoriesTrailers] = useState([]);


  useEffect(() => {
    displayCategoriesTrucks();   /* display only the truck */
  }, []);


  useEffect(() => {
    displayCategoriesTrailers(); /* display only the trailer */
  }, []);



  const displayCategoriesTrucks = async () => {
    axios.get("http://127.0.0.1:8000/api/categories-trucks")
      .then((response) => {
        setCategoriesTrucks(response.data);
      });
  };

  const displayCategoriesTrailers = async () => {
    axios.get("http://127.0.0.1:8000/api/categories-trailers")
      .then((response) => {
        const filteredTrailer = response.data.find(trailer => trailer.id === 1);  /* get only the picture of the trailer with id number 1*/
        setCategoriesTrailers(filteredTrailer ? [filteredTrailer] : []);
      })
      .catch((error) => console.error("Error fetching trailers:", error));
  };


  const getTruckImage = () => {
    return categoriesTrucks.length > 0 ? categoriesTrucks[0].image_category_truck : null; /* get only one truck */
  };

  const getTrailerImage = () => {
    return categoriesTrailers.length > 0 ? categoriesTrailers[0].image_category_trailer : null; /* get only one trailer */
  };


  return (
    <div className="home-pictures-card">
      {getTruckImage() && (
        <div className="home-pictures">
          <img src={`http://127.0.0.1:8000/storage/uploads/CategoryTruck/${getTruckImage()}`} alt="Truck" className="category-truck-home-image" />
          <div className="image-caption">
            <Link to="/categories-trucks" className="category-truck-link">
              <h3>Nos camions</h3>
            </Link>
          </div>
        </div>
      )}

      {getTrailerImage() && (
        <div className="home-pictures">
          <img src={`http://127.0.0.1:8000/storage/uploads/CategoryTrailer/${getTrailerImage()}`} alt="Trailer" className="category-trailer-home-image" />
          <div className="image-caption">
            <Link to="categories-trailers/" className="category-trailer-link">
              <h3>Nos remorques</h3>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

