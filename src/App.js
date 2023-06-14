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
    { id: 1, name: "Immortality Fruit", description: "A bio-apple a day keeps the bio-doctor away! The catch phrase of Devil Fruits Inc. The company that created the immortality apple. Who would have thought the forbidden fruit of human innovation would ironically have our signature catchphrase so seamlesly incorporated with it.", price: 0.99, image: apple },
    { id: 2, name: "Pretend Cake", description: "The cake is a lie! They said that in Portal, a game of old. This cake has ZERO calories! That's also another thing they said back in the day... Good thing we already solved bioenergetics and health/fitness is a thing of our ancestors. Instead, take this and pretend that it's better for you than regular cake.", price: 24.99, image: cake },
    { id: 3, name: "Icecream Cone of Flight", description: "The fifth generation of aviation dessert! This beauty has the ability to emulate any flavor that you want as you're eating it, including any combination of, even savory flavors. More importantly, you'll gain the ability to fly for about 4 hours. Buy more and fly more!", price: 7.99, image: iceCream },
    { id: 4, name: "Endless Pizza Pie", description: "This pizza is a wonder! It can infinitely regenerate! That means you can have pizza everyday! Whenever you want, however much you want! All you have to do is stop wanting more and it'll stop replenishing. Pretty neat right? You don't even need to buy more than 1, even though we already cured poverty and hunger a long time ago.", price: 17.99, image: pizza },
    { id: 5, name: "Omni-Assistant Robo", description: "The ultimate artificial assistant! Want someone to work for you? Want someone to cook for you? Clean? Game with? Robo can do anything! Just tell Robo what you want, and Robo will get it done! Just ask for good things, or the all-seeing-eye will turn him on you.", price: 99.99, image: robot },
  ]);

  const onAddToCart = (productId, quantity) => {
    const product = products.find(product => product.id === productId);
    const existingProductInCart = cartItems.find(item => item.id === productId);

    if (existingProductInCart) {
      // If the product is already in the cart, update its quantity
      setCartItems(cartItems.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      // If the product is not in the cart, add it with the specified quantity
      setCartItems([...cartItems, { ...product, quantity }]);
    }
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
          <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} setCartItems={setCartItems} />} />
          <Route path="/checkout" element={<Checkout setCartItems={setCartItems} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;