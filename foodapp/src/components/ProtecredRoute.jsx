import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constans";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const refreshToken = async () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN);
    if (!refresh) {
      setIsAuthorized(false);
      return;
    }

    try {
      const res = await api.post("token/refresh/", {
        refresh: refresh,
      });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      setIsAuthorized(false);
    }
  };

  const checkAuth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        // Token expired, attempt refresh
        await refreshToken();
      } else {
        // Token valid
        setIsAuthorized(true);
      }
    } catch (err) {
      console.error("Token decoding failed:", err);
      setIsAuthorized(false);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>; 
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
