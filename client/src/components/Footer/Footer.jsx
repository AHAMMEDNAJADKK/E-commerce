import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#233D00] text-white mt-16">
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
        
        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-extrabold tracking-wide">
            Wear Caviro
          </h2>
          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            Premium sneakers crafted for style, comfort, and confidence.
            Discover authentic footwear designed for everyday excellence.
          </p>

          <div className="flex gap-4 mt-5 text-xl">
            <a href="#" className="hover:text-green-400 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-green-400 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-green-400 transition">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="hover:text-white transition cursor-pointer">Home</li>
            <li className="hover:text-white transition cursor-pointer">About Us</li>
            <li className="hover:text-white transition cursor-pointer">Contact Us</li>
            <li className="hover:text-white transition cursor-pointer">Cart</li>
          </ul>
        </div>

        {/* BRANDS */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Top Brands</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>Nike</li>
            <li>Adidas</li>
            <li>Jordan</li>
            <li>New Balance</li>
            <li>Vans</li>
            <li>Boots & Loafers</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact</h3>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-center gap-3">
              <FaPhoneAlt /> +91 95396 91757
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope /> support@wearcaviro.com
            </li>
            <li>
              🚚 Shipping all over India
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 gap-2">
          <p>
            © {new Date().getFullYear()} Wear Caviro. All rights reserved.
          </p>
          <p>
            Designed & Built with ❤️ for premium footwear
          </p>
        </div>
      </div>
    </footer>
  );
}
