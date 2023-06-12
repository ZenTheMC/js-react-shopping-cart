import React, { useState } from 'react';

const Checkout = ({ setCartItems }) => {
    const [isCheckoutSuccessful, setIsCheckoutSuccessful] = useState(false);
    const handleCheckout = () => {
        setCartItems([]);
        setIsCheckoutSuccessful(true);
    };

    return (
        <div>
            <h2>Checkout</h2>
            <button onClick={handleCheckout}>Confirm Order</button>
            {isCheckoutSuccessful && <p>Thank you for your order!</p>}
        </div>
    );
}

export default Checkout;