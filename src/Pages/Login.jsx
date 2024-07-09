// src/Pages/Login.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Login.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import GoogleSignIn from "../Components/GoogleSignIn";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://one-stop-server.vercel.app/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      // console.log(response.data);
      // const data={token: response.data.jwToken}
      localStorage.setItem(
        "token",
        JSON.stringify({
          token: response.data.jwtToken,
          id: response.data.user._id,
          name: response.data.user.firstName,
        })
      );
      toast.success("Login successful!");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      // console.error(error);
      // console.log(error.response.data.msg);
      toast.error("Login Failed !\n" + error.response.data.msg);
    }
  };

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
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button className="btn" type="submit">
            Login
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>
            Don't Have an account?{" "}
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "blue" }}
            >
              Create one
            </Link>
          </p>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <b>Or</b>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <GoogleSignIn />
        </div>
      </form>

      <ToastContainer
        autoClose={2000}
        style={{ fontSize: "0.8rem" }}
        // hideProgressBar={"true"}
        position="top-right"
      />
    </div>
  );
};

export default Login;
