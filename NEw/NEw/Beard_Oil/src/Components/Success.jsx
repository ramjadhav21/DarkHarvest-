import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  // 🔥 Auto redirect if no order (after refresh)
  useEffect(() => {
    if (!order) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [order, navigate]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center bg-white border border-gray-200 p-10 rounded-2xl shadow-sm"
      >
        {/* ✅ Checkmark */}
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full border border-black text-black text-2xl">
          ✓
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-2 tracking-tight">
          Order Confirmed
        </h1>

        <p className="text-gray-500 mb-8 text-sm">
          Your order has been placed successfully.
          We’ll notify you when it ships.
        </p>

        {/* 🔥 ORDER DATA */}
        {order ? (
          <div className="text-left text-sm mb-8 space-y-3 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID</span>
              <span className="font-medium">{order.id}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Total</span>
              <span className="font-medium">₹{order.total}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className="font-medium">{order.status}</span>
            </div>
          </div>
        ) : (
          <div className="mb-8 text-sm text-gray-400">
            <p>We couldn’t load your order details.</p>
            <p>Redirecting to home...</p>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
        >
          Continue Shopping
        </button>
      </motion.div>
    </section>
  );
}