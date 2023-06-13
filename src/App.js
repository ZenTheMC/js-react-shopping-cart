import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Shop from './pages/shop';
import Navbar from './components/navbar';
import Product from './components/product';
import Cart from './components/cart';
import Checkout from './pages/checkout';
import styles from './styles/app.module.css';
import apple from './images/apple.jpg';
import cake from './images/cake.jpg';
import iceCream from './images/icecream.jpg';
import pizza from './images/pizza.jpg';
import robot from './images/robot.jpg';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const [products] = useState([
    { id: 1, name: "Apple", description: "An apple a day keeps the doctor away!", price: 0.99, image: apple },
    { id: 2, name: "Cake", description: "The cake is a lie!", price: 24.99, image: cake },
    { id: 3, name: "Ice Cream", description: "Ben n Jerry's is over 1000 calories per pint! But it's sooo good..", price: 7.99, image: iceCream },
    { id: 4, name: "Pizza", description: "Papa Johns, Pizza Hut, or Dominos? I like Papa's proportions of sauce, cheese, bread.", price: 17.99, image: pizza },
    { id: 5, name: "Robot", description: "This is my future Robot Assistant that everyone has, that does everything for me, and this is the real price!", price: 499.99, image: robot },
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