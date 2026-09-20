import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

/* ================= INIT CART ================= */

const getInitialCart = () => {
  try {
    const saved = localStorage.getItem("cart");

    if (!saved) {
      return { items: [], totalItems: 0, totalPrice: 0 };
    }

    const parsed = JSON.parse(saved);
    const items = parsed.items || [];

    return calculateTotals(items);

  } catch (err) {
    console.error("Cart load error:", err);
    return { items: [], totalItems: 0, totalPrice: 0 };
  }
};

/* ================= CALCULATOR ================= */

const calculateTotals = (items) => ({
  items,
  totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
});

export function CartProvider({ children }) {

  const [cart, setCart] = useState(getInitialCart);

  /* ================= SYNC STORAGE ================= */

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ================= ADD TO CART ================= */

  const addToCart = (product, qty = 1) => {
    if (!product?.id) return;

    setCart((prev) => {
      const existing = prev.items.find((i) => i.id === product.id);

      let updatedItems;

      if (existing) {
        updatedItems = prev.items.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      } else {
        updatedItems = [
          ...prev.items,
          {
            ...product,
            quantity: qty,
          },
        ];
      }

      return calculateTotals(updatedItems);
    });
  };

  /* ================= REMOVE ================= */

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updatedItems = prev.items.filter((i) => i.id !== id);
      return calculateTotals(updatedItems);
    });
  };

  /* ================= UPDATE QTY ================= */

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;

    setCart((prev) => {
      const updatedItems = prev.items.map((i) =>
        i.id === id ? { ...i, quantity: qty } : i
      );

      return calculateTotals(updatedItems);
    });
  };

  /* ================= CLEAR CART ================= */

  const clearCart = () => {
    setCart({ items: [], totalItems: 0, totalPrice: 0 });
    localStorage.removeItem("cart"); // ✅ FIXED
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ================= HOOK ================= */

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};