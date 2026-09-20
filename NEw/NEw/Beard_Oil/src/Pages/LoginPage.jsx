// src/pages/LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../Context/AuthContext";

export default function LoginPage() {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();
  const from       = location.state?.from?.pathname ?? "/cart";

  const [form, setForm]     = useState({ email: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true }); // go back to where they came from
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y:  0 }}
        className="w-full max-w-md bg-stone-900 rounded-2xl p-8 shadow-xl"
      >
        <h1 className="text-2xl font-bold text-amber-400 mb-2">Welcome back</h1>
        <p className="text-stone-400 text-sm mb-6">Sign in to continue your order</p>

        {error && (
          <div className="bg-red-900/40 border border-red-600 text-red-300 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-stone-300 text-sm mb-1">Email</label>
            <input
              type="email" name="email" required
              value={form.email} onChange={handleChange}
              className="w-full bg-stone-800 text-white rounded-lg px-4 py-2.5
                         border border-stone-700 focus:border-amber-500
                         focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-stone-300 text-sm mb-1">Password</label>
            <input
              type="password" name="password" required
              value={form.password} onChange={handleChange}
              className="w-full bg-stone-800 text-white rounded-lg px-4 py-2.5
                         border border-stone-700 focus:border-amber-500
                         focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50
                       text-stone-950 font-semibold py-2.5 rounded-lg transition"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-stone-500 text-sm mt-6">
          No account?{" "}
          <Link to="/register" className="text-amber-400 hover:underline">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}