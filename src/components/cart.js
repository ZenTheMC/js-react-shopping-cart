import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = ({ cartItems, onRemoveFromCart, setCartItems }) => {
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        setQuantities(
            cartItems.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
        );
    }, [cartItems]);

    const handleRemoveFromCart = (id) => {
        onRemoveFromCart(id);
        setQuantities({ ...quantities, [id]: 1 });
    };

    const handleQuantityChange = (id, newQuantity) => {
        setQuantities({ ...quantities, [id]: newQuantity });
    
        const updatedCartItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: parseInt(newQuantity) } : item
        );
        setCartItems(updatedCartItems);
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.map(item => (
                <div key={item.id}>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>
                        Quantity: 
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            data-testid={`quantity-${item.id}`}
                        />
                    </p>
                    <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                </div>
            ))}
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <Link to="/checkout">
                <button>Checkout</button>
            </Link>
        </div>
    );
}

export default Cart;