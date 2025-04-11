import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';


const EditTruck = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Truck, setTruck] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [idCategoryTruck, setIdCategoryTruck] = useState("");


    /* no need token here because elements of trucks are public */
    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8000/api/trucks/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setTruck(data);
                })
                .catch((error) => console.error('Erreur lors de la récupération des données :', error));
        }
    }, [id]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/admin/categories-trucks', {
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

    const handleCategoryChange = (event) => {   /* to get the category trucks to choose*/
        setIdCategoryTruck(Number(event.target.value));
        console.log('Selected category ID:', event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", "PATCH");

        formData.append("brand_truck", Truck.brand_truck);
        formData.append("name_truck", Truck.name_truck);
        formData.append("description_truck", Truck.description_truck);
        formData.append("color_truck", Truck.color_truck);
        formData.append("length_truck", Truck.length_truck);
        formData.append("width_truck", Truck.width_truck);
        formData.append("height_truck", Truck.height_truck);
        formData.append("load_truck", Truck.load_truck);
        formData.append("km_truck", Truck.km_truck);
        formData.append("duration_truck", Truck.duration_truck);
        formData.append("price_day_truck", Truck.price_day_truck);
        formData.append("price_week_truck", Truck.price_week_truck);
        formData.append("price_month_truck", Truck.price_month_truck);
        formData.append("price_year_truck", Truck.price_year_truck);
        formData.append("id_category_truck", idCategoryTruck);

        if (imageFile) {
            formData.append("image_truck", imageFile);
        }

        /* to verify entries 
           for (let pair of formData.entries()) {
               console.log(`${pair[0]}: ${pair[1]}`);
           }
       */

        /* we need to get token for admin */
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://127.0.0.1:8000/api/admin/trucks/${id}`,
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
                navigate("/admin/trucks");
            } else {
                console.error("Erreur lors de la mise à jour :", response.status);
            }
        } catch (error) {
            console.error("Erreur :", error.response ? error.response.data : error.message);
        }
    };

    if (!Truck) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <Link to="/admin/" className="admin-truck-btn-return">Retour au dashboard</Link>
            <h1 className="h1-admin-truck-edit">Modifier le camion</h1>
            <p>Ne pas oublier d'ajouter les valeurs lors de la modification (m, euros, tonne, mois...)</p>
            <form onSubmit={handleSubmit} className="admin-truck-form-edit">
                <div className="admin-truck-form-edit-group">
                    <label htmlFor="brand">Marque</label>
                    <input type="text" id="brand" className="admin-truck-name-edit" value={Truck.brand_truck || ''}
                        onChange={(e) => setTruck({ ...Truck, brand_truck: e.target.value })} />
                </div>
                <div className="admin-truck-form-edit-group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" id="name" className="admin-truck-name-edit" value={Truck.name_truck}
                        onChange={(e) => setTruck({ ...Truck, name_truck: e.target.value })} />
                </div>
                <div className="admin-truck-form-edit-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" className="admin-truck-name-edit" value={Truck.description_truck || ''}
                        onChange={(e) => setTruck({ ...Truck, description_truck: e.target.value })}></textarea>
                </div>
                <div className="admin-truck-form-edit-group">
                    <label htmlFor="name">Couleur</label>
                    <input type="text" id="color" className="admin-truck-name-edit" value={Truck.color_truck}
                        onChange={(e) => setTruck({ ...Truck, color_truck: e.target.value })} />
                </div>
                <div className="admin-truck-form-edit-group">
                    <label htmlFor="name">Longueur</label>
                    <input type="text" id="length" className="admin-truck-name-edit" value={Truck.length_truck}
                        onChange={(e) => setTruck({ ...Truck, length_truck: e.target.value })} />
                </div>
                <div className="admin-truck-form-edit-group">
                    <label htmlFor="name">Largeur</label>
                    <input type="text" id="width" className="admin-truck-name-edit" value={Truck.width_truck}
                        onChange={(e) => setTruck({ ...Truck, width_truck: e.target.value })} />
                </div>
                <div className="admin-truck-form-edit-group">
                    <label htmlFor="name">Hauteur</label>
                    <input type="text" id="height" className="admin-truck-name-edit" value={Truck.height_truck}
                        onChange={(e) => setTruck({ ...Truck, height_truck: e.target.value })} />
                </div>
                <div className="admin-truck-form-edit-group">
                    <label htmlFor="name">Charge</label>
                    <input type="text" id="load" className="admin-truck-name-edit" value={Truck.load_truck}
                        onChange={(e) => setTruck({ ...Truck, load_truck: e.target.value })} />
                </div>
                <div className="admin-truck-form-edit-group">
                    <label htmlFor="name">Kilometrage</label>
                    <input type="text" id="km" className="admin-truck-name-edit" value={Truck.km_truck}
                        onChange={(e) => setTruck({ ...Truck, km_truck: e.target.value })} />
                </div>
                <div className="admin-truck-form-edit-group">
                    <label htmlFor="name">Durée de location conseillée</label>
                    <input type="text" id="duration" className="admin-truck-name-edit" value={Truck.duration_truck}
                        onChange={(e) => setTruck({ ...Truck, duration_truck: e.target.value })} />
                </div>
                <div className="admin-truck-form-edit-group">
                    <label htmlFor="name">Prix/jour</label>
                    <input type="text" id="price_day" className="admin-truck-name-edit" value={Truck.price_day_truck}
                        onChange={(e) => setTruck({ ...Truck, price_day_truck: e.target.value })} />
                </div>
                <div className="admin-truck-form-edit-group">
                    <label htmlFor="name">Prix/semaine</label>
                    <input type="text" id="price_week" className="admin-truck-name-edit" value={Truck.price_week_truck}
                        onChange={(e) => setTruck({ ...Truck, price_week_truck: e.target.value })} />
                </div>
                <div className="admin-truck-form-edit-group">
                    <label htmlFor="name">Prix/mois</label>
                    <input type="text" id="price_month" className="admin-truck-name-edit" value={Truck.price_month_truck}
                        onChange={(e) => setTruck({ ...Truck, price_month_truck: e.target.value })} />
                </div>
                <div className="admin-truck-form-edit-group">
                    <label htmlFor="name">Prix/an</label>
                    <input type="text" id="price_year" className="admin-truck-name-edit" value={Truck.price_year_truck}
                        onChange={(e) => setTruck({ ...Truck, price_year_truck: e.target.value })} />
                </div>
                <div className="admin-truck-list-choice" controlid="id_category_truck">                   {/* add category truck */}
                    <label htmlFor="name">Catégorie</label>
                    <select className="admin-truck-list-choice-form-control" value={idCategoryTruck} onChange={handleCategoryChange} required>
                        <option value="">-- Choisir une catégorie --</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}> {/* display list of categories to choose */}
                                {cat.name_category_truck}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="admin-truck-form-edit-group">
                    <label>Image du camion</label>
                    <div className="admin-truck-image-edit-block">
                        {imagePreview ? (
                            <img src={imagePreview} alt={Truck.name_truck} className="admin-truck-image-edit" />
                        ) : Truck.image_truck ? (
                            <img src={`http://127.0.0.1:8000/storage/uploads/Truck/${Truck.image_truck}`}
                                alt={Truck.name_truck} className="admin-truck-image-edit" />
                        ) : (
                            <p>Aucune image</p>
                        )}
                    </div>

                    <input type="file" id="image" className="admin-truck-image-edit-upload" onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setImagePreview(URL.createObjectURL(file));
                            setImageFile(file);
                        }
                    }}
                    />

                    <div className="admin-truck-edit-button">
                        <button type="submit" className="admin-truck-edit-btn">Valider</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditTruck;