import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { getImageUrl } from "../utils/imageHelper";

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!user) {
      showToast("Please login or register to add products to cart", "error");
      navigate("/login");
      return;
    }

    // Open product details page
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* IMAGE + NAME */}
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className="w-full h-52 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
          />

          <span
            className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full text-white ${
              product.quality === "10A" ? "bg-caviro" : "bg-[#4f7c2f]"
            }`}
          >
            {product.quality} Quality
          </span>
        </div>

        <h3 className="mt-4 font-semibold text-lg hover:text-caviro transition">
          {product.name}
        </h3>
      </Link>

      <p className="text-sm text-gray-500">{product.brand}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="font-bold text-caviro text-lg">
          ₹{product.price}
        </span>

        <button
          onClick={handleAddToCart}
          className="bg-caviro text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
}