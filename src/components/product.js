import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from '../styles/product.module.css';

const Product = ({ products, onAddToCart }) => {
    const { id } = useParams();
    const product = products.find(product => product.id === Number(id));
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <div>Product not found</div>
    }

    const handleAddToCart = () => {
        onAddToCart(product.id, Number(quantity));
        setQuantity(1);
    };    

    return (
        <div>
            <img className={styles.productImage} src={product.image} alt={product.name} />
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>${product.price}</p>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            <button className={styles.plusButton} onClick={() => setQuantity(quantity + 1)}>+</button>
            <button className={styles.minusButton} onClick={() => setQuantity(quantity - 1)}>-</button>
            <button className={styles.addButton} onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default Product;