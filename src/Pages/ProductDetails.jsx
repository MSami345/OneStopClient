// src/Pages/ProductDetails.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/ProductDetails.css";
import Header from "../Components/Header";
import useCartStore from "../Hooks/UseCart";
import Loader from "../Components/Loader";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`Added ${item.title} to cart`);
  };

  const { data, error } = useSWR(
    `https://fakestoreapi.com/products/${id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setProduct(data);
    } else if (error) {
      toast.error("Failed to fetch product details");
    }
  }, [data, error]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return <Loader/>;
  }

  if (!product) {
    return <div className="product-details-card">Loading...</div>;
  }

  return (
    <>
      <Header headerText={"Product Details"} />
      <div key={product.id} className="product-details-card">
        <img
          src={product.image}
          alt={product.title}
          className="product-details-image"
        />
        <div className="product-details-info">
          <h2 className="product-details-title">{product.title}</h2>
          <p className="product-details-price">${product.price}</p>
          <p className="product-details-description">{product.description}</p>
          <div className="product-details-rating">
            <i className="fas fa-star"></i>
            <span>{product.rating.rate}</span>
            <span>({product.rating.count} reviews)</span>
          </div>
          <button className=" btn" onClick={() => handleAddToCart(product)}>
            <p>Add to Cart</p>
            <div>+</div>
          </button>
        </div>
      </div>
      <ToastContainer
        autoClose={2000}
        style={{ fontSize: "0.8rem" }}
        // hideProgressBar={"true"}
        position="top-right"
      />
    </>
  );
};

export default ProductDetails;
