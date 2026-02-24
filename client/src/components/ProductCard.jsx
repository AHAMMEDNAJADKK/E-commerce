import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      showToast(
        "Please login or register to add products to cart",
        "error"
      );
      navigate("/login");
      return;
    }

    addToCart(product, false);

    showToast("Product added to cart successfully 🛒", "success");

    navigate("/cart");
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
      <div className="relative">
        <img
          src={
            product.image
              ? `http://localhost:5000${product.image}`   // ✅ FIXED HERE
              : "/placeholder.png"
          }
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />

        <span
          className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full text-white
            ${product.quality === "10A" ? "bg-caviro" : "bg-[#4f7c2f]"}`}
        >
          {product.quality} Quality
        </span>
      </div>

      <h3 className="mt-3 font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.brand}</p>

      <div className="flex justify-between items-center mt-3">
        <span className="font-bold text-caviro">₹{product.price}</span>

        <button
          onClick={handleAddToCart}
          className="bg-caviro text-white px-4 py-1.5 rounded hover:opacity-90 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}