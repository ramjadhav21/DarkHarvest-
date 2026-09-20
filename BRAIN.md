# BRAIN.md — DarkHarvest Project Brain

**Purpose**: A comprehensive, AI-friendly reference that explains *what this project is*, *how every piece works*, *what each file does*, and *what needs to change to grow*. Any AI or human developer should be able to read this and fully understand the project within 10 minutes.

---

## TL;DR — In One Paragraph

DarkHarvest is a **single-product e-commerce store** selling "RP Beard Oil" (₹499) built as a **React + Vite frontend** paired with a **Node.js/Express backend**. Users can register, log in, add the product to a cart, and place orders. Currently, **no payment gateway is integrated** — orders are placed directly without real money moving. The project needs: a database (replacing in-memory arrays), a payment gateway (Razorpay recommended), and production deployment (Vercel + Railway/Render).

---

## 🧠 What Does This Project Do?

| Feature | Status | Details |
|---------|--------|---------|
| Browse product | ✅ Done | Single product page with images, description, buy/add buttons |
| Add to cart | ✅ Done | Cart persists in localStorage, survives page refresh |
| Quantity control | ✅ Done | +/- buttons, remove button |
| Register | ✅ Done | Email + password, stored in backend memory |
| Login | ✅ Done | JWT token returned, stored in localStorage |
| Protected cart | ✅ Done | Must login before accessing /cart or /success |
| Place order | ✅ Done | POST /order creates an order in backend memory |
| Order success page | ✅ Done | Shows order ID, total, status |
| **Payment** | ❌ Missing | No money moves — this is the biggest gap |
| **Database** | ❌ Missing | Uses JS arrays, data lost on restart |
| **Deployment** | ❌ Missing | Only runs on localhost |

---

## 📂 Every Folder and File Explained

### `DarkHarvest/` (Root)

| Path | Purpose |
|------|---------|
| `BUDGET_ESTIMATE.md` | Full cost breakdown for deploying + adding payments |
| `ARCHITECTURE.md` | Technical architecture diagrams, data models, scaling plan |
| `BRAIN.md` | This file — project brain/summary |
| `NEw/NEw/Beard_Oil/` | **Frontend** (React app) |
| `NEw/NEw/Beard_Oil_Backend/` | **Backend** (Express API) |
| `.expo/` | Expo dev config (legacy, ignore) |
| `NEw/NEw/Beard_Oil/.gitignore` | Git ignore rules |

---

### Frontend: `NEw/NEw/Beard_Oil/src/`

```
src/
├── Assets/              # Product images (product1.jpeg, product2.jpeg, product3.jpeg)
├── Components/
│   ├── Cart/
│   │   └── CartPage.jsx       # Shopping cart UI + "Checkout" button
│   ├── Navbar.jsx           # Top nav: logo, cart icon count, login/logout
│   ├── Product.jsx          # Main product section (image gallery + price + buy buttons)
│   ├── ProductDetails.jsx   # Description, ingredients, shipping info (accordion style)
│   ├── ProtectedRoute.jsx   # Route guard: redirects to login if not authenticated
│   ├── Success.jsx          # Order confirmation page (shows order ID, total)
│   ├── Footer.jsx           # Site footer
│   └── fadeUp.js            # Framer Motion animation helper (reusable)
├── Context/
│   ├── AuthContext.jsx      # GLOBAL auth state: who is logged in, login/logout functions
│   └── CartContext.jsx      # GLOBAL cart state: items, add/remove/update/clear functions
├── Pages/
│   ├── LoginPage.jsx        # Login form → calls AuthContext.login()
│   └── RegisterPage.jsx     # Registration form → calls AuthContext.register()
├── App.jsx                  # ROUTES + providers (ties everything together)
├── main.jsx                 # Entry point: renders <App /> into <div id="root">
└── index.css                # Tailwind CSS imports + global styles
```

**How the frontend works:**
1. `main.jsx` renders `App.jsx`
2. `App.jsx` wraps everything in `AuthProvider` and `CartProvider`
3. `AuthProvider` manages: `user`, `token`, `loading` state
4. `CartProvider` manages: `cart.items[]`, cart CRUD operations, syncs to `localStorage`
5. React Router handles navigation between pages
6. Every page reads state from Context — no prop drilling
7. API calls go to `http://localhost:5000` (backend)

---

### Backend: `NEw/NEw/Beard_Oil_Backend/`

```
Beard_Oil_Backend/
├── index.js               # ONLY FILE — entire server logic
├── package.json           # Dependencies
├── node_modules/          # Installed packages
└── package-lock.json      # Dependency lock file
```

**`index.js` contains everything:**

| Section | Lines | What it does |
|---------|-------|-------------|
| Setup | 1–9 | Imports express, cors, jwt. Creates app. |
| Product | 12–22 | Hardcoded product data. GET `/product` returns it. |
| Users (in-memory) | 25–27 | `let users = []` — replaces with MongoDB in production. |
| Register | 29–58 | `POST /register` — checks if email exists, pushes user to array. |
| Login | 60–88 | `POST /login` — finds user, creates JWT token (secret: `"mysecretkey"`). |
| Auth Middleware | 91–112 | `authMiddleware` — verifies JWT from `Authorization: Bearer <token>` header. |
| Get User | 115–128 | `GET /me` — returns current user from token. |
| Orders (in-memory) | 131–132 | `let orders = []` — stores all orders. |
| Create Order | 134–164 | `POST /order` — protected by auth, creates order from cart items. |
| Get Orders | 166–173 | `GET /orders` — returns orders belonging to current user. |
| Server Start | 176–179 | Listens on port 5000. |

**Critical notes about `index.js`:**
- **Plaintext passwords** — password stored as-is in `users[]` array. MUST use bcrypt in production.
- **Hardcoded JWT secret** — `"mysecretkey"` must be moved to `.env`.
- **In-memory storage** — all data lost when server restarts. MUST use a database.
- **No rate limiting** — anyone can brute-force login attempts.
- **No input validation** — any data type accepted by Express `express.json()`.
- **CORS open** — `app.use(cors())` allows ANY domain. Restrict to frontend URL in production.

---

## 🔄 How Everything Connects (Complete Flow)

### User Registration
```
User fills Register form → clicks "Sign Up"
    │
    ▼
RegisterPage.jsx calls AuthContext.register(email, password)
    │
    ▼
POST http://localhost:5000/register { email, password }
    │
    ▼
Backend: checks users[], creates user, returns { token, user }
    │
    ▼
AuthContext saves token to localStorage + sets user state
```

### Adding Product to Cart
```
User clicks "Add to Cart" on Product.jsx
    │
    ▼
CartContext.addToCart(product, quantity)
    │
    ▼
CartContext checks if item exists in cart[]:
  - If yes: increment quantity
  - If no: add new item with quantity
    │
    ▼
Updates localStorage["cart"] automatically
```

### Checkout (Current — No Payment)
```
User on /cart clicks "Checkout"
    │
    ▼
CartPage.placeOrder() → POST http://localhost:5000/order
    │                        Authorization: Bearer <JWT>
    │                        Body: cart.items[]
    │
    ▼
Backend: validates JWT, creates order { id, userId, items, total, status: "PLACED" }
    │
    ▼
Frontend: clearCart() → navigate("/success")
    │
    ▼
Success.jsx shows order details from location.state.order
```

### Checkout (Planned — With Razorpay)
```
User clicks "Checkout" on /cart
    │
    ▼
POST /api/payment/create-order { amount: 49900 }  (amount in paise)
    │
    ▼
Backend creates Razorpay order → returns { order_id, amount }
    │
    ▼
Frontend opens Razorpay Checkout Modal
    │
    ├─► Success → POST /api/payment/verify → confirm → navigate /success
    │
    └─► Failed → toast.error() → stay on /cart
```

---

## 🔑 Key Concepts to Understand

### JWT Authentication
- **What it is**: A signed token proving "this user is who they say they are"
- **How it works**: Server signs token with secret key → client stores it → sends it with every request → server verifies signature
- **Where stored**: `localStorage` (simple, but vulnerable to XSS)
- **What it protects**: `/me`, `/order`, `/orders` endpoints via `authMiddleware`
- **Weakness**: If someone steals the token from localStorage, they can impersonate the user

### Cart Context Pattern
```javascript
// CartContext provides these functions to ANY component:
{
  cart: { items: [...], totalItems: 5, totalPrice: 2495 },
  addToCart(product, qty),     // Add or increment item
  removeFromCart(id),          // Remove item by id
  updateQuantity(id, qty),     // Change quantity
  clearCart()                  // Empty everything
}
```

### ProtectedRoute Component
```javascript
// Wraps routes that require login
<ProtectedRoute>
  <CartPage />    // Can only see this if logged in
</ProtectedRoute>
// If not logged in → redirects to /login
```

---

## ⚠️ Known Issues / Technical Debt

### 🔴 CRITICAL BLOCKERS (Cannot Go Live Without These)

| Issue | Why It's Critical | Current Code Location | Fix |
|-------|-------------------|----------------------|-----|
| **No Database** | All data lost on server restart — customers, orders, EVERYTHING gone | `let users = []` and `let orders = []` (index.js lines 27, 132) | Add MongoDB Atlas (FREE) or **Oracle Cloud Free Tier (BETTER)** |
| **Plaintext Passwords** | If database is hacked, all customer passwords exposed in plain text | `password: password` (index.js line 50) | Use `bcrypt.hash()` + `bcrypt.compare()` |
| **Hardcoded JWT Secret** | Anyone who reads the code can fake user tokens | `const SECRET = "mysecretkey"` (index.js line 9) | Move to `.env` file |

### 🟠 HIGH PRIORITY (Should Fix Before Launch)

| Issue | Why It Matters | Fix Required |
|-------|---------------|-------------|
| No input validation | Bad data can crash server or cause bugs | Add Zod/Joi schemas |
| No rate limiting | Attackers can brute-force passwords | Add `express-rate-limit` |
| No HTTPS in production | Data sent in plain text — not secure | Force HTTPS via middleware |
| CORS open to any domain | Other websites can call your API | Restrict to frontend domain |

### 🟡 MEDIUM PRIORITY (Can Fix After Launch)

| Issue | Fix Required |
|-------|-------------|
| No image CDN | Add Cloudinary |
| No error tracking | Add Sentry |
| No CI/CD | Add GitHub Actions |
| No email confirmations | Add Resend/SendGrid |

### 🟢 LOW PRIORITY (Future Enhancements)

| Issue | Fix Required |
|-------|-------------|
| Single product only | Add product catalog |
| No admin panel | Add admin dashboard |
| No refund handling | Add refund API endpoint |

---

## 📈 Scaling: What Changes When Traffic Grows

### Current State: ~10 Users
- Everything runs on one machine (localhost)
- In-memory data (lost on restart)
- No caching, no CDN, no load balancer
- Works fine for testing/development

### If Traffic Goes to ~100 Users
**What changes:**
1. Deploy frontend to **Vercel** (free, auto-SSL, CDN)
2. Deploy backend to **Railway** or **Render** (~$5–10/mo)
3. Add **MongoDB Atlas** (~$0–$25/mo depending on tier)
4. Replace `let users = []` and `let orders = []` with MongoDB collections
5. Add `.env` file with secrets
6. **No code architecture changes needed** — just data storage changes

### If Traffic Goes to ~1,000 Users
**New additions:**
1. **Redis** cache — rate limiting, session cache, cart sync
2. **Load balancer** — distribute traffic across multiple backend instances
3. **Connection pooling** — MongoDB `maxPoolSize: 10`
4. **Background workers** — email sending, order processing (BullMQ)
5. **Image CDN** — Cloudinary for product photos
6. **Monitoring** — Sentry (errors), DataDog (metrics)
7. **JWT refresh tokens** — short-lived access tokens + longer refresh tokens

### If Traffic Goes to ~10,000+ Users
**Major architecture changes:**
1. **Microservices** — split into Auth Service, Order Service, Payment Service
2. **Message queue** — Kafka or RabbitMQ for async processing
3. **Database sharding** — MongoDB Atlas sharded cluster
4. **Multi-region deployment** — users served from nearest region
5. **Auto-scaling** — Kubernetes or serverless containers
6. **CDN for everything** — CloudFront or Cloudflare Workers
7. **PCI-DSS compliance** — formal audit for payment handling

### Key Scaling Rules (Summary)
```
✅ Stateless backend = easy to scale horizontally
✅ JWT = no server-side session needed (stateless auth)
✅ localStorage cart = no server-side cart state needed
✅ MongoDB = scales better than SQL for this schema
✅ CDN = reduces origin server load dramatically
✅ Redis = handles rate limiting and caching at scale
❌ In-memory arrays = CANNOT scale (data lost on restart, no multi-instance)
❌ No database = CANNOT scale past one server
```

---

## 🛠️ Technical Decisions & Why

| Decision | Choice | Why | Alternative |
|----------|--------|-----|-------------|
| Frontend framework | React 19 | Most popular, huge ecosystem, good job market | Vue, Svelte, Angular |
| Build tool | Vite | Fast HMR, simple config, modern | Webpack (slower), esbuild (less ecosystem) |
| Styling | Tailwind CSS | Utility-first, fast prototyping, no CSS files | SCSS, CSS Modules |
| Animations | Framer Motion | Declarative, React-native feel | GSAP (more complex) |
| State management | Context API | Simple, zero deps, good enough for small apps | Redux/Zustand (overkill here) |
| Backend runtime | Node.js | Same language as frontend (JS), fast to build | Go, Python (different language) |
| Backend framework | Express 5 | Most popular Node.js framework, huge ecosystem | Fastify, Koa |
| Auth | JWT | Stateless, works well with SPAs | Session cookies (server-side storage) |
| Database (future) | MongoDB Atlas | Flexible schema, free tier, scales horizontally | PostgreSQL (more rigid, but stronger ACID) |
| Payment gateway | Razorpay | Indian market leader, UPI support, fast activation | Stripe (international but slower in India) |
| Frontend hosting | Vercel | Best for React/Vite, free tier, auto-deploy | Netlify, Cloudflare Pages |
| Backend hosting | Railway | Easy Node.js deploy, good free tier | Render, Fly.io, AWS |

---

## 🧪 Testing Strategy

| Test Type | Tool | What to Test |
|-----------|------|-------------|
| **Unit** | Vitest | Individual functions in Context, utility functions |
| **Component** | React Testing Library | Product page, Cart page, Login form |
| **API** | Supertest / Postman | Every endpoint (register, login, order, me) |
| **Integration** | Postman/Newman | Full flow: register → login → add to cart → order → verify |
| **E2E** | Playwright/Cypress | Full user journey from browser |
| **Payment** | Razorpay test cards | Test success, failure, UPI, refunds |

**Razorpay Test Cards:**
- Success: `4111 1111 1111 1111`
- Failure: `4111 1111 1111 1112`
- UPI: `9999999999` (test UPI ID)
- Bank: `5555 5555 5555 4444`

---

## 🔒 Security Checklist for Production

Before going live, ALL of these must be done:

- [ ] Replace plaintext passwords with `bcrypt.hash()` and `bcrypt.compare()`
- [ ] Move `SECRET` to `.env` — never commit to git
- [ ] Add `express-rate-limit` (max 100 requests per 15 minutes per IP)
- [ ] Add `helmet()` middleware for security headers
- [ ] Restrict CORS to production frontend URL only
- [ ] Add `express-validator` or `zod` for all request body validation
- [ ] Force HTTPS redirect in production
- [ ] Set `HttpOnly` + `Secure` cookies if switching from localStorage
- [ ] Verify Razorpay webhook signatures with HMAC SHA256
- [ ] Never expose Razorpay secret key in frontend code
- [ ] Add `.env` to `.gitignore`
- [ ] Set up Sentry for error tracking
- [ ] Enable MongoDB Atlas backups + point-in-time recovery
- [ ] Add input sanitization (prevent NoSQL injection)

---

## 📞 How to Use This File (For AI)

If an AI assistant is working on this project, give it this file and ask it to:

1. **"Add a payment gateway"** → Follow `ARCHITECTURE.md` §2.2 + implement Razorpay
2. **"Deploy to production"** → Follow `BUDGET_ESTIMATE.md` Option 2 + `ARCHITECTURE.md` §10
3. **"Fix the password security"** → Add bcrypt, update `index.js`, update database schema
4. **"Add a second product"** → Create Product document in MongoDB, update `/api/products` endpoint, add UI
5. **"Scale to 1000 users"** → Follow `ARCHITECTURE.md` §6.2 phase
6. **"Write tests"** → Follow `ARCHITECTURE.md` §12 + use Vitest + React Testing Library
7. **"Add an admin dashboard"** → Create new React app + admin-only API endpoints

---

## 🔗 File Locations Summary

| File | Purpose |
|------|---------|
| `BUDGET_ESTIMATE.md` | Full cost breakdown for client |
| `ARCHITECTURE.md` | Technical architecture, diagrams, scaling plan |
| `BRAIN.md` | This file — project brain for any AI/developer |
| `NEw/NEw/Beard_Oil/README.md` | Frontend setup, project structure, tech stack |
| `NEw/NEw/Beard_Oil/` | **All frontend source code** |
| `NEw/NEw/Beard_Oil_Backend/` | **All backend source code** |

---

*Read this file first before touching any code. It contains everything needed to understand and modify this project.*