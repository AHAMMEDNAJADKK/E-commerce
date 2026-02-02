import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ProductFilterProvider } from "./context/ProductFilterContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <CartProvider>
      <ProductFilterProvider>
      <App />
      </ProductFilterProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
