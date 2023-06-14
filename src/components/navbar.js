import React from "react";
import { Link } from 'react-router-dom';

const Navbar = ({ totalQuantity, className }) => {
    return (
        <nav className={className}>
            <Link to="/">Road to the Market</Link>
            <Link to="/shop">The All-Exchange</Link>
            <Link to="/cart">Future Bag ({totalQuantity})</Link>
        </nav>
    );
}

export default Navbar;
