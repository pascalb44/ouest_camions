import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const AddCategoryTruck = () => {
    const navigate = useNavigate();

    const [nameCategoryTruck, setNameCategoryTruck] = useState("");
    const [imageCategoryTruck, setImageCategoryTruck] = useState("");
    const [validationError, setValidationError] = useState({});

    const changeHandler = (event) => {
        setImageCategoryTruck(event.target.files[0]);
    };

    const AddCategoryTruck = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name_category_truck", nameCategoryTruck); /* name in the base */
        formData.append("image_category_truck", imageCategoryTruck);


        try {

            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }
            await axios.post(
                'http://127.0.0.1:8000/api/admin/categories-trucks',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });
            navigate('/admin/categories-trucks'); // return to categories trucks admin page
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setValidationError(error.response.data.errors);
            } else {
                console.error('Erreur lors de ajout de la catégorie', error);
            }
        }
    };


    return (

        <div className="container">
            <div className="row justify-content-center">
                <div>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Création d'une nouvelle categorie de camion</h4>
                            <hr />
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
                                <form onSubmit={AddCategoryTruck}>
                                    <div className="mb-3" controlid="name_category_truck"> {/* add name */}
                                        <label className="form-label">Catégorie</label>
                                        <input type="text" className="form-control" value={nameCategoryTruck}
                                            onChange={(event) => setNameCategoryTruck(event.target.value)} required />
                                    </div>
                                   
                                    <div className="mb-3" controlid="image_category_truck"> {/* add the picture */}
                                        <label className="form-label">Image</label>
                                        <input type="file" className="form-control" onChange={changeHandler} />
                                    </div>
                                    <button className="mt-2" size="lg" block="block" type="submit">Ajouter la catégorie</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryTruck;