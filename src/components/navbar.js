import React from "react";
import { Link } from 'react-router-dom';

const Navbar = ({ cartItems, className }) => {
    return (
        <nav className={className}>
            <Link to="/">Road to the Market</Link>
            <Link to="/shop">The All-Exchange</Link>
            <Link to="/cart">Future Bag ({cartItems.length})</Link>
        </nav>
    );
}

export default Navbar;
