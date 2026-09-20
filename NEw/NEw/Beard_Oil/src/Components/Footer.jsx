import { motion } from "framer-motion";
import { fadeUp } from "./fadeUp";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";        // ← add

export default function Footer() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { clearCart } = useCart();                      // ← add

  /* ── Logout handler ─────────────────────────────────── */
  const handleLogout = () => {
    clearCart();       // clear cart first
    logout();          // clear auth token
    navigate("/");     // redirect home
  };

  return (
    <footer className="bg-gray-50 py-20">

      <motion.div
        variants={fadeUp()}                             
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid md:grid-cols-4 gap-10"
      >

        {/* ── Brand ── */}
        <div>
          <h4 className="font-serif text-lg mb-3 tracking-wide">
            RP Beard Oil
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed">
            Premium grooming essentials crafted for the modern gentleman
            who values quality and simplicity.
          </p>
        </div>

        {/* ── Shop ── */}
        <div>
          <h5 className="font-semibold mb-3 tracking-wide">Shop</h5>
          <ul className="space-y-2 text-sm text-gray-500">
            <li
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-black transition"
            >
              Home
            </li>
            <li
              onClick={() => navigate("/cart")}
              className="cursor-pointer hover:text-black transition"
            >
              Cart
            </li>
            <li className="cursor-pointer hover:text-black transition">
              About
            </li>
          </ul>
        </div>

        {/* ── Account ── */}
        <div>
          <h5 className="font-semibold mb-3 tracking-wide">Account</h5>

          {user ? (
            <div className="space-y-2 text-sm text-gray-500">
              <p className="truncate">{user.email}</p>
              <button
                onClick={handleLogout}                  
                className="hover:text-black transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2 text-sm text-gray-500">
              <button
                onClick={() => navigate("/login")}
                className="block hover:text-black transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="block hover:text-black transition"
              >
                Register
              </button>
            </div>
          )}
        </div>

        {/* ── Social ── */}
        <div>
          <h5 className="font-semibold mb-3 tracking-wide">Follow</h5>
          <div className="flex gap-4 text-gray-500 text-lg">
            <FaFacebookF className="cursor-pointer hover:text-black transition" />
            <FaInstagram className="cursor-pointer hover:text-black transition" />
            <FaTwitter className="cursor-pointer hover:text-black transition" />
          </div>
        </div>

      </motion.div>

      {/* ── Bottom Bar ── */}
      <div className="mt-16 border-t border-gray-200 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} RP Beard Oil. All rights reserved.
      </div>

    </footer>
  );
}