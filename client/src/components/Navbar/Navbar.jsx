import { FaInstagram, FaFacebookF, FaShoppingCart, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full shadow-md">
      {/* TOP BAR */}
      <div className="bg-caviro text-white text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">
          <span>📞 +91 9539691757 | Shipping all over India</span>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-80"><FaInstagram /></a>
            <a href="#" className="hover:opacity-80"><FaFacebookF /></a>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          
          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold text-caviro whitespace-nowrap">
            Wear Caviro
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link to="/" className="hover:text-caviro">Home</Link>
            <Link to="/about" className="hover:text-caviro">About</Link>
            <Link to="/contact" className="hover:text-caviro">Contact</Link>

            <select className="border border-gray-300 rounded px-2 py-1">
              <option>Brands</option>
              <option>Nike</option>
              <option>Adidas</option>
              <option>New Balance</option>
              <option>Jordan</option>
              <option>Vans</option>
              <option>Boots</option>
              <option>Loafer</option>
            </select>

            <Link to="/cart" className="flex items-center gap-1 hover:text-caviro">
              <FaShoppingCart /> Cart
            </Link>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-2xl text-caviro"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <FaBars />
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="flex flex-col px-6 py-4 gap-4 font-medium">
              <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
              <Link to="/cart" onClick={() => setMobileOpen(false)}>Cart</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
