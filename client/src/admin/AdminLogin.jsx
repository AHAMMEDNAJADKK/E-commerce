import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-caviro">
          Admin Login
        </h2>

        <input
          placeholder="Username"
          className="admin-input-simple"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="admin-input-simple mt-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="admin-submit-btn mt-6 w-full">
          Login
        </button>
      </form>
    </div>
  );
}
