import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProductContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`${API_URL}/api/products`);

      console.log("API Response:", data);

      setProducts(data.products || []);

    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);