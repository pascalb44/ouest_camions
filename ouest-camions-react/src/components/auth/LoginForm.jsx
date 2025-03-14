import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function LoginForm() {
    // State pour stocker les valeurs du formulaire
    const [form, setForm] = useState({ email: "", password: "" });
    
    // State pour stocker les erreurs
    const [errors, setErrors] = useState({});

    // Gestion du changement de valeur des inputs
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Validation du formulaire
    const validateForm = () => {
        let newErrors = {};
        
        if (!form.email) {
            newErrors.email = "L'email est obligatoire";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Format d'email invalide";
        }

        if (!form.password) {
            newErrors.password = "Le mot de passe est obligatoire";
        } else if (form.password.length < 6) {
            newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retourne true si pas d'erreurs
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Données valides :", form);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Champ email */}
            <Form.Control type="email" name="email" placeholder="johndoe@unknown.fr" value={form.email} onChange={handleChange}/>
            {errors.email && <p className="text-danger">{errors.email}</p>}

            {/* Champ mot de passe */}
            <label htmlFor="password">Mot de passe :</label>
            <input type="password" id="password" name="password" value={form.password} onChange={handleChange}/>
            {errors.password && <p className="text-danger">{errors.password}</p>}

            {/* Bouton de soumission */}
            <Button variant="primary" type="submit">Se connecter</Button>
        </form>
    );
}

export default LoginForm;
