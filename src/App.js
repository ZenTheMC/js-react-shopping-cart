import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Shop from './pages/shop';
import Navbar from './components/navbar';
import Product from './components/product';
import Cart from './components/cart';
import Checkout from './pages/checkout';
import styles from './styles/app.module.css';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const [products] = useState([
    { id: 1, name: "Product 1", description: "This is product 1", price: 19.99, image: "https://example.com/image1.jpg" },
    { id: 2, name: "Product 2", description: "This is product 2", price: 29.99, image: "https://example.com/image2.jpg" },
    { id: 3, name: "Product 3", description: "This is product 3", price: 39.99, image: "https://example.com/image3.jpg" },
    { id: 4, name: "Product 4", description: "This is product 4", price: 49.99, image: "https://example.com/image4.jpg" },
    { id: 5, name: "Product 5", description: "This is product 5", price: 59.99, image: "https://example.com/image5.jpg" },
]);

  const onAddToCart = (productId, quantity) => {
    const product = products.find(product => product.id === productId);
    const newCartItems = [...cartItems];

    for (let i = 0; i < quantity; i++) {
        newCartItems.push(product);
    }

    setCartItems(newCartItems);
  };

  const onRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (
    <div className={styles.appContainer}>
      <Navbar cartItems={cartItems} className={styles.navbar} />
      <div className={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop products={products} />} />
          <Route path="/product/:id" element={<Product products={products} onAddToCart={onAddToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />} />
          <Route path="/checkout" element={<Checkout setCartItems={setCartItems} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// FIX ROUNDING! 