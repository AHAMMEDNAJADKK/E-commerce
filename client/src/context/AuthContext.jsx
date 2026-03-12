import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const login = async (formData) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/login`,
        formData
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);

      return data;
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      throw error;
    }
  };

  const register = async (formData) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/register`,
        formData
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);

      return data;
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);