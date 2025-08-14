import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Cart from '../src/pages/order/Cart';
import { MemoryRouter } from 'react-router-dom';

describe('Composant Cart', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.restoreAllMocks();
    });

    test('afficher le message du panier vide si aucune réservation et/ou si user non connecté', () => {
        render(
            <MemoryRouter>
                <Cart />
            </MemoryRouter>
        );

        expect(screen.getByText(/Aucune réservation en cours/i)).toBeInTheDocument();
        expect(screen.queryByText(/Payer/i)).not.toBeInTheDocument();
    });


    test('vérifier si le token est présent et si non empêcher de payer', async () => {
        // user no connected test reservations but without token
        localStorage.setItem('reservations', JSON.stringify([
            {
                id: 2,
                type: 'truck',
                brand: 'Ford',
                name: 'FH',
                duration: 2,
                startDate: '2025-08-01',
                endDate: '2025-08-03',
                pricePerDay: '100',
                pricePerWeek: '600',
                pricePerMonth: '2000',
                pricePerYear: '24000'
            }
        ]));
        localStorage.removeItem('token'); // no token 

        render(
            <MemoryRouter>
                <Cart />
            </MemoryRouter>
        );

        // no payment button because no token = user can't pay 
        expect(screen.queryByText(/Payer/i)).not.toBeInTheDocument();

        // empty cart because no token = message on screen
        expect(screen.getByText(/Aucune réservation en cours/i)).toBeInTheDocument();
    });


// cart read

    test('afficher les réservations, les enregistrer dans localStorage si user connecté et payer', async () => {
        localStorage.setItem('token', 'fake-token'); // token
        localStorage.setItem('user_id', '123'); // user
        localStorage.setItem('reservations', JSON.stringify([
            {
                id: 1,
                type: 'truck',
                brand: 'Ford',
                name: 'FH',
                duration: 3,
                startDate: '2025-08-01',
                endDate: '2025-08-04',
                pricePerDay: '50',
                pricePerWeek: '300',
                pricePerMonth: '1000',
                pricePerYear: '10000'
            },
            {
                id: 2,
                type: 'trailer',
                brand: 'Mercedes',
                name: 'Flatbed',
                duration: 2,
                startDate: '2025-08-05',
                endDate: '2025-08-07',
                pricePerDay: '30',
                pricePerWeek: '180',
                pricePerMonth: '700',
                pricePerYear: '8000'
            }
        ])); // reservations of the 2 vehicles

        render(
            <MemoryRouter>
                <Cart />
            </MemoryRouter>
        );

        expect(await screen.findByText(/FH/i)).toBeInTheDocument();
        expect(screen.getByText(/Flatbed/i)).toBeInTheDocument();

        const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

        const payerButton = screen.getByText(/Payer/i); // payment button
        fireEvent.click(payerButton);

        await waitFor(() => {
            expect(setItemSpy).toHaveBeenCalledWith("reservation", expect.any(String));
        });

        const lastCall = setItemSpy.mock.calls.find(call => call[0] === "reservation");
        expect(lastCall).toBeDefined();

        const payload = JSON.parse(lastCall[1]);
        expect(payload.amount).toBeGreaterThan(0);
        expect(payload.reservations.length).toBe(2);

        setItemSpy.mockRestore();
    });



// cart delete

    test('supprimer une des deux réservations quand on clique sur Supprimer', async () => {
        localStorage.setItem('token', 'fake-token');
        localStorage.setItem('user_id', '123');
        localStorage.setItem('reservations', JSON.stringify([
            {
                id: 1,
                type: 'truck',
                brand: 'Ford',
                name: 'FH',
                duration: 3,
                startDate: '2025-08-01',
                endDate: '2025-08-04',
                pricePerDay: '50',
                pricePerWeek: '300',
                pricePerMonth: '1000',
                pricePerYear: '10000'
            },
            {
                id: 2,
                type: 'trailer',
                brand: 'Mercedes',
                name: 'Flatbed',
                duration: 2,
                startDate: '2025-08-05',
                endDate: '2025-08-07',
                pricePerDay: '30',
                pricePerWeek: '180',
                pricePerMonth: '700',
                pricePerYear: '8000'
            }
        ]));

        render(
            <MemoryRouter>
                <Cart />
            </MemoryRouter>
        );

        // 2 reservations on the screen
        expect(await screen.findByText(/FH/i)).toBeInTheDocument();
        expect(screen.getByText(/Flatbed/i)).toBeInTheDocument();

        const deleteButtons = screen.getAllByText(/Supprimer cette réservation/i);
        const confirmSpy = jest.spyOn(window, 'confirm').mockImplementation(() => true);

        fireEvent.click(deleteButtons[0]);

        // waiting truck FH delete
        await waitFor(() => {
            expect(screen.queryByText(/FH/i)).not.toBeInTheDocument();
        });

        // trailer Flatbed is always in reservation
        expect(screen.getByText(/Flatbed/i)).toBeInTheDocument();

        const storedReservations = JSON.parse(localStorage.getItem('reservations'));
        expect(storedReservations.length).toBe(1);
        expect(storedReservations[0].name).toBe('Flatbed');

        confirmSpy.mockRestore();
    });
});
