import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const AddCategoryTrailer = () => {
    const navigate = useNavigate();

    const [nameCategoryTrailer, setNameCategoryTrailer] = useState("");
    const [description, setDescription] = useState("");
    const [imageCategoryTrailer, setImageCategoryTrailer] = useState("");
    const [validationError, setValidationError] = useState({});

    const changeHandler = (event) => {
        setImageCategoryTrailer(event.target.files[0]);
    };

    const addCategoryTrailer = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name_category_trailer", nameCategoryTrailer); /* name in the base */
        formData.append("description", description);
        formData.append("image_category_trailer", imageCategoryTrailer);


        try {

            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }
            await axios.post(`http://127.0.0.1:8000/api/admin/categories-trailers`, formData);
            navigate('/admin/categories-trailers'); // return to categories trailers admin page
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
                            <h4 className="card-title">Création d'une nouvelle categorie</h4>
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
                                <form onSubmit={addCategoryTrailer}>
                                    <div className="mb-3" controlid="name_category_trailer"> {/* add name */}
                                        <label className="form-label">Catégorie</label>
                                        <input type="text" className="form-control" value={nameCategoryTrailer}
                                            onChange={(event) => setNameCategoryTrailer(event.target.value)} required />
                                    </div>
                                    <div className="mb-3" controlid="description"> {/* add description */}
                                        <label className="form-label">Description</label>
                                        <input type="text" className="form-control" value={description}
                                            onChange={(event) => setDescription(event.target.value)} required />
                                    </div>
                                    <div className="mb-3" controlid="image_category_trailer"> {/* add the picture */}
                                        <label className="form-label">Image</label>
                                        <input type="file" className="form-control" onChange={changeHandler} />
                                    </div>
                                    <button variant="primary" className="mt-2" size="lg" block="block" type="submit">Ajouter la catégorie</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryTrailer;