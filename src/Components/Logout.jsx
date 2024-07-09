import React, { useEffect, useState } from "react";
import Wrapper from "./LogoutWrapper";
import { FaUserCircle, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { LogoutOutlined } from "@mui/icons-material";
// import logout from "../Utils/logout";
import { Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logout from "../Hooks/logout";

const Logout = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [name, setName] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredProfile, setIsHoveredProfile] = useState(false);

  const getUser = async () => {
    const data = localStorage.getItem("token");
    if (data) {
      const parsedData = await JSON.parse(data);
      // console.log(parsedData.name);
      setName(parsedData.name);
    }
  };
  const location = window.location.pathname;
  useEffect(() => {
    getUser();
  }, [location]);

  return (
    <>
      <Wrapper>
        <button className={"logout-btn"}>
          <FaUserCircle />
          {/* <p>{name}</p> */}
          {showLogout ? (
            <FaCaretUp
              cursor={"pointer"}
              onClick={() => setShowLogout(!showLogout)}
            />
          ) : (
            <FaCaretDown
              cursor={"pointer"}
              onClick={() => setShowLogout(!showLogout)}
            />
          )}
        </button>
      </Wrapper>

      <Modal
        open={showLogout}
        footer={null}
        style={{
          position: "absolute",
          right: "20px",
          top: "10vh",
          height: "100px",
        }}
        width={150}
        onCancel={() => setShowLogout(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "5px",
            width: "85%",
            padding: "2px",
            borderRadius: "5px",
            color: "black",
          }}
        >
          <strong>{name}</strong>
          <hr style={{ color: "#ccc" }}></hr>
          <button
            onMouseOver={() => {
              setIsHovered(true);
            }}
            onMouseOut={() => {
              setIsHovered(false);
            }}
            onClick={logout}
            style={{
              padding: "4px",
              borderRadius: "4px",
              background: isHovered ? "lightGrey" : "transparent",
              border: "none",
              cursor: "pointer",
              color: "black",
            }}
          >
            Logout <LogoutOutlined style={{ fontSize: "0.7rem" }} />
          </button>
          <button
            onMouseOver={() => {
              setIsHoveredProfile(true);
            }}
            onMouseOut={() => {
              setIsHoveredProfile(false);
            }}
            onClick={() => {
              navigate("/Profile");
            }}
            style={{
              padding: "4px",
              borderRadius: "4px",
              background: isHoveredProfile ? "lightGrey" : "transparent",
              border: "none",
              cursor: "pointer",
              color: "black",
            }}
          >
            Profile <UserOutlined style={{ fontSize: "0.7rem" }} />
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Logout;
