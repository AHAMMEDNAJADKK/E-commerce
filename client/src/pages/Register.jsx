import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ADMIN_EMAIL = "najadahammed34@gmail.com";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.role === "admin" && form.email !== ADMIN_EMAIL) {
      alert("Only authorized admin allowed");
      return;
    }

    // 🔐 Save user with password
    localStorage.setItem("authUser", JSON.stringify(form));

    login(form);

    navigate(form.role === "admin" ? "/admin" : "/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Register</h2>

      <input
        type="text"
        placeholder="Name"
        required
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        type="email"
        placeholder="Email"
        required
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        required
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <select
        className="border p-2 w-full"
        onChange={(e) =>
          setForm({ ...form, role: e.target.value })
        }
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button className="bg-caviro text-white w-full py-2 rounded">
        Register
      </button>
    </form>
  );
}
