import React from "react";
import { useParams } from "react-router-dom";

const Product = ({ products, onAddToCart }) => {
    const { id } = useParams();
    const product = products.find(product => product.id === Number(id));

    if (!product) {
        return <div>Product not found</div>
    }

    return (
        <div>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => {
                // Was trying to debug click event not working, so console, but it didn't show up
                // Fixed it by switching from conventional userEvent to older fireEvent in test file
                // console.log(`Adding product with id ${product.id} to cart`);
                onAddToCart(product.id)
            }}>Add to Cart</button>
        </div>
    );
}

export default Product;