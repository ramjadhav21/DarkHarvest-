# 💰 DarkHarvest — Component-Wise Budget Breakdown

**Project**: RP Beard Oil E-commerce Store  
**Date**: 2026-09-20

---

## 1. 🌐 DOMAIN & SSL

| Item | Provider | Cost (₹) | Duration | Notes |
|------|----------|----------|----------|-------|
| Domain (.com) | Namecheap / GoDaddy | ₹800–1,200 | 1 year | e.g., rpbeardoil.com |
| Domain (.in) | GoDaddy India | ₹500–800 | 1 year | Cheaper option |
| SSL Certificate | Let's Encrypt | ₹0 | Free forever | Auto-renew with hosting |
| Domain Privacy | Namecheap | ₹0 | Free with .com | Hides personal info |
| **TOTAL** | | **₹500–1,200** | | |

---

## 2. 🖥️ HOSTING

### Frontend Hosting (React App)

| Provider | Plan | Cost (₹/month) | Cost (₹/year) | Bandwidth | Features |
|----------|------|----------------|----------------|-----------|----------|
| **Vercel** ⭐ | Free | ₹0 | ₹0 | 100GB | Auto deploy, SSL, CDN |
| Netlify | Free | ₹0 | ₹0 | 100GB | Auto deploy, SSL |
| Cloudflare Pages | Free | ₹0 | ₹0 | Unlimited | Fastest CDN |
| Vercel | Pro | ₹1,500 | ₹18,000 | 1TB | Analytics, edge functions |
| **RECOMMENDATION** | **Vercel Free** | **₹0** | **₹0** | | **Best for React** |

### Backend Hosting (Node.js/Express)

| Provider | Plan | Cost (₹/month) | Cost (₹/year) | CPU | RAM | Notes |
|----------|------|----------------|----------------|-----|-----|-------|
| **Oracle Cloud** ⭐ | Always Free | ₹0 | ₹0 | 2 OCPUs | 12GB | Best value! |
| Render | Free | ₹0 | ₹0 | Shared | 512MB | Spins down after 15min |
| Railway | Free | ₹0 | ₹0 | Shared | 512MB | ₹500 credit/month |
| Render | Starter | ₹700 | ₹8,400 | 1 vCPU | 512MB | No spin down |
| Railway | Pro | ₹1,500 | ₹18,000 | 2 vCPU | 2GB | Always on |
| **RECOMMENDATION** | **Oracle Cloud Free** | **₹0** | **₹0** | | | **2 OCPUs + 12GB RAM FREE** |

### Hosting Summary

| Component | Free Option | Paid Option |
|-----------|-------------|-------------|
| Frontend | Vercel Free (₹0) | Vercel Pro (₹1,500/mo) |
| Backend | Oracle Cloud Free (₹0) | Railway Pro (₹1,500/mo) |
| **Total** | **₹0/month** | **₹3,000/month** |

---

## 3. 💾 DATABASE

| Provider | Plan | Cost (₹/month) | Storage | RAM | CPU | Best For |
|----------|------|----------------|---------|-----|-----|----------|
| **Oracle Autonomous DB** ⭐ | Always Free | ₹0 | **20GB** | Included | 1 OCPU | Production |
| MongoDB Atlas | M0 (Free) | ₹0 | 512MB | Shared | Shared | Testing |
| MongoDB Atlas | M10 | ₹500 | 2GB | 2GB | Shared | Small business |
| PostgreSQL (Railway) | Free | ₹0 | 1GB | Shared | Shared | Testing |
| PostgreSQL (Railway) | Paid | ₹500 | 10GB | 2GB | Shared | Production |
| **RECOMMENDATION** | **Oracle Free** | **₹0** | **20GB** | | | **40x more than MongoDB free** |

---

## 4. 🔐 PAYMENT GATEWAY (Razorpay)

### Setup Costs

| Item | Cost (₹) | Notes |
|------|----------|-------|
| Account Setup | ₹0 | Free to register |
| KYC Verification | ₹0 | PAN + Bank required |
| Website Integration | ₹0 | Free documentation |
| **TOTAL SETUP** | **₹0** | |

### Transaction Fees

| Payment Method | Fee | On ₹499 Sale | On ₹1000 Sale |
|----------------|-----|--------------|---------------|
| UPI | 2% + 18% GST | ₹11.78 | ₹23.60 |
| Debit Card | 2% + 18% GST | ₹11.78 | ₹23.60 |
| Credit Card | 2% + 18% GST | ₹11.78 | ₹23.60 |
| Net Banking | 2% + 18% GST | ₹11.78 | ₹23.60 |
| Wallets | 2% + 18% GST | ₹11.78 | ₹23.60 |
| International | 3% + 18% GST | ₹17.67 | ₹35.40 |

### Monthly Fee Examples

| Sales/Month | Revenue | Razorpay Fee (2%) | GST (18%) | Total Fee | Net Revenue |
|-------------|---------|-------------------|-----------|-----------|-------------|
| 25 sales | ₹12,475 | ₹250 | ₹45 | ₹295 | ₹12,180 |
| 50 sales | ₹24,950 | ₹499 | ₹90 | ₹589 | ₹24,361 |
| 100 sales | ₹49,900 | ₹998 | ₹180 | ₹1,178 | ₹48,722 |
| 200 sales | ₹99,800 | ₹1,996 | ₹359 | ₹2,355 | ₹97,445 |

### Settlement

| Type | Timeline | Notes |
|------|----------|-------|
| Domestic Payments | T+2 | 2 business days to bank |
| International Payments | T+7 | 7 business days to bank |
| Refunds | Instant | Deducted from next settlement |

---

## 5. 📧 EMAIL SERVICE

| Provider | Plan | Cost (₹/month) | Emails/Month | Best For |
|----------|------|----------------|--------------|----------|
| **Oracle Email** ⭐ | Free | ₹0 | 3,000 | Order confirmations |
| SendGrid | Free | ₹0 | 100 | Testing |
| SendGrid | Essentials | ₹800 | 50,000 | Marketing |
| Resend | Free | ₹0 | 3,000 | Simple emails |
| Resend | Pro | ₹1,500 | 50,000 | Growing business |
| **RECOMMENDATION** | **Oracle Free** | **₹0** | **3,000** | **Enough for 3,000 orders/month** |

### Email Types Needed

| Email Type | Trigger | Priority |
|------------|---------|----------|
| Order Confirmation | After successful payment | 🔴 Must |
| Password Reset | User forgets password | 🔴 Must |
| Shipping Update | Order shipped/delivered | 🟡 Nice to have |
| Marketing | Promotions, offers | 🟢 Optional |

---

## 6. 💻 DEVELOPMENT (Coding)

### Backend Development

| Task | Hours | Rate (₹/hr) | Cost (₹) | Details |
|------|-------|-------------|----------|---------|
| Database Setup (Oracle/MongoDB) | 3–4 | ₹800 | ₹2,400–3,200 | Schema, connection, models |
| Password Encryption (bcrypt) | 1–2 | ₹800 | ₹800–1,600 | Hash + verify passwords |
| JWT Security Improvement | 1–2 | ₹800 | ₹800–1,600 | Move secret to .env, add refresh tokens |
| Payment Gateway (Razorpay) | 5–7 | ₹800 | ₹4,000–5,600 | Create order, verify, webhook |
| Email Integration | 2–3 | ₹800 | ₹1,600–2,400 | Order confirmation, password reset |
| Input Validation | 2–3 | ₹800 | ₹1,600–2,400 | Zod/Joi schemas for all endpoints |
| Rate Limiting | 1 | ₹800 | ₹800 | Prevent brute force attacks |
| Error Handling | 1–2 | ₹800 | ₹800–1,600 | Global error handler, logging |
| API Documentation | 1–2 | ₹800 | ₹800–1,600 | Swagger/OpenAPI docs |
| **Backend Subtotal** | **17–26 hrs** | | **₹13,600–20,800** | |

### Frontend Development

| Task | Hours | Rate (₹/hr) | Cost (₹) | Details |
|------|-------|-------------|----------|---------|
| Payment UI (Razorpay Modal) | 3–4 | ₹800 | ₹2,400–3,200 | Checkout flow, success/failure |
| Order History Page | 2–3 | ₹800 | ₹1,600–2,400 | List past orders |
| Profile Page | 1–2 | ₹800 | ₹800–1,600 | View/edit user info |
| Password Reset UI | 1–2 | ₹800 | ₹800–1,600 | Forgot password flow |
| Loading States | 1 | ₹800 | ₹800 | Skeleton loaders, spinners |
| Error Handling UI | 1 | ₹800 | ₹800 | Toast notifications, error pages |
| Mobile Optimization | 2–3 | ₹800 | ₹1,600–2,400 | Responsive design fixes |
| **Frontend Subtotal** | **11–16 hrs** | | **₹8,800–12,800** | |

### DevOps / Deployment

| Task | Hours | Rate (₹/hr) | Cost (₹) | Details |
|------|-------|-------------|----------|---------|
| Vercel Setup (Frontend) | 1 | ₹800 | ₹800 | Connect repo, env vars, deploy |
| Oracle Cloud Setup | 2–3 | ₹800 | ₹1,600–2,400 | Account, compute, database |
| Environment Variables | 1 | ₹800 | ₹800 | .env files, secrets management |
| CI/CD Pipeline | 2–3 | ₹800 | ₹1,600–2,400 | GitHub Actions auto-deploy |
| Domain + SSL Setup | 1 | ₹800 | ₹800 | DNS, HTTPS configuration |
| **DevOps Subtotal** | **7–9 hrs** | | **₹5,600–7,200** | |

### Testing & QA

| Task | Hours | Rate (₹/hr) | Cost (₹) | Details |
|------|-------|-------------|----------|---------|
| API Testing | 2–3 | ₹800 | ₹1,600–2,400 | Test all endpoints |
| Payment Testing | 2–3 | ₹800 | ₹1,600–2,400 | Test cards, UPI, failure flows |
| Cross-browser Testing | 1–2 | ₹800 | ₹800–1,600 | Chrome, Safari, Firefox, Edge |
| Mobile Testing | 1–2 | ₹800 | ₹800–1,600 | iOS Safari, Android Chrome |
| Bug Fixes | 2–3 | ₹800 | ₹1,600–2,400 | Fix issues found during testing |
| **Testing Subtotal** | **8–13 hrs** | | **₹6,400–10,400** | |

### Development Total

| Category | Hours | Cost (₹) |
|----------|-------|----------|
| Backend Development | 17–26 hrs | ₹13,600–20,800 |
| Frontend Development | 11–16 hrs | ₹8,800–12,800 |
| DevOps / Deployment | 7–9 hrs | ₹5,600–7,200 |
| Testing & QA | 8–13 hrs | ₹6,400–10,400 |
| **TOTAL** | **43–64 hrs** | **₹34,400–51,200** |

---

## 7. 📊 COMPLETE BUDGET SUMMARY

### Option A: Minimum (Testing Only)

| Component | Monthly (₹) | Yearly (₹) | One-Time Dev (₹) |
|-----------|-------------|------------|-------------------|
| Domain + SSL | — | ₹800–1,200 | — |
| Frontend Hosting (Vercel Free) | ₹0 | ₹0 | — |
| Backend Hosting (Render Free) | ₹0 | ₹0 | — |
| Database (MongoDB Atlas Free) | ₹0 | ₹0 | — |
| Payment Gateway (Razorpay) | 2% per sale | 2% per sale | — |
| Email (Not included) | — | — | — |
| **Hosting Subtotal** | **₹0** | **₹800–1,200** | — |
| **Development** | — | — | **₹15,000–20,000** |
| **TOTAL** | **₹0** | **₹800–1,200** | **₹15,000–20,000** |

### Option B: Production (RECOMMENDED)

| Component | Monthly (₹) | Yearly (₹) | One-Time Dev (₹) |
|-----------|-------------|------------|-------------------|
| Domain + SSL | — | ₹800–1,200 | — |
| Frontend Hosting (Vercel Free) | ₹0 | ₹0 | — |
| Backend Hosting (Oracle Cloud Free) | ₹0 | ₹0 | — |
| Database (Oracle Autonomous Free) | ₹0 | ₹0 | — |
| Payment Gateway (Razorpay) | 2% per sale | 2% per sale | — |
| Email (Oracle Email Free) | ₹0 | ₹0 | — |
| **Hosting Subtotal** | **₹0** | **₹800–1,200** | — |
| **Development** | — | — | **₹34,000–51,000** |
| **TOTAL** | **₹0** | **₹800–1,200** | **₹34,000–51,000** |

### Option C: Premium (Scaling)

| Component | Monthly (₹) | Yearly (₹) | One-Time Dev (₹) |
|-----------|-------------|------------|-------------------|
| Domain + SSL | — | ₹800–1,200 | — |
| Frontend Hosting (Vercel Pro) | ₹1,500 | ₹18,000 | — |
| Backend Hosting (Oracle Cloud Paid) | ₹2,500 | ₹30,000 | — |
| Database (Oracle Autonomous Paid) | ₹3,000 | ₹36,000 | — |
| Payment Gateway (Razorpay) | 2% per sale | 2% per sale | — |
| Email (SendGrid Essentials) | ₹800 | ₹9,600 | — |
| Monitoring (Sentry) | ₹500 | ₹6,000 | — |
| CDN (Cloudinary) | ₹500 | ₹6,000 | — |
| **Hosting Subtotal** | **₹8,800** | **₹1,05,600** | — |
| **Development** | — | — | **₹34,000–51,000** |
| **TOTAL** | **₹8,800** | **₹1,05,600** | **₹34,000–51,000** |

---

## 8. 💵 SUGGESTED QUOTE FOR CLIENT

### Option B: Production Ready (₹35,000)

| Line Item | Amount (₹) |
|-----------|------------|
| **Backend Development** | |
| Database Integration (Oracle Cloud) | ₹3,000 |
| Password Security (bcrypt + JWT) | ₹1,500 |
| Razorpay Payment Gateway | ₹5,000 |
| Email System (Order Confirmations) | ₹2,000 |
| Input Validation & Security | ₹1,500 |
| **Frontend Development** | |
| Razorpay Checkout UI | ₹2,500 |
| Order History & Profile Pages | ₹2,000 |
| Mobile Optimization | ₹1,500 |
| Loading States & Error Handling | ₹1,000 |
| **DevOps & Deployment** | |
| Oracle Cloud Setup (Compute + DB) | ₹2,000 |
| Vercel Deployment (Frontend) | ₹800 |
| CI/CD Pipeline (GitHub Actions) | ₹1,500 |
| Domain + SSL Setup | ₹800 |
| **Testing & QA** | |
| API + Payment Testing | ₹2,000 |
| Cross-browser + Mobile Testing | ₹1,500 |
| Bug Fixes | ₹1,500 |
| **Subtotal** | **₹30,100** |
| **Project Management (10%)** | ₹3,000 |
| **Contingency (5%)** | ₹1,500 |
| **TOTAL PROJECT COST** | **₹34,600** |
| **ROUND OFF** | **₹35,000** |

### Payment Terms

| Milestone | % | Amount (₹) | Due |
|-----------|---|------------|-----|
| Project Kickoff | 30% | ₹10,500 | Day 1 |
| Payment Gateway Working | 40% | ₹14,000 | Day 8 |
| Final Delivery + Launch | 30% | ₹10,500 | Day 15 |
| **Total** | **100%** | **₹35,000** | |

---

## 9. 📈 MONTHLY OPERATING COST (After Launch)

| Item | Cost (₹/month) | Notes |
|------|----------------|-------|
| Domain | ₹67 (₹800/12) | Amortized yearly cost |
| Frontend Hosting | ₹0 | Vercel Free Tier |
| Backend Hosting | ₹0 | Oracle Cloud Free Tier |
| Database | ₹0 | Oracle Autonomous DB Free |
| Email Service | ₹0 | Oracle Email Free Tier |
| Payment Gateway | ₹589 (for 50 sales) | 2% + GST |
| **TOTAL** | **₹656/month** | For 50 sales at ₹499 |

### Profitability (50 sales/month)

```
Revenue:           50 × ₹499      = ₹24,950
Razorpay Fee:      2% + GST        = -₹589
Domain (monthly):                  = -₹67
────────────────────────────────────────────
Net Profit:                        = ₹24,294/month ✅
```

---

## 10. 📋 FILE LIST

| File | Purpose |
|------|---------|
| `STRUCTURED_BUDGET.md` | This file — component-wise breakdown |
| `CLIENT_GUIDE.md` | Simple non-technical guide |
| `BUDGET_ESTIMATE.md` | Option-based cost comparison |
| `ARCHITECTURE.md` | Technical architecture |
| `BRAIN.md` | AI-friendly project summary |
| `ORACLE_FREE_TIER.md` | Oracle vs MongoDB comparison |
| `NEw/NEw/Beard_Oil/README.md` | Frontend setup guide |

---

*For technical details, see `ARCHITECTURE.md`. For client-friendly explanation, see `CLIENT_GUIDE.md`.*