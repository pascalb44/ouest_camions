import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const [formData, setFormData] = useState({ /* data in the base */
        first_name: '',
        last_name: '',
        company: '',
        email_contact: '',
        subject: '',
        message: '',
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = { ...formData };

        try {
            const token = localStorage.getItem('token');

            const response = await axios.post('http://localhost:8000/api/contacts', requestData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSuccessMessage(response.data.message);
            setFormData({
                first_name: '',
                last_name: '',
                company: '',
                email_contact: '',
                subject: '',
                message: '',
            });
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message :', error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h1>Contactez-nous</h1>
            <form onSubmit={handleSubmit}>
                {successMessage && (
                    <div style={{ color: 'green', marginBottom: '1rem' }}>
                        {successMessage}
                    </div>
                )}
                <div>
                    <label htmlFor="first_name">Prénom :</label>
                    <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="last_name">Nom :</label>
                    <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="subject">Entreprise :</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="subject">Objet :</label>
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email_contact">Email :</label>
                    <input type="email" id="email_contact" name="email_contact" value={formData.email_contact} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="message">Message :</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
};

export default ContactForm;
