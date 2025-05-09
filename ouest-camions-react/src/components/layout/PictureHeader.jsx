import React, { useEffect, useState } from "react";
import axios from "axios";

const PictureHeader = () => {
    const [pictureSrc, setPictureSrc] = useState(null); // State to hold the image URL
    const altText = "image camion en arrière-plan";

    useEffect(() => {
        // Fetch the image from your API
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/header-image`) // Adjust the API endpoint
            .then((response) => {
                setPictureSrc(response.data.image); // get the picture from the API
            })
            .catch((error) => {
                console.error("Erreur lors du chargement de l'image :", error);
            });
    }, []);

    return pictureSrc ? (
        <style> {/* see categoryTruckController for background-image in mobile */}
            {`
                .mobile-header {
                    background-image: url(${pictureSrc}); 
                    background-size: cover;
                    background-position: center;
                }
            `}
        </style>
    ) : null;
};

export default PictureHeader;