// src/pages/RegisterPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../Context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate     = useNavigate();

  const [form, setForm]       = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match"); return;
    }
    setError(""); setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/cart", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name",     label: "Full Name",       type: "text",     placeholder: "John Doe" },
    { name: "email",    label: "Email",            type: "email",    placeholder: "you@example.com" },
    { name: "password", label: "Password",         type: "password", placeholder: "Min 8 characters" },
    { name: "confirm",  label: "Confirm Password", type: "password", placeholder: "••••••••" },
  ];

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y:  0 }}
        className="w-full max-w-md bg-stone-900 rounded-2xl p-8 shadow-xl"
      >
        <h1 className="text-2xl font-bold text-amber-400 mb-2">Create account</h1>
        <p className="text-stone-400 text-sm mb-6">Join to place your first order</p>

        {error && (
          <div className="bg-red-900/40 border border-red-600 text-red-300 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <label className="block text-stone-300 text-sm mb-1">{label}</label>
              <input
                type={type} name={name} required
                value={form[name]} onChange={handleChange}
                placeholder={placeholder}
                className="w-full bg-stone-800 text-white rounded-lg px-4 py-2.5
                           border border-stone-700 focus:border-amber-500
                           focus:outline-none focus:ring-1 focus:ring-amber-500 transition"
              />
            </div>
          ))}

          <button
            type="submit" disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50
                       text-stone-950 font-semibold py-2.5 rounded-lg transition"
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-stone-500 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-400 hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}