import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTshirt, faGem, faLaptop, faFemale } from '@fortawesome/free-solid-svg-icons';
import '../Styles/HomePage.css';
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader';

const categoryIcons = {
  "electronics": faLaptop,
  "jewelery": faGem,
  "men's clothing": faTshirt,
  "women's clothing": faFemale,
};

const HomePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return <Loader />;
  }
  

  return (
    <div className="homepage">
      <header className="hero-section">
        <h1>Welcome to Online ShopStore</h1>
        {/* <p style={{padding:"5px"}}>Your one-stop shop for everything you need</p> */}
       
      </header>

      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-container">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <div className="category-icon">
                <FontAwesomeIcon icon={categoryIcons[category]} size="3x" />
              </div>
              <h3 className="category-name">{category}</h3>
            </div>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Link to="/products" className="create-account-btn">
        Shop Products
        </Link>
        </div>
        
        
      </section>

      <div className="AccountSection">
        <p style={{fontSize:"2em",fontWeight:"600"}}>Why to choose us?</p>
      <section className="benefits-section">
          <div className="benefit">
            <FontAwesomeIcon icon={faGem} className="benefit-icon" />
            <h3>Quality Products</h3>
            <p>Discover top-notch products from trusted brands.</p>
          </div>
          <div className="benefit">
            <FontAwesomeIcon icon={faLaptop} className="benefit-icon" />
            <h3>Wide Variety</h3>
            <p>Explore a diverse range of categories to suit your needs.</p>
          </div>
          <div className="benefit">
            <FontAwesomeIcon icon={faFemale} className="benefit-icon" />
            <h3>Stylish Fashion</h3>
            <p>Stay ahead in fashion with our trendy clothing options.</p>
          </div>
        </section>
        <Link to="/register" className="create-account-btn">
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
