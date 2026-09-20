import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../Context/CartContext";        // ← fixed path
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import logo from "../Assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart, clearCart } = useCart();                // ← add clearCart
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /* ── Logout handler ─────────────────────────────────── */
  const handleLogout = () => {
    clearCart();        // clear cart
    logout();           // clear auth
    setOpen(false);     // close mobile menu
    navigate("/");      // redirect home
  };

  /* ── Scroll to product ──────────────────────────────── */
  const scrollToProduct = () => {
    const el = document.getElementById("product");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
    }
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">

      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">

        {/* ── Logo ── */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg overflow-hidden shadow-sm flex items-center justify-center">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="font-serif text-lg tracking-wide">Dark Harvest</h1>
            <p className="text-xs text-gray-500">Premium Grooming</p>
          </div>
        </div>

        {/* ── Right Side ── */}
        <div className="flex items-center gap-5">

          {/* Cart Icon */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="hover:scale-110 transition" />
            {cart.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                {cart.totalItems}
              </span>
            )}
          </div>

          {/* Desktop Auth */}
          {user ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-gray-600 max-w-[160px] truncate">
                {user.email}
              </span>
              <button
                onClick={handleLogout}                  
                className="text-sm border px-3 py-1 rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => navigate("/login")}
                className="text-sm border px-4 py-1 rounded hover:bg-black hover:text-white transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="text-sm bg-black text-white px-4 py-1 rounded hover:opacity-80 transition"
              >
                Register
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          {open ? (
            <X className="md:hidden cursor-pointer" onClick={() => setOpen(false)} />
          ) : (
            <Menu className="md:hidden cursor-pointer" onClick={() => setOpen(true)} />
          )}

        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {open && (
        <div className="md:hidden px-6 pb-6 bg-white border-t border-gray-200 space-y-4">

          <button
            onClick={scrollToProduct}
            className="block w-full text-left text-sm hover:text-black transition"
          >
            Home
          </button>

          <button
            onClick={() => { navigate("/cart"); setOpen(false); }}
            className="block w-full text-left text-sm hover:text-black transition"
          >
            Cart ({cart.totalItems})
          </button>

          {/* Mobile Auth */}
          {user ? (
            <>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
              <button
                onClick={handleLogout}                  
                className="text-sm border px-3 py-1 rounded w-full text-left hover:bg-gray-50 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => { navigate("/login"); setOpen(false); }}
                className="text-sm border px-3 py-1 rounded w-full text-left hover:bg-gray-50 transition"
              >
                Login
              </button>
              <button
                onClick={() => { navigate("/register"); setOpen(false); }}
                className="text-sm bg-black text-white px-3 py-1 rounded w-full text-left hover:opacity-80 transition"
              >
                Register
              </button>
            </div>
          )}

        </div>
      )}

    </header>
  );
}