import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(
      localStorage.getItem("authUser")
    );

    if (!storedUser) {
      alert("No user found. Please register first.");
      return;
    }

    if (
      storedUser.email !== email ||
      storedUser.password !== password
    ) {
      alert("Invalid email or password");
      return;
    }

    login(storedUser);

    navigate(
      storedUser.role === "admin" ? "/admin" : "/"
    );
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto mt-20 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        required
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        required
        className="border p-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-caviro text-white w-full py-2 rounded">
        Login
      </button>
    </form>
  );
}
