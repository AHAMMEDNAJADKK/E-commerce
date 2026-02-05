import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ADMIN_EMAIL = "najadahammed34@gmail.com"

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user",
  });

 const handleSubmit = (e) => {
  e.preventDefault();

  if (form.role === "admin" && form.email !== ADMIN_EMAIL) {
    alert("Only authorized admin allowed");
    return;
  }

  localStorage.setItem("authUser", JSON.stringify(form)); // ✅ ADD THIS
  login(form);

  navigate(form.role === "admin" ? "/admin" : "/");
};


  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 space-y-4"
    >
      <h2 className="text-2xl font-bold">Register</h2>

      <input
        placeholder="Name"
        required
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        className="border p-2 w-full"
      />

      <input
        placeholder="Email"
        type="email"
        required
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        className="border p-2 w-full"
      />

      <select
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
        className="border p-2 w-full"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button className="bg-caviro text-white px-4 py-2 rounded w-full">
        Register
      </button>
    </form>
  );
}
