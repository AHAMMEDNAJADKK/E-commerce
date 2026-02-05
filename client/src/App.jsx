import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

import AdminAddProduct from "./admin/AdminAddProduct.jsx";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin.jsx";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Footer from "./components/Footer/Footer";
import { useAuth } from "./context/AuthContext";

/* 🔒 ADMIN ROUTE */
const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/" />;

  return children;
};

/* 🔐 USER ROUTE */
const UserRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "user") return <Navigate to="/" />;

  return children;
};

/* 🏠 ROLE-BASED HOME */
const RoleHome = () => {
  const { user } = useAuth();

  if (user?.role === "admin") {
    return <AdminDashboard />;
  }

  return <Home />;
};

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* 🌐 HOME (ROLE BASED) */}
        <Route path="/" element={<RoleHome />} />

        {/* 🌍 PUBLIC */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />

        {/* 🔑 AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🧾 USER ONLY */}
        <Route
          path="/orders"
          element={
            <UserRoute>
              <Orders />
            </UserRoute>
          }
        />

        {/* 👑 ADMIN ONLY */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminAddProduct />
            </AdminRoute>
          }
        />

        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ❌ FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}
