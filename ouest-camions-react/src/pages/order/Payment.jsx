// src/pages/order/Payment.jsx
import React from 'react';
import PaypalCheckout from '../../components/PaypalCheckout';

const Payment = () => {
  const alertComingSoon = (method) => {
    alert(`Paiement par ${method} à venir.`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Choisissez votre mode de paiement :</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {/* PayPal */}
        <div>
          <h3 className="text-lg font-semibold mb-2">PayPal</h3>
          <PaypalCheckout />
        </div>


        {/* Virement SEPA */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Virement SEPA</h3>
          <button className="bg-gray-400 text-white px-4 py-2 rounded opacity-60 cursor-not-allowed"
            onClick={() => alertComingSoon("virement SEPA")} disabled>
            À venir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
