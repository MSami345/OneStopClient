import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import Navbar from "./Components/Navbar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import "./App.css";
import ProductDetails from "./Pages/ProductDetails";
import HomePage from "./Pages/HomePage";
import CheckoutPage from "./Pages/CheckoutPage";
import Footer from "./Components/Footer";
import Profile from "./Pages/Profile";
import logout from "./Hooks/logout";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const check = async () => {
    // console.log("first");
    try {
      const userData = await JSON.parse(localStorage.getItem("token"));
      if (!userData) {
        logout();
        return false;
      }
      // Making a GET request
      const response = await fetch(process.env.REACT_APP_API_URL + "/verifyUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        logout();
        return false;
      } else {
        return true;
      }
    } catch (error) {
      logout();
      return false;
    }
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute check={check}>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/Product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
