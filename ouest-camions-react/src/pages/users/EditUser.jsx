import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        company: '',
        siren: '',
        address: '',
        postal_code: '',
        town: '',
        email: '',
        phone: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [file, setFile] = useState(null);
    const [validationError, setValidationError] = useState({});


    const fetchUser = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
        } catch (error) {
            console.error("Erreur récupération utilisateur:", error);
            setError("Impossible de charger les informations.");
        }
    }, [id]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('first_name', user.first_name);
        formData.append('last_name', user.last_name);
        formData.append('company', user.company);
        formData.append('address', user.address);
        formData.append('postal_code', user.postal_code);
        formData.append('town', user.town);
        formData.append('email', user.email);
        formData.append('phone', user.phone);

        if (file) {
            formData.append('siren', file);
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://127.0.0.1:8000/api/users/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json'
                    }
                }
            );

            setSuccess("Profil mis à jour avec succès !");
            setTimeout(() => {
                navigate('/profile'); /* return to profile if update ok */
            }, 2000);                 /* = 2 secondes */
        } catch (error) {
            console.error("Erreur mise à jour:", error);
            if (error.response && error.response.status === 422) {
                setValidationError(error.response.data.errors);
            } else {
                setValidationError({
                    general: ["Une erreur s'est produite lors de la mise à jour"]
                });
                setError("Échec de la mise à jour.");
            }
        }
    };

    const handleDelete = async () => {
        if (!user || !user.id) {
            alert("Erreur : ID utilisateur non défini. Reconnexion nécessaire.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Erreur : Aucun token trouvé.");
                return;
            }

            const response = await axios.delete(`http://127.0.0.1:8000/api/users/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Réponse API :", response.data);

            alert("Votre compte a été supprimé.");
            localStorage.clear();
            navigate('/'); /* go to homepage after delete profile */
        } catch (error) {
            console.error("Erreur lors de la suppression :", error.response ? error.response.data : error.message);
            alert("Une erreur est survenue, veuillez réessayer.");
        }
    };

    return (
        <div>
            <h1 className="h1-edit-user">Modifiez votre profil</h1>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            {validationError.general && <p className="error">{validationError.general}</p>}
            <form className="form-edit-user" onSubmit={handleSubmit}>
                <div className="edit-user">
                    <div className="form-group-edit-user">
                        <label className="label-edit-user">Prénom:</label>
                        <input type="text" name="first_name" value={user.first_name} onChange={handleChange} />
                        {validationError.first_name && <p className="error">{validationError.first_name}</p>} {/* validation of first_name */}
                    </div>
                    <div className="form-group-edit-user">
                        <label className="label-edit-user">Nom:</label>
                        <input type="text" name="last_name" value={user.last_name} onChange={handleChange} />
                        {validationError.last_name && <p className="error">{validationError.last_name}</p>} {/* validation of last_name */}
                    </div>
                    <div className="form-group-edit-user">
                        <label className="label-edit-user">Entreprise :</label>
                        <input type="text" name="company" value={user.company} onChange={handleChange} />
                        {validationError.company && <p className="error">{validationError.company}</p>}
                    </div>
                    <div className="form-group-edit-user form-group-edit-user-siren-mobile"> 
                            <label className="label-edit-user-no-mobile">SIREN : </label> 
                            <div className="file-info-no-mobile">{user.siren}</div>
                        <div className="group-edit-user-siren-mobile">        {/* only for mobile */}
                            <label className="label-edit-user-mobile">SIREN : </label>
                            <div className="file-info-mobile">{user.siren}</div>
                        </div>

                        <input type="file" name="siren" accept="image/*" onChange={handleFileChange} />
                        {validationError.siren && <p className="error">{validationError.siren}</p>}
                    </div>
                    <div className="form-group-edit-user">
                        <label className="label-edit-user">Adresse:</label>
                        <input type="text" name="address" value={user.address} onChange={handleChange} />
                        {validationError.address && <p className="error">{validationError.address}</p>}
                    </div>
                    <div className="form-group-edit-user">
                        <label className="label-edit-user">Code Postal:</label>
                        <input type="text" name="postal_code" value={user.postal_code} onChange={handleChange} />
                        {validationError.postal_code && <p className="error">{validationError.postal_code}</p>}
                    </div>
                    <div className="form-group-edit-user">
                        <label className="label-edit-user">Ville:</label>
                        <input type="text" name="town" value={user.town} onChange={handleChange} />
                        {validationError.town && <p className="error">{validationError.town}</p>}
                    </div>
                    <div className="form-group-edit-user">
                        <label className="label-edit-user">Email:</label>
                        <input type="email" name="email" value={user.email} onChange={handleChange} />
                        {validationError.email && <p className="error">{validationError.email}</p>}
                    </div>
                    <div className="form-group-edit-user">
                        <label className="label-edit-user">Téléphone:</label>
                        <input type="text" name="phone" value={user.phone} onChange={handleChange} />
                        {validationError.phone && <p className="error">{validationError.phone}</p>}
                    </div>
                    <div className="user-manage-buttons"> {/* manage buttons to delete and update user profile */}
                        <button type="submit" className="update-button-user">Validez</button>
                        <button type="button" onClick={handleDelete} className="delete-button-user">Supprimez votre compte</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
