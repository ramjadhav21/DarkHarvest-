# DarkHarvest — System Architecture

**Version**: 1.0  
**Last Updated**: 2026-09-20  
**Status**: Pre-production (local development complete, payment + deployment pending)

---

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CLIENT (Browser)                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     React 19 + Vite SPA                             │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │   │
│  │  │  Product │ │  Cart    │ │  Auth    │ │  Orders  │ │  UI      │  │   │
│  │  │  Page    │ │  Page    │ │  Pages   │ │  History │ │  Components│  │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │   │
│  │  ┌────────────────────────────────────────────────────────────────┐  │   │
│  │  │                    State Management (Context API)             │  │   │
│  │  │  ┌──────────────┐          ┌──────────────┐                  │  │   │
│  │  │  │ AuthContext  │          │ CartContext  │                  │  │   │
│  │  │  │ - user, token│          │ - items[]    │                  │  │   │
│  │  │  │ - login()    │          │ - add/remove │                  │  │   │
│  │  │  │ - register() │          │ - localStorage│                 │  │   │
│  │  │  └──────────────┘          └──────────────┘                  │  │   │
│  │  └────────────────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                         HTTPS / REST + JWT                                │
└────────────────────────────────────┼────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          BACKEND API (Node.js/Express)                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        Express 5 Server                             │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │   │
│  │  │  /product│ │ /register│ │  /login  │ │   /me    │ │  /order  │  │   │
│  │  │   GET    │ │   POST   │ │   POST   │ │   GET    │ │   POST   │  │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘  │   │
│  │  ┌────────────────────────────────────────────────────────────────┐  │   │
│  │  │                      Middleware Stack                          │  │   │
│  │  │  cors() → express.json() → authMiddleware (JWT verify)        │  │   │
│  │  └────────────────────────────────────────────────────────────────┘  │   │
│  │  ┌────────────────────────────────────────────────────────────────┐  │   │
│  │  │                    In-Memory Stores (TEMP)                     │  │   │
│  │  │  ┌─────────────┐  ┌─────────────┐                              │  │   │
│  │  │  │ users[]     │  │ orders[]    │  → REPLACE WITH DATABASE    │  │   │
│  │  │  │ - id, email │  │ - id, userId│                              │  │   │
│  │  │  │ - password  │  │ - items[]   │                              │  │   │
│  │  │  └─────────────┘  │ - total     │                              │  │   │
│  │  │                   │ - status    │                              │  │   │
│  │  │                   └─────────────┘                              │  │   │
│  │  └────────────────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                         MONGODB / POSTGRESQL (Production)                  │
└────────────────────────────────────┼────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        EXTERNAL SERVICES (Production)                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │   Razorpay      │  │   MongoDB       │  │   Email Service │             │
│  │   Payments      │  │   Atlas         │  │   (Resend/      │             │
│  │   - Orders API  │  │   - Users       │  │   SendGrid)     │             │
│  │   - Webhooks    │  │   - Orders      │  │   - Order confirm│             │
│  │   - Refunds     │  │   - Products    │  │   - Password reset│            │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Data Flow: Complete User Journey

### 2.1 First Visit → Purchase

```
User visits site
    │
    ▼
Product Page loads (GET /product) ──→ Shows RP Beard Oil ₹499
    │
    ▼
User selects qty → Clicks "Buy Now"
    │
    ▼
CartContext.addToCart() → localStorage updated
    │
    ▼
Navigate to /cart → ProtectedRoute checks AuthContext
    │
    ├─► Not logged in → Redirect to /login → After login → back to /cart
    │
    ▼
User clicks "Checkout"
    │
    ▼
POST /order (JWT + cart items) → Backend validates token
    │
    ▼
Backend creates order { id, userId, items, total, status: "PLACED" }
    │
    ▼
Returns order → Frontend clears cart → Navigate to /success
    │
    ▼
Success page shows order details from location.state
```

### 2.2 Payment Integration Flow (Planned - Razorpay)

```
User clicks "Checkout" on /cart
    │
    ▼
Frontend: POST /api/payment/create-order { amount: 49900, currency: "INR" }
    │
    ▼
Backend: Razorpay.orders.create() → Returns { id: "order_xyz", amount: 49900 }
    │
    ▼
Frontend: Opens Razorpay Checkout Modal with order_id
    │
    ├─► Payment Success → Razorpay calls onSuccess handler
    │       │
    │       ▼
    │   Frontend: POST /api/payment/verify { razorpay_order_id, razorpay_payment_id, razorpay_signature }
    │       │
    │       ▼
    │   Backend: crypto.verifySignature() → If valid: Update order status = "PAID"
    │       │
    │       ▼
    │   Frontend: clearCart() → navigate("/success", { state: { order } })
    │
    └─► Payment Failed → Razorpay calls onFailure handler
            │
            ▼
        Frontend: toast.error() → User stays on /cart
```

### 2.3 Webhook Flow (Async Confirmation)

```
Razorpay Server → POST /api/payment/webhook { event: "payment.captured", payload: {...} }
    │
    ▼
Backend: Verify webhook signature (HMAC SHA256)
    │
    ▼
If valid: Update order status, send confirmation email, trigger fulfillment
    │
    ▼
Return 200 OK to Razorpay (within 10s)
```

---

## 3. Data Models

> **🔴 CRITICAL WARNING:** Current implementation uses in-memory arrays (`let users = []`, `let orders = []`). All data is LOST when server restarts. MongoDB Atlas (free tier) MUST be added before production.

### 3.1 Current (In-Memory) — DO NOT USE IN PRODUCTION

```javascript
// User
{
  id: Number (Date.now()),
  email: String,
  password: String (plaintext - TEMP, needs bcrypt)
}

// Order
{
  id: Number (Date.now()),
  userId: Number,
  items: Array<{ id, name, price, quantity, image }>,
  total: Number,
  status: "PLACED" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED",
  createdAt: Date
}

// Product (Hardcoded)
{
  id: "beard-oil-1",
  name: "RP Beard Oil",
  price: 499,
  description: "Premium handcrafted beard oil"
}
```

### 3.2 Production (MongoDB Schemas)

```javascript
// User Collection
{
  _id: ObjectId,
  email: String (unique, index),
  passwordHash: String,        // bcrypt
  name: String,
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date
}

// Order Collection
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  items: [{
    productId: String,
    name: String,
    price: Number,           // in INR
    quantity: Number,
    image: String
  }],
  subtotal: Number,
  shipping: Number,          // 0 for free shipping
  total: Number,             // in paise for Razorpay
  status: Enum["PLACED", "PAID", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"],
  payment: {
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    method: String,          // "card", "upi", "netbanking", "wallet"
    paidAt: Date
  },
  shippingAddress: {
    name: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String
  },
  createdAt: Date,
  updatedAt: Date
}

// Product Collection (for future multi-product)
{
  _id: ObjectId,
  slug: String (unique),
  name: String,
  description: String,
  price: Number,             // in INR
  images: [String],
  inventory: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 3.3 Database Options: MongoDB Atlas vs Oracle Cloud (Both Free)

### Option A: MongoDB Atlas Free Tier (Quick Setup)

**Why MongoDB Atlas Free Tier is Perfect for This Project:**

| Feature | Details |
|---------|---------|
| **Cost** | ₹0/month (M0 tier: 512MB storage) |
| **Storage** | 512MB = 10,000+ customer accounts + orders |
| **Backups** | Automatic daily backups (free tier) |
| **Security** | Enterprise-grade encryption |
| **Scaling** | Upgrade to M10 (₹500/mo) if needed later |
| **Setup Time** | 10 minutes |

**Setup Steps:**
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Sign up free (Google/GitHub account)
3. Create free M0 cluster (AWS Mumbai region)
4. Create database user (username + password)
5. Whitelist IP addresses (0.0.0.0/0 for development)
6. Get connection string: `mongodb+srv://user:pass@cluster0.mongodb.net/darkharvest`
7. Add to backend `.env` file: `MONGODB_URI=your_connection_string`

**Code Changes Required:**
```javascript
// Install: npm install mongoose
// Add to index.js:
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Replace let users = [] with User model
// Replace let orders = [] with Order model
```

### 🆕 Option B: Oracle Cloud Always Free Tier (RECOMMENDED — Better Value)

**Why Oracle Cloud is Better for Production:**

| Feature | MongoDB Atlas Free | Oracle Cloud Free ⭐ |
|---------|-------------------|---------------------|
| **Storage** | 512MB | **20GB (40x more!)** |
| **Compute** | ❌ Not included | ✅ **2 OCPUs, 12GB RAM** |
| **Backend Hosting** | ❌ Need separate (₹500/mo) | ✅ **FREE with compute** |
| **Email Service** | ❌ Not included | ✅ **3,000 emails/month** |
| **Load Balancer** | ❌ Not included | ✅ **10 Mbps included** |
| **Data Transfer** | Limited | **10TB/month** |
| **Cost** | ₹0 | **₹0** (better value!) |

**Setup Steps:**
1. Go to [signup.cloud.oracle.com](https://signup.cloud.oracle.com/)
2. Sign up with email + phone + credit card (NOT charged)
3. Choose home region: **Mumbai (ap-mumbai-1)** or **Hyderabad (ap-hyderabad-1)**
4. Go to OCI Console → Oracle Database → Autonomous Database
5. Click "Create Autonomous Database" → Select "Always Free" tier
6. Choose workload type: **Transaction Processing**
7. Set storage: 20GB (default) → Create admin password
8. Wait 2-3 minutes for provisioning
9. Get connection string from database dashboard
10. Add to backend `.env` file

**Code Changes Required (Different from MongoDB):**
```javascript
// Install: npm install oracledb
// Add to index.js:
const oracledb = require('oracledb');

// Create connection pool
await oracledb.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION
});

// Create tables
CREATE TABLE users (
  id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  email VARCHAR2(255) UNIQUE NOT NULL,
  password_hash VARCHAR2(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  user_id NUMBER REFERENCES users(id),
  items CLOB,  -- JSON stored as text
  total NUMBER(10,2),
  status VARCHAR2(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Oracle Free Tier Restrictions:**
- ⚠️ Must create in home region (Mumbai/Hyderabad)
- ⚠️ Credit card required for verification (NOT charged)
- ⚠️ Idle compute reclaimed if unused for 7 days
- ⚠️ ARM instances may show "out of capacity" errors
- ⚠️ 2 databases max (but 20GB each is plenty)

### 🏆 My Recommendation:

| Phase | Use This | Why |
|-------|----------|-----|
| **Testing/MVP** | MongoDB Atlas | Quick 10-minute setup |
| **Production** | **Oracle Cloud Free Tier** | Better value, 40x more storage, compute included |
| **Scaling** | Oracle Cloud Paid | Same infrastructure, just upgrade |

> **💡 KEY INSIGHT:** Oracle Cloud Free Tier saves ₹500-1,500/month on backend hosting + provides 40x more database storage. See `ORACLE_FREE_TIER.md` for complete setup guide.

---

## 4. API Contract

### 4.1 Current Endpoints

| Endpoint | Method | Auth | Request Body | Response |
|----------|--------|------|--------------|----------|
| `/product` | GET | No | — | `{ id, name, price, description }` |
| `/register` | POST | No | `{ email, password }` | `{ message, token, user }` |
| `/login` | POST | No | `{ email, password }` | `{ message, token, user }` |
| `/me` | GET | Yes | — | `{ id, email }` |
| `/order` | POST | Yes | `items[]` | `{ message, order }` |
| `/orders` | GET | Yes | — | `orders[]` |

### 4.2 Production Endpoints (Additions)

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/payment/create-order` | POST | Yes | Create Razorpay order |
| `/api/payment/verify` | POST | Yes | Verify payment signature |
| `/api/payment/webhook` | POST | No (HMAC) | Razorpay webhook handler |
| `/api/orders/:id` | GET | Yes | Get single order details |
| `/api/products` | GET | No | List all products |
| `/api/products/:slug` | GET | No | Get product by slug |
| `/api/auth/forgot-password` | POST | No | Request password reset |
| `/api/auth/reset-password` | POST | No | Reset password with token |

---

## 5. Security Considerations

| Layer | Current | Production Required |
|-------|---------|---------------------|
| **Password Storage** | Plaintext ❌ | bcrypt (cost 12) ✅ |
| **JWT Secret** | Hardcoded ❌ | Env var, 256-bit random ✅ |
| **JWT Expiry** | 1 day | 15min access + 7d refresh token |
| **CORS** | All origins ❌ | Specific frontend domain ✅ |
| **Rate Limiting** | None ❌ | express-rate-limit (100 req/15min) ✅ |
| **Input Validation** | Minimal ❌ | Zod/Joi schemas ✅ |
| **Helmet Headers** | None ❌ | helmet() middleware ✅ |
| **HTTPS** | Local only ❌ | TLS 1.2+ enforced ✅ |
| **Payment Verification** | N/A | Server-side signature verification ✅ |
| **Webhook Security** | N/A | HMAC SHA256 verification ✅ |

---

## 6. Scaling Strategy: From 10 to 100K+ Users

### 6.1 Current Bottlenecks (Single Instance)

```
┌─────────────────────────────────────────────────────────────┐
│  SINGLE SERVER (Current)                                    │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ Express │  │  Users  │  │ Orders  │  │  Cart   │        │
│  │  :5000  │  │  Array  │  │  Array  │  │ (client)│        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘        │
│       │                                                       │
│  • No horizontal scaling                                     │
│  • Memory grows unbounded                                    │
│  • Single point of failure                                   │
│  • No session affinity needed (stateless JWT)               │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Phase 1: 100–1,000 Users (Vertical + Managed Services)

```
┌─────────────────────────────────────────────────────────────┐
│  MANAGED SERVICES                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Vercel      │  │  Railway/    │  │  MongoDB     │      │
│  │  (Frontend)  │  │  Render      │  │  Atlas M10   │      │
│  │  - Edge CDN  │  │  (Backend)   │  │  - 2GB RAM   │      │
│  │  - Auto SSL  │  │  - 2 vCPU    │  │  - Replica   │      │
│  │  - CI/CD     │  │  - 4GB RAM   │  │  - Backups   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                │                │                  │
│         └────────────────┼────────────────┘                  │
│                          ▼                                   │
│                   ┌──────────────┐                           │
│                   │   Razorpay   │                           │
│                   │   (Payments) │                           │
│                   └──────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

**Cost**: ~₹5,000–8,000/mo  
**Changes**: Add DB, env vars, deploy configs — **no code architecture changes**

### 6.3 Phase 2: 1,000–10,000 Users (Horizontal Scaling)

```
┌─────────────────────────────────────────────────────────────┐
│  HORIZONTAL BACKEND + CACHING                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Load        │  │  Backend x N │  │  Redis       │      │
│  │  Balancer    │──│  (Stateless) │──│  (Sessions,  │      │
│  │  (Cloudflare │  │  - JWT auth  │  │  Rate limit, │      │
│  │   / Railway) │  │  - No local  │  │  Cart cache) │      │
│  └──────────────┘  │    state     │  └──────────────┘      │
│         │          └──────┬───────┘         │               │
│         │                 │                 │               │
│         ▼                 ▼                 ▼               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  CDN/Edge    │  │  MongoDB     │  │  Background  │      │
│  │  (Images,    │  │  Atlas M30+  │  │  Jobs        │      │
│  │   Static)    │  │  - Sharding  │  │  (BullMQ/    │      │
│  └──────────────┘  └──────────────┘  │   Workers)   │      │
│                                      └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

**Key Changes**:
- Backend becomes truly stateless (no in-memory anything)
- Redis for: rate limiting, session cache, cart sync across devices
- Background jobs for: email, webhook processing, order fulfillment
- Database connection pooling (mongoose: `maxPoolSize: 10`)

### 6.4 Phase 3: 10,000–100,000+ Users (Microservices-Ready)

```
┌─────────────────────────────────────────────────────────────┐
│  SERVICE DECOUPLING                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │  API     │ │  Auth    │ │  Order   │ │  Payment │       │
│  │  Gateway │ │  Service │ │  Service │ │  Service │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│       │           │            │            │               │
│       ▼           ▼            ▼            ▼               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Message Queue (Kafka/RabbitMQ)           │   │
│  └──────────────────────────────────────────────────────┘   │
│       │           │            │            │               │
│       ▼           ▼            ▼            ▼               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │  User    │ │  Product │ │  Order   │ │  Notif-  │       │
│  │  DB      │ │  DB      │ │  DB      │ │  ication  │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
└─────────────────────────────────────────────────────────────┘
```

**When to consider**:
- Team > 5 developers
- Different scaling needs per domain
- Need independent deployments
- Multi-region deployment

---

## 7. Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **TTFB (API)** | < 200ms | p95 |
| **Page Load (LCP)** | < 2.5s | Core Web Vitals |
| **API Availability** | 99.9% | UptimeRobot |
| **Payment Success Rate** | > 98% | Razorpay dashboard |
| **Error Rate** | < 0.1% | Sentry |

---

## 8. Monitoring & Observability

### 8.1 Required Instrumentation

```javascript
// Backend: Add to Express
const Sentry = require("@sentry/node");
Sentry.init({ dsn: process.env.SENTRY_DSN });

// Custom metrics
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    // Send to Prometheus/DataDog: http_request_duration_seconds{route, method, status}
  });
  next();
});
```

### 8.2 Key Dashboards

1. **Request Rate / Latency / Error Rate (RED)**
2. **Database: Connections, Query Duration, Slow Queries**
3. **Payment: Success/Failure by Method, Webhook Latency**
4. **Business: Orders/Day, Revenue, Conversion Rate**

---

## 9. Disaster Recovery

| Scenario | RTO | RPO | Mitigation |
|----------|-----|-----|------------|
| Backend crash | < 5 min | 0 | Auto-restart (Railway/Render), health checks |
| Database primary down | < 30 sec | < 1 sec | MongoDB Atlas auto-failover (replica set) |
| Region outage | < 1 hr | < 1 hr | Multi-region (Phase 3), DNS failover |
| Data corruption | < 4 hr | < 24 hr | Daily backups + point-in-time recovery |
| Payment webhook loss | N/A | 0 | Idempotent webhook handler + reconciliation job |

---

## 10. CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm run build
      - uses: amondnet/vercel-action@v25
        with: { vercel-token: ${{ secrets.VERCEL_TOKEN }} }
  backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm test
      - uses: railway-actions/deploy@v1
        with: { token: ${{ secrets.RAILWAY_TOKEN }} }
```

---

## 11. Future Extensibility Points

| Feature | Effort | Location |
|---------|--------|----------|
| Multi-product catalog | Low | New Product model + `/api/products` |
| Variants (size, scent) | Medium | Product schema + frontend selectors |
| Subscriptions (auto-reorder) | High | Razorpay Subscriptions + webhook handling |
| Admin dashboard | Medium | New React app + admin API scopes |
| Inventory management | Medium | Product.inventory + order reservation logic |
| Reviews/ratings | Low | New Review collection + API |
| Affiliate/referral | Medium | User.referralCode + order attribution |
| Multi-vendor marketplace | Very High | Full platform rewrite |

---

## 12. Decision Log (ADR)

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-09-20 | React Context over Redux/Zustand | Simple state, no middleware needed, zero deps |
| 2026-09-20 | JWT in localStorage over httpOnly cookie | Simpler for SPA, mobile-friendly, CSRF not an issue with same-site |
| 2026-09-20 | Razorpay over Stripe | Indian market, UPI support, lower TDR, faster settlement |
| 2026-09-20 | MongoDB over PostgreSQL | Flexible schema for product variants, faster initial dev |
| 2026-09-20 | Vercel + Railway over AWS | Zero-config deploy, generous free tiers, auto-scaling |

---

*This document should be updated with every architectural change. See `BRAIN.md` for AI-friendly context summary.*