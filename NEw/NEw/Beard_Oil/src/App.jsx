import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Product from "./Components/Product";
import ProductDetails from "./Components/ProductDetails";
import CartPage from "./Components/Cart/CartPage";
import Success from "./Components/Success";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";   // ← add

import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";

import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="font-sans bg-white text-gray-900">

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            borderRadius: "8px",
          },
        }}
      />

      <Navbar />

      <Routes>

        {/* 🏠 Public */}
        <Route
          path="/"
          element={
            <>
              <Product />
              <ProductDetails />
            </>
          }
        />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Protected */}
        <Route path="/cart" element={
          <ProtectedRoute><CartPage /></ProtectedRoute>
        } />
        <Route path="/success" element={
          <ProtectedRoute><Success /></ProtectedRoute>
        } />

      </Routes>

      <Footer />

    </div>
  );
}