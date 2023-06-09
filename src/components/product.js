import React from "react";

const Product = ({ product, onAddToCart }) => {
    return (
        <div>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => {
                console.log(`Adding product with id ${product.id} to cart`);
                onAddToCart(product.id);
            }}>Add to Cart</button>
        </div>
    );
}

export default Product;