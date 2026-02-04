import {
  FaInstagram,
  FaFacebookF,
  FaShoppingCart,
  FaBars,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useProductFilter } from "../../context/ProductFilterContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const {
    brandFilter,
    setBrandFilter,
    setSearch,
  } = useProductFilter();

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
      {/* 🔹 TOP MOVING BAR */}
      <div className="bg-caviro text-white overflow-hidden">
        <div className="flex items-center gap-10 whitespace-nowrap px-6 py-2 text-sm animate-[marquee_22s_linear_infinite] hover:[animation-play-state:paused]">
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

      {/* 🔹 MAIN NAVBAR */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* LOGO */}
          <NavLink
            to="/"
            className="text-2xl font-extrabold tracking-wide text-caviro"
          >
            Wear Caviro
          </NavLink>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-6 font-medium">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>

            <NavLink to="/about" className="nav-link">
              About
            </NavLink>

            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>

            {/* 🔍 SEARCH BAR */}
            <input
              type="text"
              placeholder="Search sneakers..."
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-caviro"
            />

            {/* 🔹 BRAND FILTER */}
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-caviro"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand === "ALL" ? "All Brands" : brand}
                </option>
              ))}
            </select>

            {/* 🧾 ORDERS */}
            <NavLink to="/orders" className="nav-link">
              Orders
            </NavLink>

            {/* 🛒 CART */}
            <NavLink to="/cart" className="nav-link flex items-center gap-2">
              <FaShoppingCart />
              Cart
            </NavLink>

            {/* 🔹 ADMIN */}
            <NavLink
              to="/admin"
              className="bg-caviro text-white px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition"
            >
              + Add Product
            </NavLink>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-2xl text-caviro"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <FaBars />
          </button>
        </div>

        {/* 🔹 MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="flex flex-col px-6 py-4 gap-4 font-medium">
              <NavLink to="/" onClick={() => setMobileOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/about" onClick={() => setMobileOpen(false)}>
                About
              </NavLink>
              <NavLink to="/contact" onClick={() => setMobileOpen(false)}>
                Contact
              </NavLink>
              <NavLink to="/orders" onClick={() => setMobileOpen(false)}>
                Orders
              </NavLink>
              <NavLink to="/cart" onClick={() => setMobileOpen(false)}>
                Cart
              </NavLink>
              <NavLink to="/admin" onClick={() => setMobileOpen(false)}>
                Add Product
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
