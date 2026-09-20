# DarkHarvest — RP Beard Oil E-commerce

**Production-ready React + Vite frontend for a single-product beard oil store with cart, authentication, and payment integration ready.**

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development server (port 5173)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

---

## 🏗 Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Framework** | React | 19.2.4 |
| **Build Tool** | Vite | 8.0.4 |
| **Styling** | Tailwind CSS | 4.2.2 |
| **Routing** | React Router DOM | 7.14.2 |
| **Animations** | Framer Motion | 12.38.0 |
| **State** | React Context + localStorage | — |
| **Auth** | JWT (access token in localStorage) | — |
| **Notifications** | React Hot Toast | 2.6.0 |
| **Icons** | Lucide React + React Icons | 1.8.0 / 5.6.0 |

---

## 📁 Project Structure

```
src/
├── Assets/                 # Static images (product photos)
├── Components/
│   ├── Cart/
│   │   └── CartPage.jsx    # Cart UI + checkout flow
│   ├── Navbar.jsx          # Navigation + auth state + cart count
│   ├── Product.jsx         # Hero product section + buy/add-to-cart
│   ├── ProductDetails.jsx  # Accordion-style details sections
│   ├── ProtectedRoute.jsx  # Auth guard for /cart, /success
│   ├── Success.jsx         # Order confirmation page
│   ├── Footer.jsx          # Site footer
│   └── fadeUp.js           # Framer Motion animation variants
├── Context/
│   ├── AuthContext.jsx     # Auth state, login/register/logout, session restore
│   └── CartContext.jsx     # Cart state, localStorage sync, CRUD operations
├── Pages/
│   ├── LoginPage.jsx       # Email/password login
│   └── RegisterPage.jsx    # Name/email/password registration
├── App.jsx                 # Routes + providers + toaster
├── main.jsx                # Entry point
└── index.css               # Tailwind imports + global styles
```

---

## 🔗 Backend API (Separate Repo/Folder)

**Location**: `../Beard_Oil_Backend/`

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/product` | GET | ❌ | Get single product info |
| `/register` | POST | ❌ | Register new user |
| `/login` | POST | ❌ | Login, returns JWT |
| `/me` | GET | ✅ | Get current user from token |
| `/order` | POST | ✅ | Create order from cart items |
| `/orders` | GET | ✅ | List user's orders |

> **Note**: Backend currently uses in-memory storage. **Production requires MongoDB/PostgreSQL migration.**

---

## 🔐 Authentication Flow

```
1. User registers/logs in → Backend returns JWT
2. Token stored in localStorage + AuthContext
3. On app load: AuthContext calls `/me` to restore session
4. Protected routes (/cart, /success) check token validity
5. Logout clears localStorage + context state
```

---

## 🛒 Cart & Checkout Flow

```
1. User adds product → CartContext.addToCart() → localStorage
2. User visits /cart → ProtectedRoute verifies auth
3. User clicks "Checkout" → CartPage.placeOrder()
   → POST /order with JWT + cart items
   → Backend creates order, returns order ID
   → Frontend clears cart → navigates to /success
```

> **⚠️ Payment Gateway Not Yet Integrated** — Currently places order directly. See `ARCHITECTURE.md` for Razorpay integration plan.

---

## 🌍 Environment Variables

Create `.env` in project root:

```env
VITE_API_BASE=http://localhost:5000
```

Production: Set `VITE_API_BASE` to your deployed backend URL.

---

## 📦 Deployment

### Frontend (Vercel / Netlify / Cloudflare Pages)
1. Connect GitHub repo
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add env var: `VITE_API_BASE=https://your-backend.domain.com`

### Backend (Railway / Render / Fly.io)
1. Connect GitHub repo (`Beard_Oil_Backend` folder)
2. Build: `npm install`
3. Start: `node index.js`
4. Add env vars: `JWT_SECRET`, `MONGODB_URI`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
5. Set port: `5000` (or `$PORT`)

---

## 🧪 Testing Checklist

- [ ] Register new user
- [ ] Login / logout persistence
- [ ] Add to cart → quantity update → remove
- [ ] Cart persists across refresh
- [ ] Protected route redirects to login
- [ ] Order placement creates order
- [ ] Success page shows order details
- [ ] Mobile responsive (375px, 768px, 1440px)

---

## 📄 License

Private — All rights reserved.

---

## 📞 Support

For deployment help or payment integration, see `ARCHITECTURE.md` and `BRAIN.md` in the project root.