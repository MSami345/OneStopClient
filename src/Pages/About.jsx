import React, { useEffect, useState } from "react";
import "../Styles/About.css"; // Import your CSS file for About component styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faShoppingBag,
  faTruck,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../Components/Loader";

function About() {
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
    <div className="about-container">
      <div className="about-content">
        <h2>About Our Shopping Website</h2>
        <p>
          Welcome to our online shopping platform, where you can discover a wide
          range of products.
        </p>
        <div className="about-details">
          <div className="detail-item">
            <FontAwesomeIcon icon={faUsers} className="detail-icon" />
            <p>Over 1 million happy customers</p>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faShoppingBag} className="detail-icon" />
            <p>Thousands of products available</p>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faTruck} className="detail-icon" />
            <p>Fast and reliable shipping</p>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faShieldAlt} className="detail-icon" />
            <p>Secure online transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
