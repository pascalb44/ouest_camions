import React, { useEffect, useState } from "react";
import axios from "axios";

const PictureHeader = () => {
    const [pictureSrc, setPictureSrc] = useState(null); // State to hold the image URL
    const altText = "image camion en arrière-plan";

    useEffect(() => {
        // Fetch the image from your API
        axios
            .get("http://127.0.0.1:8000/api/header-image") // Adjust the API endpoint
            .then((response) => {
                setPictureSrc(response.data.image); // Assume the API returns { image: 'path_to_image' }
            })
            .catch((error) => {
                console.error("Erreur lors du chargement de l'image :", error);
            });
    }, []);

    return (
        <div className="picture-container-header">
            {pictureSrc ? (
                <img className="picture-header" src={pictureSrc} alt={altText} />
            ) : (
                <p>Chargement de l'image...</p>
            )}
        </div>
    );
};

export default PictureHeader;