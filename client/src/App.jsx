import Navbar from "./components/Navbar/Navbar.jsx";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/PageWrapper";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";

import AdminDashboard from "./admin/AdminDashboard.jsx";
import AdminAddProduct from "./admin/AdminAddProduct.jsx";
import AdminOrders from "./admin/AdminOrders.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminContactMessages from "./admin/AdminContactMessages.jsx";
import AdminProducts from "./admin/AdminProducts.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import OrderPage from "./pages/OrderPage.jsx";

import Footer from "./components/Footer/Footer.jsx";
import { useAuth } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ============================= */
/* 🔒 ADMIN PROTECTED ROUTE */
/* ============================= */
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return children;
};

/* ============================= */
/* 🔐 USER PROTECTED ROUTE */
/* ============================= */
const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "user") return <Navigate to="/" replace />;

  return children;
};

/* ============================= */
/* 🚫 PREVENT AUTH PAGES IF LOGGED */
/* ============================= */
const AuthRedirect = ({ children }) => {
  const { user } = useAuth();

  if (user?.role === "admin") return <Navigate to="/admin" replace />;
  if (user?.role === "user") return <Navigate to="/" replace />;

  return children;
};

/* ============================= */
/* 🏠 ROLE BASED HOME */
/* ============================= */
const RoleHome = () => {
  const { user } = useAuth();

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Home />;
};

export default function App() {
  const location = useLocation();

  return (
    <>
      <>
        {/* your routes */}
        <ToastContainer position="top-right" autoClose={3000} />
      </>
      <Navbar />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* 🏠 HOME */}
          <Route
            path="/"
            element={
              <PageWrapper>
                <RoleHome />
              </PageWrapper>
            }
          />

          {/* 🌍 PUBLIC ROUTES */}
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

          {/* 🔑 AUTH ROUTES */}
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <PageWrapper>
                  <Login />
                </PageWrapper>
              </AuthRedirect>
            }
          />
          <Route
            path="/register"
            element={
              <AuthRedirect>
                <PageWrapper>
                  <Register />
                </PageWrapper>
              </AuthRedirect>
            }
          />

          {/* 👤 USER ROUTES */}
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
              <UserRoute>
                <PageWrapper>
                  <CheckoutPage />
                </PageWrapper>
              </UserRoute>
            }
          />

          <Route
            path="/payment-success"
            element={
              <UserRoute>
                <PageWrapper>
                  <PaymentSuccess />
                </PageWrapper>
              </UserRoute>
            }
          />

          <Route
            path="/order/:id"
            element={
              <UserRoute>
                <PageWrapper>
                  <OrderPage />
                </PageWrapper>
              </UserRoute>
            }
          />

          {/* 👑 ADMIN ROUTES */}
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
            path="/admin/products"
            element={
              <AdminRoute>
                <PageWrapper>
                  <AdminProducts />
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
            path="/admin/orders"
            element={
              <AdminRoute>
                <PageWrapper>
                  <AdminOrders />
                </PageWrapper>
              </AdminRoute>
            }
          />

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
              <AuthRedirect>
                <PageWrapper>
                  <AdminLogin />
                </PageWrapper>
              </AuthRedirect>
            }
          />

          {/* ❌ FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </>
  );
}
