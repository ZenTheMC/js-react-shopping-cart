import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from '../styles/cart.module.css';

const Cart = ({ cartItems, onRemoveFromCart, setCartItems }) => {
    const [quantities, setQuantities] = useState({});
    const [totalPrice, setTotalPrice] = useState(
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );

    useEffect(() => {
        setTotalPrice(
            cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        );
    }, [cartItems]);

    const handleRemoveFromCart = (id) => {
        onRemoveFromCart(id);
        setQuantities({ ...quantities, [id]: 1 });
    };

    const handleQuantityChange = (id, newQuantity) => {
        newQuantity = parseInt(newQuantity, 10);
        setQuantities({ ...quantities, [id]: newQuantity });
    
        const updatedCartItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);
    
        // Calculate the new total price
        const newTotalPrice = updatedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        setTotalPrice(newTotalPrice);
    };

    return (
        <div>
            <h2 className={styles.cartTitle}>Your Cart</h2>
            {cartItems.map(item => (
                <div key={item.id}>
                    <p className={styles.productName}>{item.name}</p>
                    <p className={styles.productPrice}>${item.price}</p>
                    <p>
                        <span className={styles.quantityText}>Quantity:</span>
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            data-testid={`quantity-${item.id}`}
                        />
                    </p>
                    <button className={styles.removeButton} onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                </div>
            ))}
            <p className={styles.totalAmount}>Total: ${totalPrice.toFixed(2)}</p>
            <Link to="/checkout">
                <button className={styles.checkoutButton} >Checkout</button>
            </Link>
        </div>
    );
}

export default Cart;