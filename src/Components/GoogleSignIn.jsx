import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const GoogleSignIn = () => {
  const responseMessage = async (response) => {
    const data = await jwtDecode(response.credential);
    console.log( process.env.REACT_APP_API_URL + "/api/google/googleLogin");
    try {
      const apiResponse = await axios.post(
        process.env.REACT_APP_API_URL + "/api/google/googleLogin",
        {
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          profileImage: data.picture,
          clientId: response.clientId,
        },
        { withCredentials: "true" }
      );

      localStorage.setItem(
        "token",
        JSON.stringify({
          token: apiResponse.data.jwtToken,
          id: apiResponse.data.user._id,
          name: apiResponse.data.user.firstName,
        })
      );
      toast.success("Login successful!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to login" + error);
    }
  };
  const errorMessage = (error) => {
    toast.error(error);
    console.log("error is : " + error);
  };

  return <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />;
};

export default GoogleSignIn;
