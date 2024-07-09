import React, { useEffect, useMemo, useState } from "react";
import useCartStore from "../Hooks/UseCart";
import "../Styles/CheckoutPage.css"; // Import CSS file for CheckoutPage styles
import { ToastContainer, toast } from "react-toastify";
import Header from "../Components/Header";
import Loader from "../Components/Loader";

function CheckoutPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const clearCart=useCartStore((state)=>state.clearCart);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const calculateItemTotal = useMemo(() => {
    return (item) => item.quantity * item.price;
  }, []);

  const calculateOrderTotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateItemTotal(item),
      0
    );
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    clearCart();
    toast.success("Order Placed Successfully");
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
    <>
      <Header headerText={"Checkout"} />
      <div className="checkout-page">
        <div className="checkout-cart">
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 && <p>No items in the cart</p>}
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="checkout-cart-item">
                <div className="checkout-cart-item-details">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="checkout-cart-item-image"
                  />
                  <div className="checkout-cart-item-info">
                    <h3 className="checkout-cart-item-title">{item.title}</h3>
                    <p className="checkout-cart-item-price">${item.price}</p>
                    <p className="checkout-cart-item-quantity">
                      Quantity: {item.quantity}
                    </p>
                    <p className="checkout-cart-item-total">
                      Total: ${calculateItemTotal(item)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout-total">
            <h3>Total Order Amount: ${calculateOrderTotal()}</h3>
          </div>
        </div>
        <div
          className="checkout-form"
          style={{ display: cartItems.length === 0 && "none" }}
        >
          <h2>Shipping Details</h2>
          <form onSubmit={handlePlaceOrder}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={shippingDetails.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingDetails.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingDetails.city}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code:</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={shippingDetails.postalCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <button  type="submit" className=" btn">
              Place Order
            </button>
          </form>
        </div>

        <ToastContainer
          autoClose={2000}
          style={{ fontSize: "0.8rem" }}
          position="top-right"
        />
      </div>
    </>
  );
}

export default CheckoutPage;
