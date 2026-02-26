import Navbar from "./components/Navbar/Navbar.jsx";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/PageWrapper";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";

import AdminDashboard from "./admin/AdminDashboard";
import AdminAddProduct from "./admin/AdminAddProduct.jsx";
import AdminOrders from "./admin/AdminOrders";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminContactMessages from "./admin/AdminContactMessages.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import OrderPage from "./pages/OrderPage.jsx";

import Footer from "./components/Footer/Footer";
import { useAuth } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop.jsx";

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
  if (user?.role === "admin") return <AdminDashboard />;
  return <Home />;
};

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          {/* 🌐 HOME */}
          <Route
            path="/"
            element={
              <PageWrapper>
                <RoleHome />
              </PageWrapper>
            }
          />

          {/* 🌍 PUBLIC */}
          <Route
            path="/about"
            element={
              <PageWrapper>
                <About />
              </PageWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <PageWrapper>
                <Contact />
              </PageWrapper>
            }
          />
          <Route
            path="/cart"
            element={
              <PageWrapper>
                <Cart />
              </PageWrapper>
            }
          />

          {/* 🔑 AUTH */}
          <Route
            path="/login"
            element={
              <PageWrapper>
                <Login />
              </PageWrapper>
            }
          />
          <Route
            path="/register"
            element={
              <PageWrapper>
                <Register />
              </PageWrapper>
            }
          />

          {/* 🧾 USER */}
          <Route
            path="/orders"
            element={
              <UserRoute>
                <PageWrapper>
                  <Orders />
                </PageWrapper>
              </UserRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <PageWrapper>
                <CheckoutPage />
              </PageWrapper>
            }
          />

          <Route
            path="/payment-success"
            element={
              <PageWrapper>
                <PaymentSuccess />
              </PageWrapper>
            }
          />

          <Route
            path="/order/:id"
            element={
              <PageWrapper>
                <OrderPage />
              </PageWrapper>
            }
          />

          {/* 👑 ADMIN */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <PageWrapper>
                  <AdminDashboard />
                </PageWrapper>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/add-product"
            element={
              <AdminRoute>
                <PageWrapper>
                  <AdminAddProduct />
                </PageWrapper>
              </AdminRoute>
            }
          />

          <Route
            path="/admin-orders"
            element={
              <AdminRoute>
                <PageWrapper>
                  <AdminOrders />
                </PageWrapper>
              </AdminRoute>
            }
          />

          {/* ✅ NEW ADMIN MESSAGES ROUTE */}
          <Route
            path="/admin/messages"
            element={
              <AdminRoute>
                <PageWrapper>
                  <AdminContactMessages />
                </PageWrapper>
              </AdminRoute>
            }
          />

          <Route
            path="/admin-login"
            element={
              <PageWrapper>
                <AdminLogin />
              </PageWrapper>
            }
          />

          {/* ❌ FALLBACK */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
}