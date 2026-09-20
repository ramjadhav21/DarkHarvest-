# 🛒 DarkHarvest — Simple Client Guide (Non-Technical)

**For small business owners who just want to sell their beard oil online.**

---

## 📌 What is DarkHarvest?

DarkHarvest is an **online store** for selling **RP Beard Oil** (₹499 per bottle).

Think of it like your own small shop on the internet — but instead of a physical store, people visit your website, see your product, add it to their cart, and pay online.

---

## 🔧 How It Works (Simple Version)

```
Step 1: Customer visits your website
            ↓
Step 2: Sees your RP Beard Oil product (photo, price, description)
            ↓
Step 3: Clicks "Buy Now" or "Add to Cart"
            ↓
Step 4: Creates an account (name + email + password)
            ↓
Step 5: Goes to cart → clicks "Checkout"
            ↓
Step 6: Pays online (UPI, Card, Net Banking)
            ↓
Step 7: Gets "Order Confirmed" message
            ↓
Step 8: You receive the order → ship the product → done! ✅
```

**That's it! Simple e-commerce — like Amazon, but just for your beard oil.**

---

## 💰 What You Pay (Budget Breakdown)

### One-Time Setup Cost

| Item | Price | What It Is |
|------|-------|------------|
| **Developer Fee** | **₹15,000–25,000** | Someone builds your website + payment system |
| Domain Name | ₹800–1,500/year | Your website address (like www.rpbeardoil.com) |
| **Total One-Time** | **₹16,000–27,000** | |

### Monthly Running Cost

| Item | Price | What It Is |
|------|-------|------------|
| Website Hosting | ₹0–500/mo | Where your website lives online |
| Payment Gateway | ₹0 setup, 2% per sale | Razorpay takes ₹2 per ₹100 you earn |
| **Total Monthly** | **₹0–500** | Almost free to run! |

### Example: You Sell 50 Bottles/Month

```
Revenue:           50 × ₹499  = ₹24,950
Payment Gateway:   2% of ₹24,950 = ₹499
Hosting:           ~₹200
─────────────────────────────────────
Net Profit:        ₹24,251/month ✅
```

---

## 📱 What Your Website Looks Like

### Home Page
```
┌─────────────────────────────────────────┐
│  🧴 DarkHarvest        [🛒 Cart] [👤]  │
│─────────────────────────────────────────│
│                                         │
│    ┌─────────────────────────────┐      │
│    │                             │      │
│    │    [Beard Oil Photo]        │      │
│    │                             │      │
│    └─────────────────────────────┘      │
│    [Photo 1] [Photo 2] [Photo 3]       │
│                                         │
│    RP Beard Oil                        │
│    ₹499                                │
│                                         │
│    A rich, earthy blend designed to     │
│    soften, nourish, and enhance your   │
│    beard...                            │
│                                         │
│    ✔ In stock                           │
│    🚚 Free delivery across India       │
│                                         │
│    Quantity: [− 1 +]                   │
│                                         │
│    ┌─────────────────────────────────┐  │
│    │         Buy Now                 │  │
│    └─────────────────────────────────┘  │
│    ┌─────────────────────────────────┐  │
│    │       Add to Cart               │  │
│    └─────────────────────────────────┘  │
│                                         │
│─────────────────────────────────────────│
│  📦 Product Details                     │
│  🧪 Ingredients                        │
│  📋 How to Use                         │
│  🚚 Shipping & Delivery                │
│                                         │
│─────────────────────────────────────────│
│  Footer: © DarkHarvest 2026            │
└─────────────────────────────────────────┘
```

### Cart Page
```
┌─────────────────────────────────────────┐
│  Your Cart                              │
│─────────────────────────────────────────│
│  [Oil Photo] RP Beard Oil    ₹499      │
│              Qty: [− 1 +]   ₹499      │
│              [Remove]                   │
│─────────────────────────────────────────│
│  Order Summary                         │
│  Items: 1                               │
│  Subtotal: ₹499                        │
│  Shipping: FREE                        │
│  ─────────────────────────────         │
│  Total: ₹499                           │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │        Checkout →               │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Payment (Razorpay Popup)
```
┌─────────────────────────────────────────┐
│  Pay ₹499                              │
│─────────────────────────────────────────│
│  [Credit Card] [UPI] [Net Banking]     │
│                                         │
│  Card Number: [                    ]   │
│  Expiry:      [MM/YY]                  │
│  CVV:         [***]                    │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │       Pay ₹499                  │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## ⚠️ What's Missing Right Now (What Needs to Be Built)

### 🔴 CRITICAL: Database is Missing!

**Current Problem:**
Right now, your website stores customer accounts and orders in "memory" — think of it like writing orders on a piece of paper that gets thrown away every time you close the shop. 

**If the server restarts (which happens regularly):**
- ❌ ALL customer accounts = GONE
- ❌ ALL orders = GONE  
- ❌ EVERYTHING starts from scratch

**This is like running a shop without any record book — impossible for real business!**

**Solution:** Add MongoDB (a proper database) — this permanently stores:
- Customer accounts (name, email, encrypted password)
- All orders (who ordered what, when, payment status)
- Product information

**MongoDB Atlas Free Tier:** ₹0/month for up to 512MB storage (enough for thousands of orders)

### Why MongoDB Atlas Free Tier is Perfect for You:
- ✅ **₹0/month cost** — completely free for your small business
- ✅ **512MB storage** — can store 10,000+ customer accounts and orders
- ✅ **Automatic backups** — data never lost
- ✅ **Secure** — enterprise-grade security
- ✅ **Scales later** — if you grow, just upgrade plan (₹500–2,000/mo)
- ✅ **No maintenance** — MongoDB manages everything

### 🆕 Better Alternative: Oracle Cloud Free Tier (RECOMMENDED)

| Feature | MongoDB Atlas Free | Oracle Cloud Free ⭐ |
|---------|-------------------|---------------------|
| **Storage** | 512MB | **20GB (40x more!)** |
| **Database** | NoSQL only | SQL + JSON support |
| **Compute** | ❌ Not included | ✅ **2 OCPUs, 12GB RAM** |
| **Backend Hosting** | ❌ Need separate (₹500/mo) | ✅ **FREE with compute** |
| **Email Service** | ❌ Not included | ✅ **3,000 emails/month** |
| **Load Balancer** | ❌ Not included | ✅ **10 Mbps included** |
| **Data Transfer** | Limited | **10TB/month** |
| **Cost** | ₹0 | **₹0** (better value!) |

**Oracle Cloud Free Tier is BETTER because:**
- ✅ You get **20GB storage** (vs 512MB) — enough for 200,000+ orders
- ✅ You get **free compute** to host your backend (saves ₹500-1,500/month!)
- ✅ You get **email service** for order confirmations
- ✅ You get **load balancer** for future scaling
- ✅ **Total savings: ₹6,000-18,000/year!**

**Setup takes 30-60 minutes** (vs 10 minutes for MongoDB Atlas) — see `ORACLE_FREE_TIER.md` for step-by-step guide.

### My Recommendation:

| Phase | Use This | Why |
|-------|----------|-----|
| **Testing/MVP** | MongoDB Atlas | Quick 10-minute setup |
| **Production** | **Oracle Cloud Free Tier** | Better value, 40x more storage, compute included |

| What's Missing | Why It's Important | Cost to Add |
|----------------|-------------------|-------------|
| **Database** | All data lost on restart — CRITICAL! | ₹0 (free tier) to ₹500/mo |
| **Payment Gateway** | Customers can't pay online yet | ₹0 setup + 2% per sale |
| **Deployment** | Website only works on developer's laptop | ₹0–500/mo |
| **Password Encryption** | Current passwords stored as plain text — SECURITY RISK! | ₹0 (included in dev) |
| **Email Confirmation** | Customer doesn't get order email | ₹0–500/mo |

**Total to make it production-ready: ₹15,000–25,000 (one-time) + ₹500/mo**

---

### 🔴 CRITICAL: Password Security Issue!

**Current Problem:**
Right now, passwords are stored exactly as customers type them — like writing passwords on a sticky note. If anyone hacks your database, they see ALL passwords in plain text.

**What we need to add:** bcrypt encryption — passwords get scrambled so even if someone steals the database, they can't read the passwords.

**This is a MUST-FIX before going live.**

---

## 🎯 Your Options (Choose One)

### Option 1: Cheapest (₹15,000–18,000)
- ✅ Deploy website on free hosting (Vercel)
- ✅ Backend on free tier (Render)
- ✅ Razorpay payments (₹0 setup)
- ✅ Free database (MongoDB Atlas free)
- ✅ Domain name (₹800–1,500)
- ❌ No email confirmations
- ❌ No admin panel
- ❌ Basic design only

### Option 2: Recommended (₹25,000–35,000) ⭐
- Everything in Option 1, PLUS:
- ✅ Email order confirmations
- ✅ Better hosting (faster website)
- ✅ Admin dashboard (view orders)
- ✅ 1 month free support
- ✅ SSL certificate (secure 🔒)

### Option 3: Full Setup (₹45,000–65,000)
- Everything in Option 2, PLUS:
- ✅ Multiple products
- ✅ Customer reviews
- ✅ Coupon/discount system
- ✅ 3 months free support
- ✅ Performance optimization

---

## 📋 What I Need From You to Start

| Item | What It Is | Priority |
|------|------------|----------|
| **Domain Name** | Your website URL (e.g., rpbeardoil.com) | 🔴 Must |
| **Product Photos** | 3–5 good photos of your beard oil | 🔴 Must |
| **Razorpay Account** | Sign up at razorpay.com (takes 10 mins) | 🔴 Must |
| **PAN Card** | For Razorpay verification | 🔴 Must |
| **Bank Account** | For receiving payments | 🔴 Must |
| **GST Number** | For invoicing (optional if small) | 🟡 Nice to have |
| **Logo** | Your brand logo | 🟡 Nice to have |
| **About Us Text** | Short story about your brand | 🟢 Optional |

---

## 🛡️ Is It Safe?

**Yes!** Here's what keeps your store secure:

- **SSL Certificate** — The 🔒 lock icon in browser, encrypts all data
- **Razorpay** — PCI-DSS compliant, your money is safe
- **JWT Authentication** — Customer passwords are encrypted
- **HTTPS Only** — All data sent over secure connection
- **No Card Storage** — Razorpay handles all card details, you never see them

---

## ❓ Common Questions

**Q: Do I need to know coding?**
> No! Once built, you just manage your orders and check sales.

**Q: What if I want to add more products later?**
> That's a small update (~₹3,000–5,000 extra).

**Q: What if I get a refund request?**
> Razorpay handles refunds — you just approve them from your dashboard.

**Q: Can I accept international orders?**
> Yes! Razorpay supports international cards (extra 3% fee).

**Q: How do I get my money?**
> Razorpay transfers to your bank account every T+2 days (2 days after sale).

**Q: What if my website goes down?**
> Free hosting has 99.9% uptime. If issues, contact your developer.

---

## 🚀 Timeline

| Phase | Time | What Happens |
|-------|------|-------------|
| Day 1–2 | Setup | Domain, hosting, database configured |
| Day 3–5 | Backend | Payment system integrated |
| Day 6–8 | Frontend | Checkout with Razorpay live |
| Day 9–10 | Testing | Everything tested, ready to launch |
| **Total** | **~2 weeks** | **You're selling online!** |

---

## 💬 Summary

> **For a small beard oil business with a small budget:**
> 
> - Spend **₹15,000–25,000** once to build the website
> - Pay **₹0–500/month** to keep it running
> - Pay **2% per sale** to Razorpay (barely noticeable)
> - Get **paid directly to your bank account**
> - **No coding knowledge needed** after setup
> - Start selling within **2 weeks**

---

*This guide is for non-technical business owners. For technical details, see `ARCHITECTURE.md` and `BRAIN.md`.*