import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useProducts } from "../context/ProductContext";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProducts } = useProducts();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quality, setQuality] = useState("10A");
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get("/api/products");
      const product = data.find((p) => p._id === id);

      if (product) {
        setName(product.name);
        setPrice(product.price);
        setQuality(product.quality);
        setIsNewArrival(product.isNewArrival);
        setIsTrending(product.isTrending);
      }
    };

    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quality", quality);
    formData.append("isNewArrival", isNewArrival);
    formData.append("isTrending", isTrending);

    if (image) {
      formData.append("image", image);
    }

    await axios.put(`/api/products/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    await fetchProducts();
    navigate("/");
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="w-full border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
        >
          <option value="10A">10A</option>
          <option value="7A">7A</option>
        </select>

        <div>
          <label>
            <input
              type="checkbox"
              checked={isNewArrival}
              onChange={(e) =>
                setIsNewArrival(e.target.checked)
              }
            />
            New Arrival
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={isTrending}
              onChange={(e) =>
                setIsTrending(e.target.checked)
              }
            />
            Trending
          </label>
        </div>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button className="bg-caviro text-white px-6 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}