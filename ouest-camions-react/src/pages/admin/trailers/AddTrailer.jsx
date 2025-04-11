import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const AddTrailer = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [brandTrailer, setBrandTrailer] = useState("");
    const [descriptionTrailer, setDescriptionTrailer] = useState("");
    const [nameTrailer, setNameTrailer] = useState("");
    const [colorTrailer, setColorTrailer] = useState("");
    const [lengthTrailer, setLengthTrailer] = useState("");
    const [widthTrailer, setWidthTrailer] = useState("");
    const [heightTrailer, setHeightTrailer] = useState("");
    const [loadTrailer, setLoadTrailer] = useState("");
    const [durationTrailer, setDurationTrailer] = useState("");
    const [dayTrailer, setDayTrailer] = useState("");
    const [weekTrailer, setWeekTrailer] = useState("");
    const [monthTrailer, setMonthTrailer] = useState("");
    const [yearTrailer, setYearTrailer] = useState("");
    const [imageTrailer, setImageTrailer] = useState("");
    const [idCategoryTrailer, setIdCategoryTrailer] = useState("");

    const [validationError, setValidationError] = useState({});


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


    const changeHandler = (event) => {
        setImageTrailer(event.target.files[0]);
    };


    const handleCategoryChange = (event) => {   /* to get the category trailers to choose*/
        setIdCategoryTrailer(Number(event.target.value));
        console.log('Selected category ID:', event.target.value);
    };

    const AddTrailer = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("brand_trailer", brandTrailer);
        formData.append("name_trailer", nameTrailer); /* name in the base */
        formData.append("description_trailer", descriptionTrailer);
        formData.append("color_trailer", colorTrailer);
        formData.append("length_trailer", lengthTrailer);
        formData.append("width_trailer", widthTrailer);
        formData.append("height_trailer", heightTrailer);
        formData.append("load_trailer", loadTrailer);
        formData.append("duration_trailer", durationTrailer);
        formData.append("price_day_trailer", dayTrailer);
        formData.append("price_week_trailer", weekTrailer);
        formData.append("price_month_trailer", monthTrailer);
        formData.append("price_year_trailer", yearTrailer);
        formData.append("id_category_trailer", idCategoryTrailer);
        formData.append("image_trailer", imageTrailer);

        try {

            await axios.post(
                'http://127.0.0.1:8000/api/admin/trailers',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });
            navigate('/admin/trailers'); // return to trailers admin page
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setValidationError(error.response.data.errors);
            } else {
                console.error('Erreur lors de l\'ajout de la remorque', error);
            }
        }
    };

    return (

        <div className="admin-trailer-add-container">
                        <Link to="/admin/" className="admin-trailer-btn-return">Retour au dashboard</Link>

            <div className="card-body">
                <h1 className="h1-admin-trailer-add">Création d'une nouvelle remorque</h1>
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
                    <form onSubmit={AddTrailer} className="admin-trailer-form-add">
                        <div className="admin-trailer-form-add-group" controlid="brand_trailer"> {/* add brand */}
                            <label htmlFor="brand">Marque</label>
                            <input type="text" className="admin-trailer-name-add" value={brandTrailer}
                                onChange={(event) => setBrandTrailer(event.target.value)} required />
                        </div>
                        <div className="admin-trailer-form-add-group" controlid="name_trailer">
                            <label htmlFor="name">Nom</label>
                            <input type="text" className="admin-trailer-name-add" value={nameTrailer}
                                onChange={(event) => setNameTrailer(event.target.value)} required />
                        </div>
                        <div className="admin-trailer-form-add-group" controlid="description_trailer">
                            <label htmlFor="description">Description</label>
                            <input type="text" className="admin-trailer-name-add" value={descriptionTrailer}
                                onChange={(event) => setDescriptionTrailer(event.target.value)} required />
                        </div>
                        <div className="admin-trailer-form-add-group" controlid="color_trailer">
                            <label htmlFor="name">Couleur</label>
                            <input type="text" className="admin-trailer-name-add" value={colorTrailer}
                                onChange={(event) => setColorTrailer(event.target.value)} required />
                        </div>
                        <div className="admin-trailer-form-add-group" controlid="lenght_trailer">
                            <label htmlFor="name">Longueur</label>
                            <input type="text" className="admin-trailer-name-add" value={lengthTrailer}
                                onChange={(event) => setLengthTrailer(event.target.value)} required />
                        </div>
                        <div className="admin-trailer-form-add-group" controlid="width_trailer">
                            <label htmlFor="name">Largeur</label>
                            <input type="text" className="admin-trailer-name-add" value={widthTrailer}
                                onChange={(event) => setWidthTrailer(event.target.value)} required />
                        </div>
                        <div className="admin-trailer-form-add-group" controlid="height_trailer">
                            <label htmlFor="name">Hauteur</label>
                            <input type="text" className="admin-trailer-name-add" value={heightTrailer}
                                onChange={(event) => setHeightTrailer(event.target.value)} required />
                        </div>
                        <div className="admin-trailer-form-add-group" controlid="load_trailer">
                            <label htmlFor="name">Charge</label>
                            <input type="text" className="admin-trailer-name-add" value={loadTrailer}
                                onChange={(event) => setLoadTrailer(event.target.value)} required />
                        </div>
                        <div className="admin-trailer-form-add-group" controlid="duration_trailer">
                            <label htmlFor="name">Durée de location conseillée</label>
                            <input type="text" className="admin-trailer-name-add" value={durationTrailer}
                                onChange={(event) => setDurationTrailer(event.target.value)} required />
                        </div>
                        <div className="admin-trailer-form-add-group" controlid="price_day_trailer">
                            <label htmlFor="name">Prix/jour</label>
                            <input type="text" className="admin-trailer-name-add" value={dayTrailer}
                                onChange={(event) => setDayTrailer(event.target.value)} required />
                        </div>
                        <div className="admin-trailer-form-add-group" controlid="price_week_trailer">
                            <label htmlFor="name">Prix/semaine</label>
                            <input type="text" className="admin-trailer-name-add" value={weekTrailer}
                                onChange={(event) => setWeekTrailer(event.target.value)} required />
                        </div>
                        <div className="admin-trailer-form-add-group" controlid="price_month_trailer">
                            <label htmlFor="name">Prix/mois</label>
                            <input type="text" className="admin-trailer-name-add" value={monthTrailer}
                                onChange={(event) => setMonthTrailer(event.target.value)} required />
                        </div>
                        <div className="admin-trailer-form-add-group" controlid="price_year_trailer">
                            <label htmlFor="name">Prix/an </label>
                            <input type="text" className="admin-trailer-name-add" value={yearTrailer}
                                onChange={(event) => setYearTrailer(event.target.value)} required />
                        </div>
                        <div className="admin-trailer-list-choice" controlid="id_category_trailer">                   {/* add category trailer */}
                            <select className="admin-trailer-list-choice-form-control" value={idCategoryTrailer} onChange={handleCategoryChange} required>
                                <option value="">-- Choisir une catégorie --</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name_category_trailer}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3" controlid="image_trailer">                           {/* add the picture */}
                            <label className="form-label">Image</label>
                            <input type="file" className="admin-trailer-name-add" onChange={changeHandler} />
                        </div>
                        <button className="admin-trailer-add-btn" type="submit">Ajouter la remorque</button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default AddTrailer;