import {
  FaInstagram,
  FaFacebookF,
  FaShoppingCart,
  FaBars,
} from "react-icons/fa";
import { NavLink } from "react-router-dom"; 
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      {/* 🔹 MOVING TOP BAR */}
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
          <nav className="hidden md:flex items-center gap-8 font-medium">
           
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link transition ${
                  isActive
                    ? "text-caviro"
                    : "text-gray-700 hover:text-caviro"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link transition ${
                  isActive
                    ? "text-caviro"
                    : "text-gray-700 hover:text-caviro"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `nav-link transition ${
                  isActive
                    ? "text-caviro"
                    : "text-gray-700 hover:text-caviro"
                }`
              }
            >
              Contact
            </NavLink>

            {/* BRANDS */}
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:border-caviro">
              <option>Brands</option>
              <option>Nike</option>
              <option>Adidas</option>
              <option>New Balance</option>
              <option>Jordan</option>
              <option>Vans</option>
              <option>Boots</option>
              <option>Loafer</option>
            </select>

            {/* CART */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `nav-link flex items-center gap-2 transition ${
                  isActive
                    ? "text-caviro"
                    : "text-gray-700 hover:text-caviro"
                }`
              }
            >
              <FaShoppingCart />
              Cart
            </NavLink>
          </nav>

          {/* MOBILE MENU BUTTON */}
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
              <NavLink
                to="/"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "text-caviro" : "text-gray-700"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "text-caviro" : "text-gray-700"
                  }`
                }
              >
                About
              </NavLink>

              <NavLink
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "text-caviro" : "text-gray-700"
                  }`
                }
              >
                Contact
              </NavLink>

              <NavLink
                to="/cart"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "text-caviro" : "text-gray-700"
                  }`
                }
              >
                Cart
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
