import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/api/products?page=${page}&keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setProducts(data.products);
      setPage(data.page);
      setPages(data.pages);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, keyword]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Manage Products
      </h1>

      {/* 🔍 Search */}
      <div className="flex justify-between mb-6">
        <input
          type="text"
          placeholder="Search product..."
          className="border p-3 rounded-lg w-1/3 shadow-sm"
          value={keyword}
          onChange={(e) => {
            setPage(1);
            setKeyword(e.target.value);
          }}
        />
      </div>

      {/* 📦 Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No products found
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Brand</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    <img
                      src={`http://localhost:5000${product.image}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>

                  <td className="p-4 font-semibold">
                    {product.name}
                  </td>

                  <td className="p-4 capitalize">
                    {product.brand}
                  </td>

                  <td className="p-4 font-bold">
                    ₹{product.price}
                  </td>

                  <td className="p-4">
                    {product.countInStock < 5 ? (
                      <span className="text-red-600 font-semibold">
                        {product.countInStock} (Low)
                      </span>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        {product.countInStock}
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={async () => {
                        if (window.confirm("Delete product?")) {
                          await axios.delete(
                            `http://localhost:5000/api/products/${product._id}`,
                            {
                              headers: {
                                Authorization: `Bearer ${userInfo.token}`,
                              },
                            }
                          );
                          fetchProducts();
                        }
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(pages).keys()].map((x) => (
          <button
            key={x + 1}
            onClick={() => setPage(x + 1)}
            className={`px-4 py-2 rounded-lg ${
              page === x + 1
                ? "bg-black text-white"
                : "bg-white border"
            }`}
          >
            {x + 1}
          </button>
        ))}
      </div>
    </div>
  );
}