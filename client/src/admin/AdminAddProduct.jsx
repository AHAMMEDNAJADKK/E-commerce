import { useState } from "react";
import { FaBoxOpen, FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import { useProducts } from "../context/ProductContext";

/* ---------- BASE64 CONVERTER ---------- */
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export default function AdminAddProduct() {
  const { products, addProduct, deleteProduct } = useProducts();

  const [editId, setEditId] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    quality: "10A",
    images: [],
    description: "",
    size: "",
    isNewArrival: false,
    isTrending: false,
  });

  /* ---------- INPUT HANDLER ---------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ---------- IMAGE HANDLER ---------- */
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    const base64Images = await Promise.all(
      files.map((file) => toBase64(file))
    );

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...base64Images],
    }));
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      deleteProduct(editId);
    }

    addProduct({
      id: editId || Date.now(),
      ...form,
      price: Number(form.price),
    });

    setForm({
      name: "",
      brand: "",
      price: "",
      quality: "10A",
      images: [],
      description: "",
      size: "",
      isNewArrival: false,
      isTrending: false,
    });

    setEditId(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  /* ---------- EDIT ---------- */
  const handleEdit = (product) => {
    setForm(product);
    setEditId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-14">

      {/* TOAST */}
      {showToast && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 shadow">
          <FaCheckCircle /> Product saved successfully
        </div>
      )}

      <h1 className="text-4xl font-extrabold text-caviro mb-10">
        Admin Dashboard
      </h1>

      {/* ADD / EDIT FORM */}
      <div className="max-w-2xl bg-white shadow-xl rounded-2xl p-10 mb-16">
        <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
          <FaBoxOpen />
          {editId ? "Edit Product" : "Add New Product"}
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

          <select
            name="quality"
            value={form.quality}
            onChange={handleChange}
            className="admin-input-simple"
          >
            <option value="10A">Premium (10A)</option>
            <option value="7A">Budget (7A)</option>
          </select>

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
            placeholder="Available sizes (eg: S, M, L or 7,8,9)"
            value={form.size}
            onChange={handleChange}
            className="admin-input-simple"
          />

          {/* FLAGS */}
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

          {/* IMAGE UPLOAD */}
          <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-caviro">
            Upload Images
            <input
              type="file"
              multiple
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>

          {/* IMAGE PREVIEW */}
          {form.images.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {form.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="h-28 w-full object-cover rounded"
                />
              ))}
            </div>
          )}

          <button className="admin-submit-btn w-full">
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* PRODUCT LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow p-4">
            <img
              src={p.images?.[0]}
              className="h-40 w-full object-cover rounded"
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

            <div className="flex justify-between mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="text-blue-600 flex gap-1 items-center"
              >
                <FaEdit /> Edit
              </button>

              <button
                onClick={() => deleteProduct(p.id)}
                className="text-red-600 flex gap-1 items-center"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
