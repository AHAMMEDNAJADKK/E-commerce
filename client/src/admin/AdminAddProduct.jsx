import { useState, useEffect } from "react";
import axios from "axios";
import { FaBoxOpen, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminAddProduct() {
  const navigate = useNavigate();
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

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || userInfo.role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!image) {
      alert("Please select image");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    formData.append("image", image);

    try {
      await axios.post(
        "https://caviro-backend.onrender.com/api/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/admin/products");
      }, 1500);

    } catch (error) {
      alert("Unauthorized ❌ Login again");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-14">
      {showToast && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow flex items-center gap-2">
          <FaCheckCircle /> Product saved successfully
        </div>
      )}

      <div className="max-w-2xl bg-white shadow-xl rounded-2xl p-10">
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

          {/* ✅ QUALITY SELECT ADDED */}
          <select
            name="quality"
            value={form.quality}
            onChange={handleChange}
            className="admin-input-simple"
            required
          >
            <option value="10A">10A Quality</option>
            <option value="7A">7A Quality</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
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

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border p-2 rounded"
            required
          />

          <button type="submit" className="admin-submit-btn w-full">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}