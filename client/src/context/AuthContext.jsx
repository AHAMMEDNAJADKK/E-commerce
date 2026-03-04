import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state
  const navigate = useNavigate();

  /* =========================
     🔄 Load user from localStorage
  ========================== */
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false); // ✅ Stop loading after checking localStorage
  }, []);

  /* =========================
     🔐 LOGIN
  ========================== */
  const login = async (formData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
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

  /* =========================
     📝 REGISTER
  ========================== */
  const register = async (formData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
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

  /* =========================
     🚪 LOGOUT
  ========================== */
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading }} // ✅ loading added here
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);