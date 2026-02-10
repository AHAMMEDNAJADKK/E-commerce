import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { ProductFilterProvider } from "./context/ProductFilterContext";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext"; // ✅ ADD THIS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <ProductFilterProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ProductFilterProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);
