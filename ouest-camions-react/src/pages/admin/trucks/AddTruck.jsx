import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const AddTruck = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [brandTruck, setBrandTruck] = useState("");
    const [descriptionTruck, setDescriptionTruck] = useState("");
    const [nameTruck, setNameTruck] = useState("");
    const [colorTruck, setColorTruck] = useState("");
    const [lengthTruck, setLengthTruck] = useState("");
    const [widthTruck, setWidthTruck] = useState("");
    const [heightTruck, setHeightTruck] = useState("");
    const [loadTruck, setLoadTruck] = useState("");
    const [kmTruck, setKmTruck] = useState("");
    const [durationTruck, setDurationTruck] = useState("");
    const [dayTruck, setDayTruck] = useState("");
    const [weekTruck, setWeekTruck] = useState("");
    const [monthTruck, setMonthTruck] = useState("");
    const [yearTruck, setYearTruck] = useState("");
    const [imageTruck, setImageTruck] = useState("");
    const [idCategoryTruck, setIdCategoryTruck] = useState("");

    const [validationError, setValidationError] = useState({});


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


    const changeHandler = (event) => {
        setImageTruck(event.target.files[0]);
    };


    const handleCategoryChange = (event) => {   /* to get the category trucks to choose*/
        setIdCategoryTruck(Number(event.target.value));
        console.log('Selected category ID:', event.target.value);
    };

    const AddTruck = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("brand_truck", brandTruck);
        formData.append("name_truck", nameTruck); /* name in the base */
        formData.append("description_truck", descriptionTruck);
        formData.append("color_truck", colorTruck);
        formData.append("length_truck", lengthTruck);
        formData.append("width_truck", widthTruck);
        formData.append("height_truck", heightTruck);
        formData.append("load_truck", loadTruck);
        formData.append("km_truck", kmTruck);
        formData.append("duration_truck", durationTruck);
        formData.append("price_day_truck", dayTruck);
        formData.append("price_week_truck", weekTruck);
        formData.append("price_month_truck", monthTruck);
        formData.append("price_year_truck", yearTruck);
        formData.append("id_category_truck", idCategoryTruck);
        formData.append("image_truck", imageTruck);


        try {

            await axios.post(
                'http://127.0.0.1:8000/api/admin/trucks',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });
            navigate('/admin/trucks'); // return to trucks admin page
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setValidationError(error.response.data.errors);
            } else {
                console.error('Erreur lors de l\'ajout du camion', error);
            }
        }
    };

    return (

        <div>
            <Link to="/admin/" className="admin-truck-btn-return">Retour au dashboard</Link>
            <div>
                <div className="admin-truck-add-container">
                    <div className="card-body">
                        <h1 className="h1-admin-truck-add">Création d'un nouveau camion</h1>
                        <hr />
                        <p>Ne pas oublier d'ajouter les valeurs lors de la modification (m, euros, tonne, mois...)</p>
                        <div className="form-wrapper">
                            {Object.keys(validationError).length > 0 && (
                                <div className="row">
                                    <div className="col-12">
                                        <div className="alert alert-danger">
                                            <ul className="mb-0">
                                                {Object.entries(validationError).map(
                                                    ([key, value]) => (
                                                        <li key={key}>{value}</li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={AddTruck}>
                                <div className="admin-truck-form-add-group" controlid="brand_truck"> {/* add brand */}
                                    <label className="form-label">Marque</label>
                                    <input type="text" className="admin-truck-name-add" value={brandTruck}
                                        onChange={(event) => setBrandTruck(event.target.value)} required />
                                </div>
                                <div className="admin-truck-form-add-group" controlid="name_truck">
                                    <label className="form-label">Nom</label>
                                    <input type="text" className="admin-truck-name-add" value={nameTruck}
                                        onChange={(event) => setNameTruck(event.target.value)} required />
                                </div>
                                <div className="admin-truck-form-add-group" controlid="description_truck">
                                    <label className="form-label">Description</label>
                                    <input type="text" className="admin-truck-name-add" value={descriptionTruck}
                                        onChange={(event) => setDescriptionTruck(event.target.value)} required />
                                </div>
                                <div className="admin-truck-form-add-group" controlid="color_truck">
                                    <label className="form-label">Couleur</label>
                                    <input type="text" className="admin-truck-name-add" value={colorTruck}
                                        onChange={(event) => setColorTruck(event.target.value)} required />
                                </div>
                                <div className="admin-truck-form-add-group" controlid="lenght_truck">
                                    <label className="form-label">Longueur</label>
                                    <input type="text" className="admin-truck-name-add" value={lengthTruck}
                                        onChange={(event) => setLengthTruck(event.target.value)} required />
                                </div>
                                <div className="admin-truck-form-add-group" controlid="width_truck">
                                    <label className="form-label">Largeur</label>
                                    <input type="text" className="admin-truck-name-add" value={widthTruck}
                                        onChange={(event) => setWidthTruck(event.target.value)} required />
                                </div>
                                <div className="admin-truck-form-add-group" controlid="height_truck">
                                    <label className="form-label">Hauteur</label>
                                    <input type="text" className="admin-truck-name-add" value={heightTruck}
                                        onChange={(event) => setHeightTruck(event.target.value)} required />
                                </div>
                                <div className="admin-truck-form-add-group" controlid="load_truck">
                                    <label className="form-label">charge</label>
                                    <input type="text" className="admin-truck-name-add" value={loadTruck}
                                        onChange={(event) => setLoadTruck(event.target.value)} required />
                                </div>
                                <div className="admin-truck-form-add-group" controlid="km_truck">
                                    <label className="form-label">Kilométrage</label>
                                    <input type="number" className="admin-truck-name-add" value={kmTruck}
                                        onChange={(event) => setKmTruck(event.target.value)} required />
                                </div>
                                <div className="admin-truck-form-add-group" controlid="duration_truck">
                                    <label className="form-label">Durée</label>
                                    <input type="text" className="admin-truck-name-add" value={durationTruck}
                                        onChange={(event) => setDurationTruck(event.target.value)} required />
                                </div>
                                <div className="admin-truck-form-add-group" controlid="price_day_truck">
                                    <label className="form-label">Prix/jour</label>
                                    <input type="text" className="admin-truck-name-add" value={dayTruck}
                                        onChange={(event) => setDayTruck(event.target.value)} required />
                                </div>
                                <div className="admin-truck-form-add-group" controlid="price_week_truck">
                                    <label className="form-label">Prix/semaine</label>
                                    <input type="text" className="admin-truck-name-add" value={weekTruck}
                                        onChange={(event) => setWeekTruck(event.target.value)} required />
                                </div>
                                <div className="admin-truck-form-add-group" controlid="price_month_truck">
                                    <label className="form-label">Prix/mois</label>
                                    <input type="text" className="admin-truck-name-add" value={monthTruck}
                                        onChange={(event) => setMonthTruck(event.target.value)} required />
                                </div>
                                <div className="admin-truck-form-add-group" controlid="price_year_truck">
                                    <label className="form-label">Prix annuel</label>
                                    <input type="text" className="admin-truck-name-add" value={yearTruck}
                                        onChange={(event) => setYearTruck(event.target.value)} required />
                                </div>
                                <div className="admin-truck-form-add-group" controlid="id_category_truck">                   {/* add category truck */}
                                    <select className="admin-truck-list-choice-form-control" value={idCategoryTruck} onChange={handleCategoryChange} required>
                                        <option value="">-- Choisir une catégorie --</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name_category_truck}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="admin-truck-form-add-group" controlid="image_truck">                           {/* add the picture */}
                                    <label className="form-label">Image</label>
                                    <input type="file" className="admin-truck-name-add" onChange={changeHandler} />
                                </div>
                                <button className="admin-truck-add-btn" type="submit">Ajouter le camion</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default AddTruck;