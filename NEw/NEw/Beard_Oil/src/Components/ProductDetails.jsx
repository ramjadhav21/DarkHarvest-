import { motion } from "framer-motion";
import { fadeUp } from "./fadeUp";

const sections = [
  {
    title: "Description",
    content:
      "RP Beard Oil is a premium blend crafted to deeply nourish, condition, and strengthen your beard. Designed for daily use, it helps reduce dryness, adds a natural shine, and keeps your beard soft and manageable throughout the day.",
  },
  {
    title: "Ingredients",
    content:
      "Jojoba Oil, Sweet Almond Oil, Coconut Oil, Argan Oil, Vitamin E, and Natural Essential Oils.",
  },
  {
    title: "How to Use",
    content:
      "Take 2–4 drops in your palms, rub gently, and apply evenly through your beard. Massage into the skin beneath for best results. Use daily after showering.",
  },
  {
    title: "Shipping & Delivery",
    content:
      "Orders are processed within 24 hours. Delivery typically takes 3–5 business days across India. Free shipping on all orders.",
  },
  {
    title: "Our Promise",
    content:
      "We stand behind the quality of our products. If you're not satisfied, contact us within 7 days for support.",
  },
];

export default function ProductDetails() {
  return (
    <section className="py-24 border-t bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <motion.h2
          variants={fadeUp(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl font-semibold mb-12 tracking-tight"
        >
          Product Details
        </motion.h2>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12">

          {sections.map((sec, index) => (
            <motion.div
              key={sec.title}
              variants={fadeUp(index * 0.1)} // ✅ stagger animation
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-3"
            >
              <h3 className="text-lg font-medium tracking-tight">
                {sec.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-sm">
                {sec.content}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}