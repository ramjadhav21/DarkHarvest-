import { motion } from "framer-motion";
import { fadeUp } from "./fadeUp";
import { useState } from "react";
import { useCart } from "../Context/CartContext";        // ← fixed path
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import img1 from "../Assets/product1.jpeg";
import img2 from "../Assets/product2.jpeg";
import img3 from "../Assets/product3.jpeg";

const images = [img1, img2, img3];

const product = {
  id: "beard-oil-1",
  name: "RP Beard Oil",
  price: 499,
};

export default function Product() {
  const [qty, setQty] = useState(1);
  const [selectedImg, setSelectedImg] = useState(images[0]);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  /* ── Add to Cart ─────────────────────────────────────── */
  const handleAddToCart = () => {
    addToCart({ ...product, image: selectedImg }, qty);
    toast.success("Added to cart!");
    setQty(1);
  };

  /* ── Buy Now ─────────────────────────────────────────── */
  // Adds to cart then navigates to cart.
  // ProtectedRoute on /cart handles auth — no duplicate order logic needed.
  const handleBuyNow = () => {
    addToCart({ ...product, image: selectedImg }, qty);
    navigate("/cart");
  };

  return (
    <section id="product" className="py-20 bg-white">
      <motion.div
        variants={fadeUp()}                             
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12"
      >

        {/* ── Left: Image Gallery ── */}
        <div>
          <motion.img
            src={selectedImg}
            alt={product.name}
            className="w-full h-[420px] object-contain bg-gray-50 rounded-xl shadow-md mb-4"
            whileHover={{ scale: 1.03 }}
          />

          <div className="flex gap-3">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`View ${i + 1}`}
                onClick={() => setSelectedImg(img)}
                className={`w-20 h-20 object-contain bg-gray-50 rounded-lg cursor-pointer border transition ${
                  selectedImg === img
                    ? "border-black scale-105"
                    : "border-gray-200 hover:scale-105"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Right: Product Info ── */}
        <div className="flex flex-col justify-center">

          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">₹{product.price}</p>

          <p className="text-gray-600 mb-6">
            A rich, earthy blend designed to soften, nourish, and enhance
            your beard with a subtle signature scent.
          </p>

          <div className="text-sm text-gray-500 mb-6 space-y-1">
            <p>✔ In stock</p>
            <p>🚚 Free delivery across India</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center border rounded-full w-fit overflow-hidden mb-6">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQty(Math.max(1, qty - 1))}
              disabled={qty === 1}
              className={`px-4 py-2 text-lg ${
                qty === 1 ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              −
            </motion.button>

            <motion.span
              key={qty}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-5"
            >
              {qty}
            </motion.span>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setQty(qty + 1)}
              className="px-4 py-2 text-lg"
            >
              +
            </motion.button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">

            <button
              onClick={handleBuyNow}                    
              className="bg-black text-white py-3 w-full hover:opacity-80 transition"
            >
              Buy Now
            </button>

            <button
              onClick={handleAddToCart}
              className="border py-3 w-full hover:bg-gray-100 transition"
            >
              Add to Cart
            </button>

          </div>
        </div>

      </motion.div>
    </section>
  );
}