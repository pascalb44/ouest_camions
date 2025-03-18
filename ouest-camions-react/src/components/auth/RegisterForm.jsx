import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        company: '',
        siren: '',
        address: '',
        postalCode: '',
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
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });


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
        if (!formData.siren.match(/^\d{9}$/)) newErrors.siren = "Le siren doit être un entier de 9 chiffres";
        if (!formData.address.trim()) newErrors.address = "L'adresse est requise";
        if (!formData.postalCode.trim()) newErrors.postalCode = "Le code postal est requis";
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

        try {
            const response = await fetch('http://localhost:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, id_role: 2 }),
            });

            const responseText = await response.text();
            console.log('Réponse brute:', responseText);
    

            const data = JSON.parse(responseText); // Cela peut être source d'erreur si la réponse n'est pas du JSON

            if (response.ok) {
                console.log('Inscription réussie:', data);
                setIsSuccess(true);
                navigate('/login');
            } else {
                setErrors({ submit: data.meta.message || "Erreur lors de l'inscription" });
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

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        {/* Prénom */}
                        <div className="mb-4">
                            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Prénom</label>
                            <input id="first_name" name="first_name" type="text" value={formData.first_name}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${errors.first_name ? 'border-red-300' : 'border-gray-300'}`} />
                            {errors.first_name && <p className="mt-2 text-sm text-red-600">{errors.first_name}</p>}
                        </div>

                        {/* Nom */}
                        <div className="mb-4">
                            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Nom</label>
                            <input id="last_name" name="last_name" type="text" value={formData.last_name}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${errors.last_name ? 'border-red-300' : 'border-gray-300'}`} />
                            {errors.last_name && <p className="mt-2 text-sm text-red-600">{errors.last_name}</p>}
                        </div>


                        <div className="mb-4">
                            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Entreprise</label>
                            <input id="company" name="company" type="text" value={formData.company}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${errors.company ? 'border-red-300' : 'border-gray-300'}`} />
                            {errors.company && <p className="mt-2 text-sm text-red-600">{errors.company}</p>}
                        </div>


                        {/* Champ siren */}
                        <div className="mb-4">
                            <label htmlFor="siren" className="block text-sm font-medium text-gray-700">SIREN</label>
                            <input id="siren" name="siren" type="text" value={formData.siren}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${errors.address ? 'border-red-300' : 'border-gray-300'}`} />
                            {errors.siren && <p className="mt-2 text-sm text-red-600">{errors.siren}</p>}
                        </div>


                        {/* Champ adresse */}
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                            <input id="address" name="address" type="text" value={formData.address}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${errors.address ? 'border-red-300' : 'border-gray-300'}`} />
                            {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
                        </div>


                        {/* Champ postalCode */}
                        <div className="mb-4">
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Code postal</label>
                            <input id="postalCode" name="postalCode" type="text" value={formData.postalCode}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${errors.postalCode ? 'border-red-300' : 'border-gray-300'}`} />
                            {errors.postalCode && <p className="mt-2 text-sm text-red-600">{errors.postalCode}</p>}
                        </div>


                        {/* Champ ville */}
                        <div className="mb-4">
                            <label htmlFor="town" className="block text-sm font-medium text-gray-700">Ville</label>
                            <input id="town" name="town" type="text" value={formData.town}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${errors.town ? 'border-red-300' : 'border-gray-300'}`} />
                            {errors.town && <p className="mt-2 text-sm text-red-600">{errors.town}</p>}
                        </div>

                        {/* Champ telephone */}
                        <div className="mb-4">
                            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                            <input id="telephone" name="telephone" type="text" value={formData.telephone}
                                onChange={handleChange}
                                className={`mt-1 block w-full px-3 py-2 border ${errors.telephone ? 'border-red-300' : 'border-gray-300'}`} />
                            {errors.telephone && <p className="mt-2 text-sm text-red-600">{errors.telephone}</p>}
                        </div>

                    </div>
                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input id="email" name="email" type="email" value={formData.email}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                            placeholder="Email" />
                        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    {/* Mot de passe */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input id="password" name="password" type="password" value={formData.password}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'}`}
                            placeholder="Mot de passe" />
                        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    {/* Confirmation mot de passe */}
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`mt-1 block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}`}
                            placeholder="Confirmer le mot de passe" />
                        {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting} className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
                            {isSubmitting ? 'Inscription en cours...' : 'Envoyer'}
                        </button>
                    </div>
                </form>



            </div>
        </div>
    );
};

export default RegisterForm;