# DarkHarvest Beard Oil - Production Deployment & Payment Gateway Budget Estimate

## Project Overview
- **Frontend**: React 19 + Vite + Tailwind CSS (port 5173)
- **Backend**: Express 5 + JWT Auth (port 5000)
- **Current State**: Works locally with in-memory storage, **no payment gateway**

---

## Budget Breakdown (INR & USD)

### Option 1: Minimum Viable (Bootstrap) — ₹15,000–25,000 / $180–300

| Item | Cost (INR) | Cost (USD) | Details |
|------|------------|------------|---------|
| Domain (.com/.in) | ₹800–1,500/yr | $10–18 | Namecheap, GoDaddy, Porkbun |
| SSL Certificate | Free | Free | Let's Encrypt (auto via hosting) |
| Frontend Hosting | Free | Free | Vercel / Netlify / Cloudflare Pages |
| Backend Hosting | ₹500–1,500/mo | $6–18 | Railway / Render / Fly.io (hobby tier) |
| **Database (MongoDB Atlas)** | **Free** | **Free** | **MongoDB Atlas M0 — free 512MB (CRITICAL — currently NO database!)** |
| Payment Gateway Setup | ₹0 setup | $0 | Razorpay/Stripe - no setup fee, per-transaction only |
| **Developer Integration Work** | **₹10,000–15,000** | **$120–180** | 15–20 hrs @ ₹750/hr |
| **Total First Year** | **~₹15,000–22,000** | **~$180–265** | |

> **⚠️ NOTE:** MongoDB Atlas free tier is essential. Without a database, all customer accounts and orders are lost when server restarts!

### 🆕 Option 1B: Oracle Cloud Free Tier (BETTER VALUE) — ₹15,000–20,000 / $180–240

| Item | Cost (INR) | Cost (USD) | Details |
|------|------------|------------|---------|
| Domain (.com/.in) | ₹800–1,500/yr | $10–18 | Namecheap, GoDaddy, Porkbun |
| SSL Certificate | Free | Free | Let's Encrypt (auto via hosting) |
| Frontend Hosting | Free | Free | Vercel / Netlify / Cloudflare Pages |
| **Backend + Database** | **Free** | **Free** | **Oracle Cloud Always Free: 20GB DB + 2 OCPUs compute** |
| Payment Gateway Setup | ₹0 setup | $0 | Razorpay — no setup fee, per-transaction only |
| **Developer Integration Work** | **₹10,000–15,000** | **$120–180** | 15–20 hrs @ ₹750/hr |
| **Total First Year** | **~₹15,000–17,000** | **~$180–205** | **Save ₹5,000-8,000/year!** |

> **💡 WHY ORACLE IS BETTER:** Saves ₹500-1,500/month on backend hosting + 40x more database storage (20GB vs 512MB). See `ORACLE_FREE_TIER.md` for details.

---

### Option 2: Production Ready (Recommended) — ₹35,000–55,000 / $420–660

| Item | Cost (INR) | Cost (USD) | Details |
|------|------------|------------|---------|
| Domain + Privacy | ₹1,200–2,000/yr | $15–24 | |
| Frontend (Vercel Pro) | ₹1,500/mo | $18/mo | Custom domains, analytics, edge functions |
| Backend (Railway/Render Pro) | ₹2,500–4,000/mo | $30–48/mo | Dedicated CPU, RAM, logs, metrics |
| Database (MongoDB Atlas M10) | ₹2,000/mo | $24/mo | 2GB RAM, HA, backups |
| CDN/Images (Cloudinary) | Free–₹1,500/mo | Free–$18/mo | Product images optimization |
| Email Service (SendGrid/Resend) | Free–₹1,000/mo | Free–$12/mo | Order confirmations, OTP |
| Monitoring (Sentry/UptimeRobot) | Free–₹1,000/mo | Free–$12/mo | Error tracking, uptime |
| **Developer Integration Work** | **₹20,000–30,000** | **$240–360** | 30–40 hrs: payments, webhooks, testing, CI/CD |
| **Total First Year** | **~₹45,000–65,000** | **~$540–780** | |

---

### Option 3: Enterprise Grade — ₹1,00,000+ / $1,200+

- AWS/GCP/Azure with load balancers, auto-scaling, WAF
- Dedicated PostgreSQL (RDS/Cloud SQL)
- Custom CI/CD pipelines, staging environments
- PCI-DSS compliance consulting
- 24/7 monitoring, incident response

---

## Payment Gateway Comparison (Indian Market)

| Gateway | Setup Fee | TDR (Domestic) | TDR (Intl) | Settlement | Best For |
|---------|-----------|----------------|------------|------------|----------|
| **Razorpay** | ₹0 | 2% + GST | 3% + GST | T+2 | Indian businesses, UPI, cards, wallets |
| **Cashfree** | ₹0 | 1.75–2% | 3.5% | T+1 | Lower rates, good API |
| **PayU** | ₹0 | 2% | 3.5% | T+2 | Enterprise, subscriptions |
| **Stripe** | ₹0 | N/A | 2.9% + $0.30 | T+7 | International, SaaS, marketplaces |
| **PhonePe/Gpay** | Via aggregator | 0.5–1% (UPI) | N/A | Instant | UPI-only, zero MDR on some |

**Recommendation**: **Razorpay** — best docs, UPI + cards + wallets, instant activation, Indian compliance.

---

## Development Tasks Required for Payment Integration

### Backend Changes (~10–15 hrs)
- [ ] Add MongoDB/PostgreSQL (replace in-memory arrays)
- [ ] Create `Order` model with payment fields (paymentId, signature, status)
- [ ] Add Razorpay SDK: `npm i razorpay`
- [ ] **POST /api/payment/create-order** — creates Razorpay order (amount in paise)
- [ ] **POST /api/payment/verify** — verifies signature, updates order status
- [ ] Webhook endpoint: **POST /api/payment/webhook** — handles payment.captured, payment.failed
- [ ] Secure JWT secret, move to env vars
- [ ] Add rate limiting, input validation, CORS config for production domains

### Frontend Changes (~8–12 hrs)
- [ ] Add Razorpay checkout script loader
- [ ] Create `PaymentModal` component (amount, orderId, callbacks)
- [ ] On "Checkout" click → call backend `/create-order` → open Razorpay modal
- [ ] On success → call `/verify` → navigate to `/success` with order data
- [ ] On failure → show toast, stay on cart
- [ ] Add loading states, error handling, test mode toggle

### DevOps/Infra (~5–8 hrs)
- [ ] GitHub repo setup, branch protection
- [ ] Vercel + Railway/Render deployment configs
- [ ] Environment variables (API keys, DB URL, JWT secret, Razorpay keys)
- [ ] CI/CD: lint → build → deploy preview → production
- [ ] Custom domain + SSL configuration
- [ ] Health checks, basic monitoring

---

## Timeline Estimate

| Phase | Duration |
|-------|----------|
| Database migration & backend APIs | 3–5 days |
| Payment integration (frontend + backend) | 3–4 days |
| Testing (test cards, UPI, failure flows) | 2 days |
| Deployment, domain, SSL, CI/CD | 1–2 days |
| **Total** | **9–13 working days** |

---

## What Client Needs to Provide

1. **Business docs** for Razorpay KYC: PAN, GST, bank account, cancelled cheque
2. **Domain** (or approval to buy)
3. **Brand assets** (logo, favicon, product images)
4. **Legal pages**: Privacy Policy, Terms, Refund Policy (required for payment gateway)
5. **Test credentials**: Will provide Razorpay test keys; live keys after KYC

---

## Sample Quote for Client

> **Project**: DarkHarvest Beard Oil — Production Deployment + Razorpay Integration
>
> **Scope**:
> - Migrate in-memory backend to MongoDB Atlas
> - Integrate Razorpay (cards, UPI, wallets) with webhooks
> - Deploy frontend to Vercel, backend to Railway/Render
> - Custom domain + SSL + CI/CD pipeline
> - Testing with test cards + UPI simulator
>
> **Timeline**: 2 weeks
>
> **Pricing Options**:
> - **Fixed Price**: ₹35,000 (includes 30 days post-launch support)
> - **Hourly**: ₹1,000/hr (estimated 35–45 hrs = ₹35,000–45,000)
>
> **Recurring Costs** (client pays directly):
> - Domain: ~₹1,000/yr
> - Hosting: ~₹3,000–5,000/mo
> - Database: ~₹2,000/mo
> - Payment gateway: 2% per transaction (no fixed cost)

---

## Next Steps

1. Client confirms budget option
2. Collect business docs for Razorpay KYC (takes 1–2 business days)
3. Set up GitHub repo, share access
4. Begin development sprint

---

*Generated on: $(date)*
*Project Path: C:\Users\deshm\Downloads\DarkHarvest (2) (1)\DarkHarvest\NEw\NEw\*