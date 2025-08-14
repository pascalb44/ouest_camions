import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../src/pages/users/Register';

test('affiche la page d\'inscription', () => {
    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );
    expect(screen.getByText(/Création/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Nom')).toBeInTheDocument();
    expect(screen.getByLabelText('Prénom')).toBeInTheDocument();
    expect(screen.getByLabelText(/Entreprise/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Numéro siret')).toBeInTheDocument();
    expect(screen.getByLabelText('Siret')).toBeInTheDocument();
    expect(screen.getByLabelText(/Adresse/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Code postal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ville/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Téléphone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmer/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Envoyer/i })).toBeInTheDocument();
});
