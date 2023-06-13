import React from "react";
import homeImage from '../images/home.jpg'; // replace with your image path
import styles from '../styles/home.module.css';

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <h1 className={styles.homeText}>Welcome to the Home Page!</h1>
        </div>
    );
}

export default Home;