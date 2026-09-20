const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "mysecretkey";

/* ================= PRODUCT ================= */

const product = {
  id: "beard-oil-1",
  name: "RP Beard Oil",
  price: 499,
  description: "Premium handcrafted beard oil",
};

app.get("/product", (req, res) => {
  res.json(product);
});

/* ================= AUTH ================= */

// ⚠️ TEMP DB (replace with MongoDB later)
let users = [];

/* REGISTER */
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required",
    });
  }

  const exists = users.find((u) => u.email === email);

  if (exists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const user = {
    id: Date.now(),
    email,
    password,
  };

  users.push(user);

  res.json({
    message: "Registered successfully",
  });
});

/* LOGIN */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  });
});

/* ================= AUTH MIDDLEWARE ================= */

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

/* ================= GET LOGGED USER ================= */
// 🔥 VERY IMPORTANT for frontend auth restore

app.get("/me", authMiddleware, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    id: user.id,
    email: user.email,
  });
});

/* ================= ORDERS ================= */

let orders = [];

/* CREATE ORDER (PROTECTED) */
app.post("/order", authMiddleware, (req, res) => {
  const items = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({
      message: "Cart is empty",
    });
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = {
    id: Date.now(),
    userId: req.user.id,
    items,
    total,
    status: "PLACED",
    createdAt: new Date(),
  };

  orders.push(order);

  res.json({
    message: "Order placed successfully",
    order,
  });
});

/* GET USER ORDERS (PROTECTED) */
app.get("/orders", authMiddleware, (req, res) => {
  const userOrders = orders.filter(
    (o) => o.userId === req.user.id
  );

  res.json(userOrders);
});

/* ================= SERVER ================= */

app.listen(5000, () =>
  console.log("🚀 Server running on http://localhost:5000")
);