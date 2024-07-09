import React from 'react';
import '../Styles/Footer.css'; // Import your CSS file for Footer styles

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>&copy; 2024 Your Company</p>
        <div className="social-icons">
          <a href="www.twitter.com" className="icon-link">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="www.facebook.com" className="icon-link">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="www.instagram.com" className="icon-link">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
