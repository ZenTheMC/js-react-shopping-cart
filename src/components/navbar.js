import React from "react";
import { Link } from 'react-router-dom';

const Navbar = ({ cartItems }) => {
    return (
        <div className="Navbar">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <div>Cart: {cartItems.length}</div>
        </div>
    );
}

export default Navbar;