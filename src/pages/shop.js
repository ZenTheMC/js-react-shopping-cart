import React from "react";
import { Link } from "react-router-dom";

const Shop = ({ products }) => {
    return (
        <div>
            <h1>Welcome to the Shop Page!</h1>
            {products.map(product => (
                <div key={product.id}>
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                </div>
            ))}
        </div>
    );
}

export default Shop;