import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../src/pages/users/Register';

test('simule une inscription utilisateur', () => {
    global.fetch = jest.fn(() => /* to accept fetch in the registerForm */
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ success: true }),
        })
    );
    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Nom'), {
        target: { value: 'Durand' }
    });

    fireEvent.change(screen.getByLabelText('Prénom'), {
        target: { value: 'Lucie' }
    });

    fireEvent.change(screen.getByLabelText(/Entreprise/i), {
        target: { value: 'MaBoite' }
    });

    fireEvent.change(screen.getByLabelText(/Numéro siret/i), {
        target: { value: '12345678901234' }
    });

    const fakeFile = new File(['dummy content'], 'siret.jpg', { type: 'image/jpeg' }); // for the siretfile
    fireEvent.change(screen.getByLabelText('Siret'), {
        target: { files: [fakeFile] }
    });

    fireEvent.change(screen.getByLabelText(/Adresse/i), {
        target: { value: '1 rue des Lilas' }
    });

    fireEvent.change(screen.getByLabelText(/Code postal/i), {
        target: { value: '75000' }
    });

    fireEvent.change(screen.getByLabelText(/Ville/i), {
        target: { value: 'Paris' }
    });

    fireEvent.change(screen.getByLabelText(/Téléphone/i), {
        target: { value: '0601020304' }
    });

    fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: 'lucie@example.com' }
    });

    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
        target: { value: 'MotDePasse123!' }
    });

    fireEvent.change(screen.getByLabelText(/Confirmer/i), {
        target: { value: 'MotDePasse123!' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Envoyer/i }));
});
