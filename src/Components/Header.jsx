import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Header = ({ headerText }) => {
  const navigate = useNavigate();

  return (
    <header
      style={{
        backgroundColor: "#0a544f",
        color: "white",
        // padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{ position: "absolute", left: "20px", cursor: "pointer" }}
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
      </div>
      <h1 style={{ fontSize: "2em" }}>{headerText}</h1>
    </header>
  );
};

export default Header;
