import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import AuthContext from "./authContext.js";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    if (!token) {
      setUser(null);
      setAuthLoading(false);
      return;
    }

    axiosInstance
      .get("/auth/profile")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("Session initialization failed:", err);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }, [token]);

  const login = (userData, receivedToken) => {
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const authInfo = { user, login, logout, authLoading };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
