import React from 'react';

const SepaCheckout = ({ active }) => {
    const handleClick = () => {
        if (!active) return;
        alert("Paiement par virement SEPA à venir.");
    };

    return (
        <div style={{ opacity: active ? 1 : 0.5, pointerEvents: active ? 'auto' : 'none' }}>
            <button onClick={handleClick}>Payer par Virement SEPA</button>
        </div>
    );
}; 

export default SepaCheckout;
