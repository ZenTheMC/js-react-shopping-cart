import React from "react";

const Cart = ({ cartItems, onRemoveFromCart }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.map(item => (
                <div key={item.id}>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
                </div>
            ))}
            <p>Total: ${totalPrice}</p>
        </div>
    );
}

export default Cart;