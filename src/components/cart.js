import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cart = ({ cartItems, onRemoveFromCart }) => {
    const [quantities, setQuantities] = useState(cartItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {}));

    const handleQuantityChange = (id, quantity) => {
        setQuantities({ ...quantities, [id]: quantity });
    };

    const handleRemoveFromCart = (id) => {
        onRemoveFromCart(id);
        setQuantities({ ...quantities, [id]: 1 });
    };    

    const totalPrice = cartItems.reduce((total, item) => total + item.price * quantities[item.id], 0);

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.map(item => (
                <div key={item.id}>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <input
                        type="number"
                        min="1"
                        value={quantities[item.id]}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        data-testid={`quantity-${item.id}`}
                    />
                    <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                </div>
            ))}
            <p>Total: ${totalPrice}</p>
            <Link to="/checkout">
                <button>Checkout</button>
            </Link>
        </div>
    );
}

export default Cart;