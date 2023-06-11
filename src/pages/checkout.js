import React from 'react';

const Checkout = ({ setCartItems }) => {
    const handleCheckout = () => {
        setCartItems([]);
        alert("Thank you for your order!");
    };

    return (
        <div>
            <h2>Checkout</h2>
            <button onClick={handleCheckout}>Confirm Order</button>
        </div>
    );
}

export default Checkout;