import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const CategoriesTrailers = () => {
  const [categoriesTrailers, setCategoriesTrailers] = useState([]);
  const categoryRefs = useRef({}); // Create a ref object for each category

  useEffect(() => {
    displayCategoriesTrailers();
  }, []);

  const displayCategoriesTrailers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/categories-trailers");
      setCategoriesTrailers(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories :", error);
    }
  };


  const handleCategoryClick = (categoryId) => {
    if (categoryRefs.current[categoryId]) {
      categoryRefs.current[categoryId].scrollIntoView({ behavior: "smooth" }); // Smooth scrolling to the category
    }
  };


  return (
    <div className="container-categories-trailers">
      <h1>Nos remorques</h1>


      <div className="button-group" style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
        {categoriesTrailers.length > 0 &&
          categoriesTrailers.map((trailer) => (  /* 'trailer' is used to get the differents categories of trailers */

            <button
              key={trailer.id}
              onClick={() => handleCategoryClick(trailer.id)} // Scroll to the selected category
            >
              {trailer.name_category_trailer}
              {/* name_category_trailer is used in the table category_trailer */}
            </button>
          ))}
      </div>
      <div className="categories-trailers-list">
        {categoriesTrailers.map((trailer) => (
          <div
            key={trailer.id}
            ref={(el) => (categoryRefs.current[trailer.id] = el)} // Assign a ref to each category
            className="categories-trailers-item">
            <img src={`http://127.0.0.1:8000/storage/uploads/CategoryTrailer/${trailer.image_category_trailer}`} className="CategoryTrailer-image" alt="remorque disponible en location"/>
            {/* image_category_trailer is the name of the picture in the table category_trailer */}

            <div className="categories-trailers-description">
              <div className="categories-trailers-name">
                <p>{trailer.name_category_trailer || "Description indisponible pour cette catégorie."}</p>
              </div>
              <p>{trailer.description || "Description indisponible pour cette catégorie."}</p>
            </div>
            <Link to="/trailers" className="category-trailer-link"> {/* link to detail page of the trailer */}
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesTrailers;
