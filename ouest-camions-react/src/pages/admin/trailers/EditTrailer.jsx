import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';


const EditTrailer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trailer, setTrailer] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [idCategorytrailer, setIdCategorytrailer] = useState("");


    /* no need token here because elements of trailers are public */
    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8000/api/trailers/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setTrailer(data);
                })
                .catch((error) => console.error('Erreur lors de la récupération des données :', error));
        }
    }, [id]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/admin/categories-trailers', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des catégories', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (event) => {   /* to get the category trailers to choose*/
        setIdCategorytrailer(Number(event.target.value));
        console.log('Selected category ID:', event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", "PATCH");

        formData.append("brand_trailer", trailer.brand_trailer);
        formData.append("name_trailer", trailer.name_trailer);
        formData.append("description_trailer", trailer.description_trailer);
        formData.append("color_trailer", trailer.color_trailer);
        formData.append("length_trailer", trailer.length_trailer);
        formData.append("width_trailer", trailer.width_trailer);
        formData.append("height_trailer", trailer.height_trailer);
        formData.append("load_trailer", trailer.load_trailer);
        formData.append("duration_trailer", trailer.duration_trailer);
        formData.append("price_day_trailer", trailer.price_day_trailer);
        formData.append("price_week_trailer", trailer.price_week_trailer);
        formData.append("price_month_trailer", trailer.price_month_trailer);
        formData.append("price_year_trailer", trailer.price_year_trailer);
        formData.append("id_category_trailer", idCategorytrailer);

        if (imageFile) {
            formData.append("image_trailer", imageFile);
        }

     /* to verify entries 
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
    */

        /* we need to get token for admin */
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://127.0.0.1:8000/api/admin/trailers/${id}`,
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
                navigate("/admin/trailers");
            } else {
                console.error("Erreur lors de la mise à jour :", response.status);
            }
        } catch (error) {
            console.error("Erreur :", error.response ? error.response.data : error.message);
        }
    };

    if (!trailer) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
                        <Link to="/admin/" className="admin-trailer-btn-return">Retour au dashboard</Link>

            <h1 className="h1-admin-trailer-edit">Modifier la remorque</h1>
            <p>Ne pas oublier d'ajouter les valeurs lors de la modification (m, euros, tonne, mois...)</p> 
            <form onSubmit={handleSubmit} className="admin-trailer-form-edit">
                <div className="admin-trailer-form-edit-group">
                    <label htmlFor="brand">Marque</label>
                    <input type="text" id="brand"  className="admin-trailer-name-edit" value={trailer.brand_trailer || ''} 
                    onChange={(e) => setTrailer({ ...trailer, brand_trailer: e.target.value })} />
                </div>
                <div className="admin-trailer-form-edit-group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" id="name" className="admin-trailer-name-edit" value={trailer.name_trailer}
                        onChange={(e) => setTrailer({ ...trailer, name_trailer: e.target.value })} />
                </div>
                <div className="admin-trailer-form-edit-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description"  className="admin-trailer-name-edit" value={trailer.description_trailer || ''} 
                    onChange={(e) => setTrailer({ ...trailer, description_trailer: e.target.value })}></textarea>
                </div>
                <div className="admin-trailer-form-edit-group">
                    <label htmlFor="name">Couleur</label>
                    <input type="text" id="color" className="admin-trailer-name-edit" value={trailer.color_trailer}
                        onChange={(e) => setTrailer({ ...trailer, color_trailer: e.target.value })} />
                </div>
                <div className="admin-trailer-form-edit-group">
                    <label htmlFor="name">Longueur</label>
                    <input type="text" id="length" className="admin-trailer-name-edit" value={trailer.length_trailer}
                        onChange={(e) => setTrailer({ ...trailer, length_trailer: e.target.value })} />
                </div>
                <div className="admin-trailer-form-edit-group">
                    <label htmlFor="name">Largeur</label>
                    <input type="text" id="width" className="admin-trailer-name-edit" value={trailer.width_trailer}
                        onChange={(e) => setTrailer({ ...trailer, width_trailer: e.target.value })} />
                </div>
                <div className="admin-trailer-form-edit-group">
                    <label htmlFor="name">Hauteur</label>
                    <input type="text" id="height" className="admin-trailer-name-edit" value={trailer.height_trailer}
                        onChange={(e) => setTrailer({ ...trailer, height_trailer: e.target.value })} />
                </div>
                <div className="admin-trailer-form-edit-group">
                    <label htmlFor="name">Charge</label>
                    <input type="text" id="load" className="admin-trailer-name-edit" value={trailer.load_trailer}
                        onChange={(e) => setTrailer({ ...trailer, load_trailer: e.target.value })} />
                </div>
           
                <div className="admin-trailer-form-edit-group">
                    <label htmlFor="name">Durée de location conseillée</label>
                    <input type="text" id="duration" className="admin-trailer-name-edit" value={trailer.duration_trailer}
                        onChange={(e) => setTrailer({ ...trailer, duration_trailer: e.target.value })} />
                </div>
                <div className="admin-trailer-form-edit-group">
                    <label htmlFor="name">Prix/jour</label>
                    <input type="text" id="price_day" className="admin-trailer-name-edit" value={trailer.price_day_trailer}
                        onChange={(e) => setTrailer({ ...trailer, price_day_trailer: e.target.value })} />
                </div>
                <div className="admin-trailer-form-edit-group">
                    <label htmlFor="name">Prix/semaine</label>
                    <input type="text" id="price_week" className="admin-trailer-name-edit" value={trailer.price_week_trailer}
                        onChange={(e) => setTrailer({ ...trailer, price_week_trailer: e.target.value })} />
                </div>
                <div className="admin-trailer-form-edit-group">
                    <label htmlFor="name">Prix/mois</label>
                    <input type="text" id="price_month" className="admin-trailer-name-edit" value={trailer.price_month_trailer}
                        onChange={(e) => setTrailer({ ...trailer, price_month_trailer: e.target.value })} />
                </div>
                <div className="admin-trailer-form-edit-group">
                    <label htmlFor="name">Prix/an</label>
                    <input type="text" id="price_year" className="admin-trailer-name-edit" value={trailer.price_year_trailer}
                        onChange={(e) => setTrailer({ ...trailer, price_year_trailer: e.target.value })} />
                </div>
                <div className="admin-trailer-list-choice" controlid="id_category_trailer">                   {/* add category trailer */}
                <label htmlFor="name">Catégorie</label>
                    <select className="admin-trailer-list-choice-form-control" value={idCategorytrailer} onChange={handleCategoryChange} required>
                        <option value="">-- Choisir une catégorie --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}> {/* display list of categories to choose */}
                                {cat.name_category_trailer}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="admin-trailer-form-edit-group">
                    <label>Image de la remorque</label>
                    <div className="admin-trailer-image-edit-block">
                        {imagePreview ? (
                            <img src={imagePreview} alt={trailer.name_trailer} className="admin-trailer-image-edit" />
                        ) : trailer.image_trailer ? (
                            <img src={`http://127.0.0.1:8000/storage/uploads/trailer/${trailer.image_trailer}`}
                                alt={trailer.name_trailer} className="admin-trailer-image-edit" />
                        ) : (
                            <p>Aucune image</p>
                        )}
                    </div>

                    <input type="file" id="image" className="admin-trailer-image-edit-upload" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setImagePreview(URL.createObjectURL(file));
                            setImageFile(file);
                        }
                    }}
                    />

                    <div className="admin-trailer-edit-button">
                        <button type="submit" className="admin-trailer-edit-btn">Valider</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditTrailer;