import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔐 LOGIN
  const login = async (formData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData   // ✅ send directly
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      return data;
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      throw error;
    }
  };

  // 🔐 REGISTER
  const register = async (formData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData   // ✅ send directly
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      return data;
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      throw error;
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);