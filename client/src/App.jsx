import Navbar from "./components/Navbar/Navbar";
import { Routes, Route,Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/contact";
import Cart from "./pages/Cart";
import AdminAddProduct from "./pages/AdminAddProduct.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import Footer from "./components/Footer/Footer";

export default function App() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminAddProduct />} />

        <Route
          path="/admin"
          element={
            isAdmin ? <AdminAddProduct /> : <Navigate to="/admin-login" />
          }
        />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
      <Footer />
    </>
  );
}
