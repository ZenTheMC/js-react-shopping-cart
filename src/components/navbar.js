import React from "react";
import { Link } from 'react-router-dom';

const Navbar = ({ cartItems, className }) => {
    return (
        <nav className={className}>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/cart">Cart ({cartItems.length})</Link>
        </nav>
    );
}

export default Navbar;