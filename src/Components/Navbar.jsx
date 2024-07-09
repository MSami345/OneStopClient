import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css"; // Import the CSS file
import "@fortawesome/fontawesome-free/css/all.min.css";
import image from "../assets/logoPic.png";
import Logout from "./Logout";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(false);

  const logout = async () => {
    localStorage.removeItem("token");
    // window.location.href = "/login";
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(true);
    }
  }, []);

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="hamburger" onClick={handleToggle}>
          <i className="fas fa-bars"></i>
        </div>
        <div className="logo">
          <Link to="/">
            <img src={image} alt="logo" />
          </Link>
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={handleToggle}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={handleToggle}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={handleToggle}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={handleToggle}>
              Contact
            </Link>
          </li>
        </ul>

        <div className="cart-icon">
          <Link className="cart" to="/cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>

          {token ? (
            <Logout />
          ) : (
            <button className="btnLogin">
              <Link
                style={{ color: "#ffffff" }}
                to="login"
                onClick={() => {
                  if (token) {
                    setToken(false);
                    logout();
                  }
                }}
              >
                {token ? "Logout" : "Login"}
              </Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
