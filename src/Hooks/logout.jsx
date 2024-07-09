import axios from "axios";

const logout = async () => {
    console.log("first")
  try {
    const response = await axios.get("https://one-stop-server.vercel.app/api/auth/logout", {
      withCredentials: true,
    });

    if (response.status === 200) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Failed to logout:", error);
  }
};

export default logout;
