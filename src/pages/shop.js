import React from "react";
import { Link } from "react-router-dom";
import styles from '../styles/shop.module.css';

const Shop = ({ products }) => {
    return (
        <div>
            <h1>Welcome to the Shop Page!</h1>
            {products.map(product => (
                <div key={product.id} className={styles.productContainer}>
                    <img className={styles.productPreview} src={product.image} alt={product.name} />
                    <Link to={`/product/${product.id}`} className={styles.productName}>{product.name}</Link>
                </div>
            ))}
        </div>
    );
}

export default Shop;