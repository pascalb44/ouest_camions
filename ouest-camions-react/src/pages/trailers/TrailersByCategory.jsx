import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const TrailersByCategory = () => {
    const { id } = useParams();  // get ID of the category
    const [categoryName, setCategoryName] = useState("");
    const [trailers, setTrailers] = useState([]);

    const fetchTrailersByCategory = useCallback(async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/trailers/category/${id}`);

            if (res.data && res.data.trailers) {
                setCategoryName(res.data.category_name);
                setTrailers(res.data.trailers);
            } else {
                console.error("Pas de remorques trouvées");
                setTrailers([]);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des remorques :", error);
            setTrailers([]);
        }
    }, [id]);

    useEffect(() => {
        fetchTrailersByCategory();
    }, [fetchTrailersByCategory]);
    console.log("Category Name:", categoryName);
    return (
        <div>
            <h1 className="h1-trailer-category-name">{categoryName}</h1>  {/* name change on each page */}

            <div className="trailer-category-list">
                {trailers.length > 0 ? (
                    trailers.map((trailer) => (
                        <div key={trailer.id} className={`trailer-category-item ${trailers.length === 1 ? "full-width" : ""}`}>
                            {/* to have 1 picture on the page for specialized trailers */}

                            <div className="trailer-category-name">
                                <p>{trailer.brand_trailer} {trailer.name_trailer}</p>
                            </div>
                            <div className="trailer-category-image-box">
                                <img src={`http://127.0.0.1:8000/storage/uploads/Trailer/${trailer.image_trailer}`} className={`trailer-category-image ${trailers.length === 1 ? "trailer-category-image-one" : ""}`} 
                                alt={trailer.name_trailer} />
                            </div>

                            <p>{trailer.load_trailer} Charge utile</p>
                            <p>A partir de {trailer.price_day_trailer} euros/jour</p>

                            <div className="trailer-category-image-caption">
                                <Link to={`/trailers/${trailer.id}`}>En savoir plus</Link>
                                {/* link to detail page of the trailer */}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucune remorque trouvée pour cette catégorie.</p>
                )}
            </div>
        </div>
    );
};

export default TrailersByCategory;
