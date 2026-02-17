import { useState, useEffect } from "react";
import axios from "axios";
import { FaBoxOpen, FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";

export default function AdminAddProduct() {
  const [products, setProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    quality: "10A",
    description: "",
    size: "",
    isNewArrival: false,
    isTrending: false,
  });

  /* ---------------- FETCH PRODUCTS ---------------- */
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ---------------- HANDLE INPUT ---------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ---------------- HANDLE SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("brand", form.brand);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("size", form.size);
    formData.append("quality", form.quality);
    formData.append("isNewArrival", form.isNewArrival);
    formData.append("isTrending", form.isTrending);
    formData.append("image", image);

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);

      setForm({
        name: "",
        brand: "",
        price: "",
        quality: "10A",
        description: "",
        size: "",
        isNewArrival: false,
        isTrending: false,
      });

      setImage(null);
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };

  /* ---------------- DELETE PRODUCT ---------------- */
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-14">

      {showToast && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 shadow">
          <FaCheckCircle /> Product saved successfully
        </div>
      )}

      <h1 className="text-4xl font-extrabold text-caviro mb-10">
        Admin Dashboard
      </h1>

      <div className="max-w-2xl bg-white shadow-xl rounded-2xl p-10 mb-16">
        <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
          <FaBoxOpen /> Add New Product
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="admin-input-simple"
            required
          />

          <input
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            className="admin-input-simple"
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="admin-input-simple"
            required
          />

          <textarea
            name="description"
            placeholder="Product description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="admin-input-simple resize-none"
          />

          <input
            name="size"
            placeholder="Available sizes"
            value={form.size}
            onChange={handleChange}
            className="admin-input-simple"
          />

          <div className="flex gap-6">
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="isNewArrival"
                checked={form.isNewArrival}
                onChange={handleChange}
              />
              New Arrival
            </label>

            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                name="isTrending"
                checked={form.isTrending}
                onChange={handleChange}
              />
              Trending
            </label>
          </div>

          {/* IMAGE INPUT */}
          <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-caviro">
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>

          <button className="admin-submit-btn w-full">
            Add Product
          </button>
        </form>
      </div>

      {/* PRODUCT LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-white rounded-xl shadow p-4">
            <img
              src={`http://localhost:5000/${p.image}`}
              className="h-40 w-full object-cover rounded"
              alt={p.name}
            />

            <h3 className="font-semibold mt-2">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.brand}</p>
            <p className="text-xs mt-1 text-gray-600">
              Size: {p.size}
            </p>

            <div className="text-xs mt-1">
              {p.isNewArrival && "🆕 New "}
              {p.isTrending && "🔥 Trending"}
            </div>

            <button
              onClick={() => handleDelete(p._id)}
              className="text-red-600 flex gap-1 items-center mt-3"
            >
              <FaTrash /> Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
