# 🧴 DarkHarvest — RP Beard Oil E-commerce Store

A full-stack e-commerce web application for selling **RP Beard Oil** (₹499) with user authentication, shopping cart, and payment gateway integration ready.

---

## 🌐 Live Demo

> Coming soon after deployment!

---

## 📸 Screenshots

| Home Page | Product | Cart | Checkout |
|-----------|---------|------|----------|
| Hero section with product showcase | Image gallery + buy buttons | Cart with quantity controls | Razorpay payment modal |

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ 
- npm or yarn

### Frontend Setup

```bash
# Navigate to frontend
cd NEw/NEw/Beard_Oil

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Backend Setup

```bash
# Navigate to backend
cd NEw/NEw/Beard_Oil_Backend

# Install dependencies
npm install

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

---

## 🏗 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| Vite 8 | Build Tool & Dev Server |
| Tailwind CSS 4 | Styling |
| Framer Motion | Animations |
| React Router 7 | Client-side Routing |
| React Hot Toast | Notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express 5 | Web Framework |
| JWT | Authentication |
| bcrypt | Password Hashing (planned) |

---

## 📁 Project Structure

```
DarkHarvest/
├── 📄 README.md                    ← You are here
├── 📄 ARCHITECTURE.md              ← Technical architecture & scaling
├── 📄 BRAIN.md                     ← AI-friendly project summary
├── 📄 BUDGET_ESTIMATE.md           ← Cost breakdown for client
├── 📄 CLIENT_GUIDE.md              ← Non-technical client guide
├── 📄 STRUCTURED_BUDGET.md         ← Component-wise budget
├── 📄 ORACLE_FREE_TIER.md          ← Oracle Cloud vs MongoDB comparison
│
├── 📁 NEw/NEw/Beard_Oil/           ← 🎨 FRONTEND (React)
│   ├── src/
│   │   ├── Assets/                 # Product images
│   │   ├── Components/             # UI Components
│   │   │   ├── Cart/CartPage.jsx   # Shopping cart
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── Product.jsx         # Product showcase
│   │   │   ├── ProductDetails.jsx  # Product details
│   │   │   ├── ProtectedRoute.jsx  # Auth guard
│   │   │   ├── Success.jsx         # Order confirmation
│   │   │   └── Footer.jsx          # Footer
│   │   ├── Context/                # State management
│   │   │   ├── AuthContext.jsx     # Authentication state
│   │   │   └── CartContext.jsx     # Shopping cart state
│   │   ├── Pages/                  # Page components
│   │   │   ├── LoginPage.jsx       # Login page
│   │   │   └── RegisterPage.jsx    # Registration page
│   │   ├── App.jsx                 # Main app with routes
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── package.json
│   └── vite.config.js
│
└── 📁 NEw/NEw/Beard_Oil_Backend/   ← ⚙️ BACKEND (Express)
    ├── index.js                    # All API routes
    ├── package.json
    └── package-lock.json
```

---

## 🔗 API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `GET /product` | GET | ❌ | Get product info |
| `POST /register` | POST | ❌ | Register new user |
| `POST /login` | POST | ❌ | Login & get JWT token |
| `GET /me` | GET | ✅ | Get current user |
| `POST /order` | POST | ✅ | Create new order |
| `GET /orders` | GET | ✅ | Get user's orders |

---

## 🔐 Features

- ✅ **User Authentication** — Register & login with JWT
- ✅ **Product Showcase** — Beautiful product page with image gallery
- ✅ **Shopping Cart** — Add/remove items, update quantities
- ✅ **Protected Routes** — Auth required for checkout
- ✅ **Order Placement** — Create orders from cart
- ✅ **Responsive Design** — Works on mobile, tablet, desktop
- ✅ **Smooth Animations** — Framer Motion transitions

---

## ⏳ Coming Soon

- 🔜 **Razorpay Payment Gateway** — UPI, Cards, Net Banking
- 🔜 **MongoDB/Oracle Database** — Persistent data storage
- 🔜 **Email Confirmations** — Order confirmation emails
- 🔜 **Admin Dashboard** — Manage orders & products
- 🔜 **Multi-Product Support** — Add more products
- 🔜 **Deployment** — Vercel + Oracle Cloud hosting

---

## 💰 Budget

| Option | Cost | Monthly |
|--------|------|---------|
| **Minimum (Testing)** | ₹15,000–20,000 | ₹0 |
| **Production (Recommended)** | ₹25,000–35,000 | ₹0 |
| **Premium** | ₹45,000–65,000 | ₹7,500+ |

> See [STRUCTURED_BUDGET.md](STRUCTURED_BUDGET.md) for detailed breakdown

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Connect GitHub repo to Vercel
# Build: npm run build
# Output: dist
```

### Backend (Oracle Cloud Free Tier)
```bash
# Always Free: 2 OCPUs, 12GB RAM, 20GB Database
# See ORACLE_FREE_TIER.md for setup guide
```

---

## 📚 Documentation

| File | For Whom | Description |
|------|----------|-------------|
| [CLIENT_GUIDE.md](CLIENT_GUIDE.md) | Client | Simple non-technical guide |
| [BUDGET_ESTIMATE.md](BUDGET_ESTIMATE.md) | Client | Cost breakdown |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Developers | Technical architecture |
| [BRAIN.md](BRAIN.md) | AI/Developers | Project brain/summary |
| [STRUCTURED_BUDGET.md](STRUCTURED_BUDGET.md) | Everyone | Component-wise costs |
| [ORACLE_FREE_TIER.md](ORACLE_FREE_TIER.md) | Developers | Database hosting options |

---

## 🛠 Development

```bash
# Run frontend
cd NEw/NEw/Beard_Oil && npm run dev

# Run backend
cd NEw/NEw/Beard_Oil_Backend && npm run dev
```

---

## 📝 License

Private — All rights reserved.

---

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For questions or issues, please open a [GitHub Issue](https://github.com/ramjadhav21/DarkHarvest-/issues).

---

**Built with ❤️ for RP Beard Oil**
