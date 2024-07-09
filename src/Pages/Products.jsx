// src/Pages/Products.js
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "../Styles/Products.css";
import "../Styles/HomePage.css";
import useSWR from "swr";
import fetcher from "../Hooks/UseProducts";
import ProductCard from "../Components/ProductCard";
import Header from "../Components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import {
  faTshirt,
  faGem,
  faLaptop,
  faFemale,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loader from "../Components/Loader";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("electronics");
  const [categories, setCategories] = useState([]);
  const categoryIcons = {
    electronics: faLaptop,
    jewelery: faGem,
    "men's clothing": faTshirt,
    "women's clothing": faFemale,
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const { data, error } = useSWR(
    "https://fakestoreapi.com/products/category/" + selected + "?limit=5",
    fetcher
  );

  useEffect(() => {
    if (data) {
      setProducts(data);
      setLoading(false);
    }
  }, [data]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch products");
      setLoading(false);
    }
  }, [error]);

  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }, []);
  if (load) {
    return <Loader />;
  }

  return (
    <div>
      <Header headerText="Products" />

      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-container">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card"
              style={{
                cursor: "pointer",
                backgroundColor: selected === category && "#ccc",
                padding: "10px",
              }}
              onClick={() => {
                setSelected(category);
                // toast(category);
              }}
            >
              <div className="category-icon">
                <FontAwesomeIcon icon={categoryIcons[category]} size="3x" />
              </div>
              <h3 className="category-name">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search products by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : filteredProducts.length > 0 ? (
        <div className="products-container">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <FontAwesomeIcon icon={faSadTear} size="3x" />
          <p>No Products Available</p>
        </div>
      )}
      <ToastContainer
        autoClose={2000}
        style={{ fontSize: "0.8rem" }}
        // hideProgressBar={"true"}
        position="top-right"
      />
    </div>
  );
};

export default Products;
