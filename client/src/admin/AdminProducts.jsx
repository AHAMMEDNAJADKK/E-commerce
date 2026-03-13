import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState(null);

  // ✅ NEW DELETE MODAL STATES
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products?page=${page}&keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      setProducts(data.products);
      setPage(data.page);
      setPages(data.pages);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, keyword]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setBrand(product.brand);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("brand", brand);
    if (image) formData.append("image", image);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/products/${editingProduct._id}`,
        formData,
        config,
      );

      toast.success("Product updated successfully");

      setEditingProduct(null);
      setName("");
      setPrice("");
      setBrand("");
      setImage(null);

      fetchProducts();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  // ✅ OPEN MODAL
  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  // ✅ CONFIRM DELETE
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/products/${productToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );

      toast.success("Product deleted successfully");
      setShowDeleteModal(false);
      setProductToDelete(null);
      fetchProducts();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      {/* ================= EDIT FORM ================= */}
      {editingProduct && (
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
          <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              className="border p-3 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Price"
              className="border p-3 rounded-lg"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Brand"
              className="border p-3 rounded-lg"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />

            <input
              type="file"
              className="border p-3 rounded-lg col-span-2"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <div className="col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-3 rounded-lg w-full"
              >
                Update Product
              </button>

              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="bg-gray-400 text-white px-4 py-3 rounded-lg w-full"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

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

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No products found</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Brand</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <img
                      src={`${import.meta.env.VITE_API_URL}${product.image}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>

                  <td className="p-4 font-semibold">{product.name}</td>
                  <td className="p-4 capitalize">{product.brand}</td>
                  <td className="p-4 font-bold">₹{product.price}</td>

                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openDeleteModal(product)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
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

      {/* ✅ DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Confirm Deletion
            </h2>

            <p className="mb-6 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{productToDelete?.name}</span>?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg w-full"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg w-full"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📄 Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(pages).keys()].map((x) => (
          <button
            key={x + 1}
            onClick={() => setPage(x + 1)}
            className={`px-4 py-2 rounded-lg ${
              page === x + 1 ? "bg-black text-white" : "bg-white border"
            }`}
          >
            {x + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
