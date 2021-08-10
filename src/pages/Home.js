import Image from '../assets/211242.jpg';
import React from 'react';
import styles from '../components/MainHeader.module.css';


const Home = () => {
    return (
        <div className = {styles['main-image']}>
            <img src = {Image} alt = 'My City' />
        </div>
    );
  };
  export default Home;