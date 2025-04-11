import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';


const EditCategoryTruck = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoryTruck, setCategoryTruck] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    /* no need token here because elements of categories_trucks are public */
    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8000/api/categories-trucks/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setCategoryTruck(data);
                })
                .catch((error) => console.error('Erreur lors de la récupération des données :', error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", "PATCH");
        formData.append("name_category_truck", categoryTruck.name_category_truck);


        if (imageFile) {
            formData.append("image_category_truck", imageFile);
        }

        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        /* we need to get token for admin */
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://127.0.0.1:8000/api/admin/categories-trucks/${id}`,
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
                navigate("/admin/categories-trucks");
            } else {
                console.error("Erreur lors de la mise à jour :", response.status);
            }
        } catch (error) {
            console.error("Erreur :", error.response ? error.response.data : error.message);
        }
    };

    if (!categoryTruck) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <Link to="/admin/" className="admin-truck-btn-return">Retour au dashboard</Link>
            <h1 className="h1-admin-category-truck-edit">Modifier la catégorie camion</h1>
            <form onSubmit={handleSubmit} className="admin-category-truck-form-edit">
                <div className="admin-category-truck-form-edit-group">
                    <label htmlFor="name">Nom de la catégorie</label>
                    <input type="text" id="name" className="admin-category-truck-name-edit" value={categoryTruck.name_category_truck}
                        onChange={(e) => setCategoryTruck({ ...categoryTruck, name_category_truck: e.target.value })} />
                </div>
                <div className="admin-category-truck-form-edit-group">
                    <label>Image de la catégorie</label>
                    <div className="admin-category-truck-image-edit-block">
                        {imagePreview ? (
                            <img src={imagePreview} alt={categoryTruck.name_category_truck} className="admin-category-truck-image-edit" />
                        ) : categoryTruck.image_category_truck ? (
                            <img src={`http://127.0.0.1:8000/storage/uploads/Categorytruck/${categoryTruck.image_category_truck}`}
                                alt={categoryTruck.name_category_truck} className="admin-category-truck-image-edit" />
                        ) : (
                            <p>Aucune image</p>
                        )}
                    </div>

                    <input type="file" id="image" className="admin-category-truck-image-edit-upload" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setImagePreview(URL.createObjectURL(file));
                            setImageFile(file);
                        }
                    }}
                    />

                    <div className="admin-category-truck-edit-button">
                        <button type="submit" className="admin-category-truck-edit-btn">Valider</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditCategoryTruck;