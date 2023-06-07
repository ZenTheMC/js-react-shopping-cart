import React from "react";
import { Link } from 'react-router-dom';

const Shop = () => {
    return (
        <div className="Navbar">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
        </div>
    );
}

export default Shop;