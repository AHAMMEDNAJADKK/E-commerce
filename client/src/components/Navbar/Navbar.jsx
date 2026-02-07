import {
  FaInstagram,
  FaFacebookF,
  FaShoppingCart,
  FaBars,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useProductFilter } from "../../context/ProductFilterContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";

  const { brandFilter, setBrandFilter, setSearch } =
    useProductFilter();

  const brands = [
    "ALL",
    "Nike",
    "Adidas",
    "Jordan",
    "Vans",
    "Boots",
    "Loafer",
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      {/* 🔹 TOP BAR (USER ONLY) */}
      {!isAdmin && (
        <div className="bg-caviro text-white overflow-hidden">
          <div className="flex items-center gap-10 whitespace-nowrap px-6 py-2 text-sm animate-[marquee_22s_linear_infinite]">
            <span>📞 +91 9539691757</span>
            <span>🚚 Shipping all over India</span>
            <span className="flex items-center gap-2">
              <FaInstagram /> Instagram
            </span>
            <span className="flex items-center gap-2">
              <FaFacebookF /> Facebook
            </span>
          </div>
        </div>
      )}

      {/* 🔹 MAIN NAVBAR */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* LOGO */}
          <NavLink
            to={isAdmin ? "/admin" : "/"}
            className="text-2xl font-extrabold tracking-wide text-caviro"
          >
            Wear Caviro
          </NavLink>

          {/* 🔹 DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-6 font-medium">
            {isAdmin ? (
              <>
                <NavLink to="/admin" className="nav-link">
                  Dashboard
                </NavLink>

                <NavLink
                  to="/admin-orders"
                  className="nav-link"
                >
                  Orders
                </NavLink>

                <NavLink
                  to="/admin/add-product"
                  className="bg-caviro text-white px-5 py-2 rounded-full text-sm font-semibold"
                >
                  + Add Product
                </NavLink>

                <button
                  onClick={logout}
                  className="text-red-600 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>

                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>

                <NavLink
                  to="/contact"
                  className="nav-link"
                >
                  Contact
                </NavLink>

                <input
                  type="text"
                  placeholder="Search sneakers..."
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="border rounded-full px-4 py-1.5 text-sm"
                />

                <select
                  value={brandFilter}
                  onChange={(e) =>
                    setBrandFilter(e.target.value)
                  }
                  className="border rounded-full px-4 py-1.5 text-sm"
                >
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand === "ALL"
                        ? "All Brands"
                        : brand}
                    </option>
                  ))}
                </select>

                {user?.role === "user" && (
                  <NavLink
                    to="/orders"
                    className="nav-link"
                  >
                    Orders
                  </NavLink>
                )}

                <NavLink
                  to="/cart"
                  className="nav-link flex items-center gap-2"
                >
                  <FaShoppingCart />
                  Cart
                </NavLink>

                {!user ? (
                  <>
                    <NavLink to="/login">
                      Login
                    </NavLink>
                    <NavLink to="/register">
                      Register
                    </NavLink>
                  </>
                ) : (
                  <button
                    onClick={logout}
                    className="text-red-600"
                  >
                    Logout
                  </button>
                )}
              </>
            )}
          </nav>

          {/* 🔹 MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-2xl text-caviro"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <FaBars />
          </button>
        </div>

        {/* 🔹 MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden border-t px-6 py-4 space-y-4">
            {isAdmin ? (
              <>
                <NavLink to="/admin">Dashboard</NavLink>
                <NavLink to="/admin-orders">
                  Orders
                </NavLink>
                <NavLink to="/admin/add-product">
                  Add Product
                </NavLink>
                <button
                  onClick={logout}
                  className="text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">
                  Contact
                </NavLink>
                <NavLink to="/cart">Cart</NavLink>

                {!user ? (
                  <>
                    <NavLink to="/login">
                      Login
                    </NavLink>
                    <NavLink to="/register">
                      Register
                    </NavLink>
                  </>
                ) : (
                  <button
                    onClick={logout}
                    className="text-red-600"
                  >
                    Logout
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
