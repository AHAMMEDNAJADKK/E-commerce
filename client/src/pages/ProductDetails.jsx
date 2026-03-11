import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://caviro-backend.onrender.com/api/products/${id}`
        );
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Please select a size first");
      return;
    }

    addToCart({
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      brand: product.brand,
      size: selectedSize,
      qty: 1,
    });

    navigate("/cart");
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  const sizesArray =
    product.size?.split(",").map((s) => s.trim()) || [];

  return (
    <div className="min-h-screen px-6 md:px-16 py-12 bg-gray-50">
      <div className="grid md:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-xl">
        
        {/* IMAGE */}
        <div>
          <img
            src={`https://caviro-backend.onrender.com${product.image}`}
            alt={product.name}
            className="w-full h-[450px] object-cover rounded-xl"
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

            <p className="text-2xl font-semibold text-caviro mb-6">
              ₹{product.price}
            </p>

            {/* SIZE */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Select Size</h3>

              <div className="flex gap-3 flex-wrap">
                {sizesArray.length > 0 ? (
                  sizesArray.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setError("");
                      }}
                      className={`px-4 py-2 border rounded-lg transition ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500">Contact for sizes</p>
                )}
              </div>

              {error && (
                <p className="text-red-500 mt-2 text-sm">{error}</p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`mt-8 py-3 rounded-xl font-semibold transition ${
              selectedSize
                ? "bg-caviro text-white hover:opacity-90"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}