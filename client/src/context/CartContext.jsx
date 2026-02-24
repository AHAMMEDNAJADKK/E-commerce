import { createContext, useContext, useState } from "react";
import { useToast } from "./ToastContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { showToast } = useToast();

  // ✅ UPDATED FUNCTION (Toast Optional)
  const addToCart = (product, showMessage = true) => {
    const exists = cartItems.find(
      (item) => item._id === product._id
    );

    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );

      if (showMessage) {
        showToast("Product quantity updated in cart 🛒");
      }
    } else {
      setCartItems([
        ...cartItems,
        { ...product, qty: 1 }
      ]);

      if (showMessage) {
        showToast("Product added to cart successfully 🛍️");
      }
    }
  };

  const removeFromCart = (id) => {
    setCartItems(
      cartItems.filter((item) => item._id !== id)
    );

    showToast("Product removed from cart ❌");
  };

  const updateQty = (id, qty) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id ? { ...item, qty } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);