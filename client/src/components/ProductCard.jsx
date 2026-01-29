import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <img src={product.image} className="h-48 w-full object-cover rounded" />

      <h3 className="mt-3 font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.brand}</p>

      <div className="flex justify-between mt-3">
        <span className="font-bold text-caviro">₹{product.price}</span>
        <button
          onClick={() => addToCart(product)}
          className="bg-caviro text-white px-3 py-1 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
