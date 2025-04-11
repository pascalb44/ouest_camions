import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';


const EditCategoryTrailer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoryTrailer, setCategoryTrailer] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    /* no need token here because elements of categories_trailers are public */
    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8000/api/categories-trailers/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setCategoryTrailer(data);
                })
                .catch((error) => console.error('Erreur lors de la récupération des données :', error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", "PATCH");
        formData.append("name_category_trailer", categoryTrailer.name_category_trailer);
        formData.append("description", categoryTrailer.description);
        if (categoryTrailer.image_category_trailer instanceof File) {
            formData.append("image_category_trailer", categoryTrailer.image_category_trailer);
        }

        /* we need to get token for admin */
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://127.0.0.1:8000/api/admin/categories-trailers/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json'
                    }
                });

            if (response.status === 200) {
                alert("Mise à jour réussie !");
                navigate("/admin/categories-trailers");
            } else {
                console.error("Erreur lors de la mise à jour :", response.status);
            }
        } catch (error) {
            console.error("Erreur :", error.response ? error.response.data : error.message);
        }
    };

    if (!categoryTrailer) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <Link to="/admin/" className="admin-categories-trailer-btn-return">Retour au dashboard</Link>
            <h1 className="h1-admin-category-trailer-edit">Modifier la catégorie remorque</h1>
            <form onSubmit={handleSubmit} className="admin-category-trailer-form-edit">
                <div className="admin-category-trailer-form-edit-group">
                    <label htmlFor="name">Nom de la catégorie</label>
                    <input type="text" id="name" className="admin-category-trailer-name-edit" value={categoryTrailer.name_category_trailer}
                        onChange={(e) => setCategoryTrailer({ ...categoryTrailer, name_category_trailer: e.target.value })} />
                </div>

                <div className="admin-category-trailer-form-edit-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" className="admin-category-trailer-description-edit" value={categoryTrailer.description} // textarea for description
                        onChange={(e) => setCategoryTrailer({ ...categoryTrailer, description: e.target.value })} />
                </div>

                <div className="admin-category-trailer-form-edit-group">
                    <label>Image de la catégorie</label>
                    <div className="admin-category-trailer-image-edit-block">
                        {imagePreview ? (
                            <img src={imagePreview} alt={categoryTrailer.name_category_trailer} className="admin-category-trailer-image-edit" />
                        ) : categoryTrailer.image_category_trailer ? (
                            <img src={`http://127.0.0.1:8000/storage/uploads/CategoryTrailer/${categoryTrailer.image_category_trailer}`}
                                alt={categoryTrailer.name_category_trailer} className="admin-category-trailer-image-edit" />
                        ) : (
                            <p>Aucune image</p>
                        )}
                    </div>

                    <input type="file" id="image" className="admin-category-trailer-image-edit-upload" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setImagePreview(URL.createObjectURL(file));
                            setCategoryTrailer({ ...categoryTrailer, image_category_trailer: file });
                        }
                    }}
                    />

                    <div className="admin-category-trailer-edit-button">
                        <button type="submit" className="admin-category-trailer-edit-btn">Valider</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditCategoryTrailer;
