import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = JSON.parse(
      localStorage.getItem("authUser")
    );

    if (!user) {
      alert("Please register first");
      return;
    }

    login(user);
    navigate(user.role === "admin" ? "/admin" : "/");
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <button
        onClick={handleLogin}
        className="bg-caviro text-white w-full py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}
