import React, { useState } from 'react';
import styles from '../styles/checkout.module.css';

const Checkout = ({ setCartItems }) => {
    const [isCheckoutSuccessful, setIsCheckoutSuccessful] = useState(false);
    const handleCheckout = () => {
        setCartItems([]);
        setIsCheckoutSuccessful(true);
    };

    return (
        <div>
            <h2 className={styles.checkoutTitle} >Checkout</h2>
            <button className={styles.confirmButton} onClick={handleCheckout}>Confirm Order</button>
            {isCheckoutSuccessful && <p className={styles.orderMessage} >Thank you! The Future is now!</p>}
        </div>
    );
}

export default Checkout;