import React from "react";
import "../Styles/Loading.css"; // Import the CSS file for loading spinner

const Loader = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
