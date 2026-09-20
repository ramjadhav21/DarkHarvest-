# Oracle Cloud Free Tier vs MongoDB Atlas — Alternative Database Options

**Last Updated**: 2026-09-20  
**Purpose**: Compare free database options for small budget projects

---

## 🆓 Option 1: MongoDB Atlas Free Tier (M0)

| Feature | Details |
|---------|---------|
| **Cost** | ₹0/month (completely free) |
| **Storage** | 512MB |
| **Database Type** | NoSQL (MongoDB) |
| **RAM** | Shared |
| **Connections** | 500 concurrent |
| **Backups** | Automatic daily |
| **Setup Time** | 10 minutes |
| **Scaling** | Upgrade to M10 (₹500/mo) for 2GB+ |

### Pros:
- ✅ Very easy setup (10 minutes)
- ✅ Perfect for small projects (< 1000 users)
- ✅ No server management needed
- ✅ Works great with Node.js/Express
- ✅ JSON-native (matches your existing code)

### Cons:
- ❌ Only 512MB storage (limits growth)
- ❌ No compute included (need separate hosting)
- ❌ Shared resources (slower under load)

---

## 🆓 Option 2: Oracle Cloud Always Free Tier

**URL**: https://www.oracle.com/cloud/free/  
**Documentation**: https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier.htm

### What You Get (ALWAYS FREE — ₹0/month, never expires):

| Resource | Free Tier Allowance |
|----------|---------------------|
| **Autonomous AI Database** | **2 databases** (1 OCPU, **20GB storage each**) |
| **Compute (ARM)** | 2 OCPUs, 12GB RAM (VM.Standard.A1.Flex) |
| **Compute (AMD Micro)** | 2 instances (1/8 OCPU, 1GB RAM each) |
| **Block Volume** | 200GB total |
| **Object Storage** | 20GB |
| **Load Balancer** | 10 Mbps |
| **Email Delivery** | 3,000 emails/month |
| **Outbound Data** | 10TB/month |
| **Monitoring** | 500M data points |
| **Notifications** | 1M HTTPS, 1000 email/month |

### Database Specifics:

| Feature | Oracle Autonomous DB (Free) | MongoDB Atlas M0 (Free) |
|---------|-----------------------------|-------------------------|
| **Storage** | **20GB** (40x more!) | 512MB |
| **CPU** | 1 OCPU (dedicated) | Shared |
| **RAM** | Included | Shared |
| **Backups** | Automatic | Automatic |
| **Max Sessions** | 20 concurrent | 500 concurrent |
| **Database Type** | SQL (Oracle) + JSON support | NoSQL (MongoDB) |
| **Scaling** | Upgradeable to paid | Upgradeable to M10 |

### Pros:
- ✅ **20GB storage** (40x more than MongoDB Atlas free)
- ✅ **Compute included** — host your backend server too!
- ✅ **Dedicated CPU** — not shared
- ✅ **Enterprise-grade** — same as paid Oracle databases
- ✅ **10TB outbound data** — enough for millions of page views
- ✅ **Load balancer included** — for future scaling
- ✅ **Email service included** — 3,000 emails/month for order confirmations
- ✅ **Never expires** — use forever at ₹0

### Cons:
- ❌ More complex setup (30-60 minutes vs 10 minutes)
- ❌ Requires Oracle Cloud account + credit card (not charged)
- ❌ Oracle DB syntax differs from MongoDB (need code changes)
- ❌ ARM instances may have "out of capacity" errors sometimes
- ❌ Idle compute instances may be reclaimed (if unused for 7 days)

---

## 🎯 Recommendation for This Project

### For DarkHarvest Beard Oil Store:

| Scenario | Recommended Option | Why |
|----------|-------------------|-----|
| **Quick MVP (Testing)** | MongoDB Atlas M0 | 10-minute setup, get running fast |
| **Production (Small Business)** | **Oracle Cloud Free Tier** ⭐ | 40x more storage, compute included, enterprise-grade |
| **Scaling to 1000+ users** | Oracle Cloud (upgrade to paid) | Already have infrastructure, just scale up |

### Why Oracle is Better for Production:

```
MongoDB Atlas Free:
├── 512MB storage (enough for ~5,000 orders)
├── Need separate hosting (₹500-1500/mo extra)
└── No compute, no email, no load balancer

Oracle Cloud Free (BETTER VALUE):
├── 20GB storage (enough for 200,000+ orders!)
├── Compute included (host backend for FREE!)
├── Email service included (3,000 emails/month!)
├── Load balancer included (for future scaling)
└── 10TB data transfer (millions of page views!)
```

---

## 💰 Cost Comparison: Full Stack Hosting

### Option A: MongoDB Atlas + Vercel + Railway

| Service | Monthly Cost |
|---------|--------------|
| MongoDB Atlas M0 | ₹0 |
| Vercel (Frontend) | ₹0 |
| Railway (Backend) | ₹500-1,500 |
| **Total** | **₹500-1,500/mo** |

### Option B: Oracle Cloud Free Tier (RECOMMENDED)

| Service | Monthly Cost |
|---------|--------------|
| Oracle Autonomous DB | ₹0 |
| Oracle Compute (Backend) | ₹0 |
| Vercel (Frontend) | ₹0 |
| **Total** | **₹0/mo** ✅ |

**Oracle saves ₹500-1,500/month = ₹6,000-18,000/year!**

---

## 🔧 Oracle Cloud Setup Steps (Simplified)

### Step 1: Create Account (5 minutes)
1. Go to https://signup.cloud.oracle.com/
2. Sign up with email + phone
3. Add credit card (NOT charged — for verification only)
4. Choose home region: **Mumbai (ap-mumbai-1)** or **Hyderabad (ap-hyderabad-1)**

### Step 2: Create Database (15 minutes)
1. Go to OCI Console → Oracle Database → Autonomous Database
2. Click "Create Autonomous Database"
3. Select "Always Free" tier
4. Choose workload type: **Transaction Processing**
5. Set storage: 20GB (default)
6. Create admin password
7. Wait 2-3 minutes for provisioning

### Step 3: Get Connection String (5 minutes)
1. Go to your database → Connection strings
2. Select "SDK, CLI, and other drivers"
3. Copy the connection string
4. Format: `oracle+oracledb://ADMIN:password@host:1521/service_name`

### Step 4: Update Backend Code (30 minutes)
```javascript
// Install Oracle driver: npm install oracledb
// Update index.js:
const oracledb = require('oracledb');

// Connect to Oracle
await oracledb.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION
});
```

### Step 5: Create Compute Instance (20 minutes) — OPTIONAL
1. Go to OCI Console → Compute → Instances
2. Click "Create Instance"
3. Select shape: VM.Standard.A1.Flex (Always Free eligible)
4. Choose OCPUs: 1, RAM: 6GB
5. Select Ubuntu or Oracle Linux image
6. Create SSH key pair
7. Launch instance
8. Deploy backend code to this instance

---

## 📊 Database Schema Comparison

### Current (In-Memory — DO NOT USE)
```javascript
let users = [];    // Lost on restart!
let orders = [];   // Lost on restart!
```

### MongoDB Atlas (NoSQL)
```javascript
// Users Collection
{
  _id: ObjectId,
  email: String,
  password: String,
  createdAt: Date
}

// Orders Collection
{
  _id: ObjectId,
  userId: ObjectId,
  items: Array,
  total: Number,
  status: String
}
```

### Oracle Autonomous DB (SQL)
```sql
-- Users Table
CREATE TABLE users (
  id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  email VARCHAR2(255) UNIQUE NOT NULL,
  password_hash VARCHAR2(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
  id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  user_id NUMBER REFERENCES users(id),
  items CLOB,  -- JSON stored as text
  total NUMBER(10,2),
  status VARCHAR2(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ⚠️ Important Notes

### Oracle Cloud Free Tier Restrictions:
1. **Must create in home region** — choose Mumbai or Hyderabad
2. **Credit card required** — but NOT charged (verification only)
3. **Idle compute reclaimed** — if CPU/network/memory < 20% for 7 days
4. **ARM capacity limited** — may show "out of host capacity" error
5. **2 databases max** — but 20GB each is plenty for small business

### When to Upgrade from Free Tier:
- Storage > 20GB (upgrade to paid Autonomous DB)
- Need more than 2 OCPUs (upgrade compute)
- Need more than 10TB outbound data
- Need production SLA (99.95%+ uptime)

---

## 🏆 Final Recommendation

### For DarkHarvest (Small Budget):

**Use BOTH for different purposes:**

| Component | Service | Why |
|-----------|---------|-----|
| **Frontend** | Vercel (free) | Best React hosting, auto-deploy |
| **Backend** | Oracle Compute (free) | 2 OCPUs, 12GB RAM — more than enough |
| **Database** | Oracle Autonomous DB (free) | 20GB storage, enterprise-grade |
| **Email** | Oracle Email Delivery (free) | 3,000 emails/month included |

**Total Cost: ₹0/month** 🎉

### Migration Path:
```
Phase 1 (MVP): MongoDB Atlas M0 (₹0) — quick setup
    ↓
Phase 2 (Production): Oracle Cloud Free Tier (₹0) — better value
    ↓
Phase 3 (Scale): Oracle Cloud Paid — same infrastructure, just upgrade
```

---

*For non-technical explanation, see `CLIENT_GUIDE.md`. For technical architecture, see `ARCHITECTURE.md`.*