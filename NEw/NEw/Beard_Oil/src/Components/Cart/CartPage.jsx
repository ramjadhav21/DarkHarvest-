import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  /* ── Place Order ─────────────────────────────────────────── */
  const placeOrder = async () => {
    if (cart.items.length === 0 || loading) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cart.items),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Order failed");
        return;
      }

      clearCart();
      navigate("/success", { state: { order: data.order } });

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Empty State ─────────────────────────────────────────── */
  if (cart.items.length === 0) {
    return (
      <section className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
        <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="text-black underline hover:opacity-70 transition"
        >
          Continue shopping
        </button>
      </section>
    );
  }

  /* ── Cart ────────────────────────────────────────────────── */
  return (
    <section className="min-h-screen bg-white text-black px-6 py-16">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-semibold mb-10">Your Cart</h2>

        <div className="grid md:grid-cols-3 gap-10">

          {/* ── LEFT: Items ── */}
          <div className="md:col-span-2 space-y-8">
            {cart.items.map((item) => (
              <div key={item.id} className="flex gap-6 border-b pb-6">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-gray-500">₹{item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-3 py-1 border rounded hover:bg-gray-100 transition"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 border rounded hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500 mt-3 hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                </div>

                <div className="font-semibold">
                  ₹{item.price * item.quantity}
                </div>

              </div>
            ))}
          </div>

          {/* ── RIGHT: Summary ── */}
          <div className="border rounded-xl p-6 h-fit shadow-sm">

            <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

            <div className="flex justify-between mb-3 text-gray-600">
              <span>Items</span>
              <span>{cart.totalItems}</span>
            </div>

            <div className="flex justify-between mb-3 text-gray-600">
              <span>Subtotal</span>
              <span>₹{cart.totalPrice}</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{cart.totalPrice}</span>
            </div>

            <button
              onClick={placeOrder}
              disabled={loading}
              className="w-full bg-black text-white py-3 mt-6 rounded-lg
                         hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Placing Order…" : "Checkout"}
            </button>

            <button
              onClick={clearCart}
              disabled={loading}
              className="w-full border py-3 mt-3 rounded-lg
                         hover:bg-gray-50 transition disabled:opacity-50"
            >
              Clear Cart
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}