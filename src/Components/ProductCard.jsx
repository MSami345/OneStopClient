import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigation = useNavigate();

  return (
    <div
      key={product.id}
      className="product-card"
      onClick={() => {
        navigation("/Product/" + product.id);
      }}
    >
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-details">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-price">${product.price}</p>
        {/* <p className="product-description">{product.description}</p> */}
        <div className="product-rating">
          <i className="fas fa-star"></i>
          <span>{product.rating.rate}</span>
          <span>({product.rating.count})</span>
        </div>
        {/* <div className="productCart">
          <p>Add to Cart</p>
          <div>+</div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
