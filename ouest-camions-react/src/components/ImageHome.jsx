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
        const filteredTrailer = response.data.find(trailer => trailer.id === 5);  /* get only the picture of the trailer with id number 5*/
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

    <div className="homePicturesCard">
      {getTruckImage() && (
        <div className="homePictures">
          <img src={`http://127.0.0.1:8000/storage/uploads/CategoryTruck/${getTruckImage()}`} alt="Truck" className="CategoryTruck-image" />
          <div className="image-caption">
            <Link to="/category-truck" className="category-truck-link">
              <h3>Nos camions</h3>
            </Link>
          </div>
        </div>
      )}

      {getTrailerImage() && (
        <div className="homePictures">
          <img src={`http://127.0.0.1:8000/storage/uploads/CategoryTrailer/${getTrailerImage()}`} alt="Trailer" className="CategoryTrailer-image" />
          <div className="image-caption">
            <Link to="/category-trailer" className="category-trailer-link">
              <h3>Nos remorques</h3>
            </Link>
          </div>
        </div>
      )}


      {/*
      {categoriesTrucks.map((categoryTruck, index) => (
        <div key={categoryTruck.id} className={`homePictures picture-${index}`}>
          <img src={`http://127.0.0.1:8000/storage/uploads/CategoryTruck/${categoryTruck.image_category_truck}`} alt={categoryTruck.name_category_truck} className="CategoryTruck-image" />
          <div className="image-caption">
            <h3>{categoryTruck.name_category_truck}</h3>
          </div>
        </div>
      ))}

      {categoriesTrailers.map((categoryTrailer, index) => (
        <div key={categoryTrailer.id} className={`homePictures picture-${index + 1}`}>
          <img src={`http://127.0.0.1:8000/storage/uploads/CategoryTrailer/${categoryTrailer.image_category_trailer}`} alt={categoryTrailer.name_category_trailer} className="CategoryTrailer-image" />
          <div className="image-caption">
            <h3>{categoryTrailer.name_category_trailer}</h3>
          </div>
        </div>
      ))}

      */}
    </div>
  );
};

