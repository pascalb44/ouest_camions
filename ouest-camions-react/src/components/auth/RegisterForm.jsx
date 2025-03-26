import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        company: '',
        siren: null,
        address: '',
        postal_code: '',
        town: '',
        telephone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });


    const [errors, setErrors] = useState({});

    // submission
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // change 
    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'siren') {
            setFormData({
                ...formData,
                [name]: files[0] // seclected file 
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    // Validation 
    const validateForm = () => {
        const newErrors = {};

        if (!formData.first_name.trim()) newErrors.first_name = "Le prénom est requis";
        if (!formData.last_name.trim()) newErrors.last_name = "Le nom de famille est requis";
        if (!formData.company.trim()) newErrors.company = "Le nom de l'entreprise est requis";
        if (!formData.siren) newErrors.siren = "Le siren doit être un fichier image";
        if (!formData.address.trim()) newErrors.address = "L'adresse est requise";
        if (!formData.postal_code.trim()) newErrors.postal_code = "Le code postal est requis";
        if (!formData.town.trim()) newErrors.town = "La ville est requise";
        if (!formData.telephone.trim()) newErrors.telephone = "Le numéro de téléphone est requis";
        if (!formData.email.trim()) newErrors.email = "L'email est requis";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "L'email n'est pas valide";
        if (!formData.password) newErrors.password = "Le mot de passe est requis";
        else if (formData.password.length < 6) newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Les mots de passe ne correspondent pas";



        return newErrors;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        setIsSubmitting(true);
    
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });
        formDataToSend.append("id_role", 2);
    
        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                body: formDataToSend,
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Inscription réussie:', data);
                setIsSuccess(true);
                navigate('/login');
            } else {
                setErrors({ submit: data.message || "Erreur lors de l'inscription" });
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            setErrors({ submit: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.' });
        } finally {
            setIsSubmitting(false);
        }
    
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">


                {isSuccess && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Succès!</strong>
                        <span className="block sm:inline"> Votre compte a été créé avec succès.</span>
                    </div>
                )}

                {errors.submit && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{errors.submit}</span>
                    </div>
                )}

                <form className="form-container-register" onSubmit={handleSubmit}>
                    {/* first_name */}
                    <div className="form-group-register">
                        <label htmlFor="first_name" className="label-register">Prénom</label>
                        <input id="first_name" name="first_name" type="text" value={formData.first_name}
                            onChange={handleChange}
                            className={`input-register ${errors.first_name ? 'border-red-300' : 'border-gray-300'}`} />
                        {errors.first_name && <p className="mt-2 text-sm text-red-600">{errors.first_name}</p>}
                    </div>

                    {/* last_name */}
                    <div className="form-group-register">
                        <label htmlFor="last_name" className="label-register">Nom</label>
                        <input id="last_name" name="last_name" type="text" value={formData.last_name}
                            onChange={handleChange}
                            className={`input-register ${errors.last_name ? 'border-red-300' : 'border-gray-300'}`} />
                        {errors.last_name && <p className="mt-2 text-sm text-red-600">{errors.last_name}</p>}
                    </div>

                    {/* company */}
                    <div className="form-group-register">
                        <label htmlFor="company" className="label-register">Entreprise</label>
                        <input id="company" name="company" type="text" value={formData.company}
                            onChange={handleChange}
                            className={`input-register ${errors.company ? 'border-red-300' : 'border-gray-300'}`} />
                        {errors.company && <p className="mt-2 text-sm text-red-600">{errors.company}</p>}
                    </div>


                    {/* siren */}
                    <div className="form-group-register">
                        <label htmlFor="siren" for="image" className="label-register">SIREN</label>
                        <input id="siren" name="siren" type="file" onChange={handleChange}
                            className={`input-register ${errors.siren ? 'border-red-300' : 'border-gray-300'}`} />
                        {errors.siren && <p className="mt-2 text-sm text-red-600">{errors.siren}</p>}
                    </div>


                    {/* address */}
                    <div className="form-group-register">
                        <label htmlFor="address" className="label-register">Adresse</label>
                        <input id="address" name="address" type="text" value={formData.address}
                            onChange={handleChange}
                            className={`input-register ${errors.address ? 'border-red-300' : 'border-gray-300'}`} />
                        {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
                    </div>


                    {/* postalCode */}
                    <div className="form-group-register">
                        <label htmlFor="postal_code" className="label-register">Code postal</label>
                        <input id="postal_code" name="postal_code" type="text" value={formData.postal_code}
                            onChange={handleChange}
                            className={`input-register ${errors.postal_code ? 'border-red-300' : 'border-gray-300'}`} />
                        {errors.postal_code && <p className="mt-2 text-sm text-red-600">{errors.postal_code}</p>}
                    </div>

                    {/* town */}
                    <div className="form-group-register">
                        <label htmlFor="town" className="label-register">Ville</label>
                        <input id="town" name="town" type="text" value={formData.town}
                            onChange={handleChange}
                            className={`input-register ${errors.town ? 'border-red-300' : 'border-gray-300'}`} />
                        {errors.town && <p className="mt-2 text-sm text-red-600">{errors.town}</p>}
                    </div>

                    {/* phone */}
                    <div className="form-group-register">
                        <label htmlFor="telephone" className="label-register">Téléphone</label>
                        <input id="telephone" name="telephone" type="text" value={formData.telephone}
                            onChange={handleChange}
                            className={`input-register ${errors.telephone ? 'border-red-300' : 'border-gray-300'}`} />
                        {errors.telephone && <p className="mt-2 text-sm text-red-600">{errors.telephone}</p>}
                    </div>

                    {/* Email */}
                    <div className="form-group-register">
                        <label htmlFor="email" className="label-register">Email</label>
                        <input id="email" name="email" type="email" value={formData.email}
                            onChange={handleChange}
                            className={`input-register ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                            placeholder="Email" />
                        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    {/* password */}
                    <div className="form-group-register">
                        <label htmlFor="password" className="label-register">Mot de passe</label>
                        <input id="password" name="password" type="password" value={formData.password}
                            onChange={handleChange}
                            className={`input-register ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                            placeholder="Mot de passe" />
                        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    {/* Confirmation */}
                    <div className="form-group-register">
                        <label htmlFor="confirmPassword" className="label-register">Confirmer</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`input-register ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
                            placeholder="Confirmer le mot de passe" />
                        {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>
                    <div>
                        <button type="submit" className="button-register">
                            {isSubmitting ? 'Inscription en cours...' : 'Envoyer'}
                        </button>
                    </div>
                </form>


            </div>
        </div>
    );
};

export default RegisterForm;