import React, { useEffect, useState } from "react";
import useCartStore from "../Hooks/UseCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "../Styles/Cart.css";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header.jsx";
import Loader from "../Components/Loader.jsx";

function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateCartItemQuantity = useCartStore((state) => state.updateCartItem);
  // const addToCart = useCartStore((state) => state.addToCart);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return <Loader/>;
  }
  const handleRemoveFromCart = (itemId, itemName) => {
    removeFromCart(itemId);
    toast.success(`Removed ${itemName} from cart`);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    updateCartItemQuantity(itemId, newQuantity);
    toast.info(
      `Updated quantity for ${
        cartItems.find((item) => item.id === itemId).title
      }`
    );
  };

  return (
    <>
      <Header headerText={"Shopping Cart"} />
      <div className="cart-container">
        {/* <h2 className="cart-title">Shopping Cart</h2> */}
        <ul className="cart-items" >
          {cartItems.length===0 && <p>No Items in the cart</p>}
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-price">${item.price}</p>
                <div className="cart-item-quantity" style={{ padding: "10px" }}>
                  <p>Quantity:</p>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (newQuantity >= 0) {
                        handleQuantityChange(item.id, newQuantity);
                      } else {
                        handleQuantityChange(item.id, 1);
                      }
                    }}
                    min="1"
                  />
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => handleRemoveFromCart(item.id, item.title)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button onClick={() => navigate("/Checkout")}>Checkout</button>
        <ToastContainer
          autoClose={2000}
          style={{ fontSize: "0.8rem" }}
          position="top-right"
        />
      </div>
    </>
  );
}

export default Cart;
