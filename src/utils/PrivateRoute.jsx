import { useEffect } from "react";
import logout from "../Hooks/logout";
import { toast } from "react-toastify";

const PrivateRoute = ({ children, check }) => {
  useEffect(() => {
    fetchData();
  });

  const fetchData = () => {
    try {
      const result = check();
      if (result) {
      } else {
        toast("Token expired");
        logout();
      }
    } catch (error) {
      logout();
    }
  };

  return children;
};

export default PrivateRoute;
