import { useEffect, useState } from "react";
import { FaBoxOpen, FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";

export default function AdminAddProduct() {
  const [showToast, setShowToast] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    quality: "10A",
    image: "",
  });

  /* 🔹 LOAD PRODUCTS */
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("adminProducts")) || [];
    setProducts(stored);
  }, []);

  const saveToLocal = (data) => {
    localStorage.setItem("adminProducts", JSON.stringify(data));
    setProducts(data);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImagePreview(imgURL);
      setForm({ ...form, image: imgURL });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updated;

    if (editId) {
      updated = products.map((p) =>
        p.id === editId ? { ...p, ...form } : p
      );
    } else {
      updated = [
        ...products,
        { id: Date.now(), ...form },
      ];
    }

    saveToLocal(updated);
    setForm({ name: "", brand: "", price: "", quality: "10A", image: "" });
    setImagePreview(null);
    setEditId(null);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleEdit = (product) => {
    setForm(product);
    setImagePreview(product.image);
    setEditId(product.id);
  };

  const handleDelete = (id) => {
    const filtered = products.filter((p) => p.id !== id);
    saveToLocal(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-20 py-14">
      {showToast && (
        <div className="toast-success">
          <FaCheckCircle /> Saved successfully
        </div>
      )}

      <h1 className="text-4xl font-extrabold text-caviro mb-10">
        Admin Dashboard
      </h1>

      {/* ADD / EDIT FORM */}
      <div className="max-w-2xl bg-white shadow-xl rounded-2xl p-10 mb-14">
        <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
          <FaBoxOpen className="text-caviro" />
          {editId ? "Edit Product" : "Add New Product"}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange}
            placeholder="Product Name" className="admin-input-simple" required />

          <input name="brand" value={form.brand} onChange={handleChange}
            placeholder="Brand" className="admin-input-simple" required />

          <input name="price" type="number" value={form.price}
            onChange={handleChange} placeholder="Price"
            className="admin-input-simple" required />

          <select name="quality" value={form.quality}
            onChange={handleChange} className="admin-input-simple">
            <option value="10A">Premium (10A)</option>
            <option value="7A">Budget (7A)</option>
          </select>

          <label className="image-upload-box">
            📷 Upload product image
            <input type="file" accept="image/*" hidden
              onChange={handleImageChange} />
          </label>

          {imagePreview && (
            <img src={imagePreview} className="h-40 rounded border" />
          )}

          <button className="admin-submit-btn">
            {editId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* PRODUCT LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow p-4">
            <img src={p.image} className="h-40 w-full object-cover rounded" />
            <h3 className="font-semibold mt-2">{p.name}</h3>
            <p className="text-sm text-gray-500">{p.brand}</p>

            <div className="flex justify-between mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="text-blue-600 flex gap-1 items-center"
              >
                <FaEdit /> Edit
              </button>

              <button
                onClick={() => handleDelete(p.id)}
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
