import { useProducts } from "../context/ProductContext";

export default function AdminProducts() {
  const { products, deleteProduct } = useProducts();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="bg-white p-6 rounded-2xl shadow-xl">

            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded-xl mb-4"
            />

            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-500">{product.brand}</p>
            <p className="font-bold mt-2">₹{product.price}</p>

            {product.countInStock < 5 && (
              <p className="text-red-600 font-bold mt-2">
                ⚠ Low Stock
              </p>
            )}

            <button
              onClick={() => deleteProduct(product._id)}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded-xl hover:bg-red-700"
            >
              Delete
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}
