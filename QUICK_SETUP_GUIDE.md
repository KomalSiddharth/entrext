# 🚀 Quick Setup Guide - Connect Your Supabase

## ⚡ 5-Minute Setup

### Step 1: Get Credentials (2 min)
1. Go to https://supabase.com/dashboard
2. Create new project or select existing
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...`

### Step 2: Update .env (1 min)
```env
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-ANON-KEY-HERE
```

### Step 3: Create Table (2 min)
Go to **SQL Editor** in Supabase, paste and run:

```sql
CREATE TABLE waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);

ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;
```

### Step 4: Test (30 sec)
1. Open your landing page
2. Click "Join the waitlist"
3. Enter test email
4. Check Supabase **Table Editor** → `waitlist`

---

## ✅ Done!

Your waitlist is now connected to your Supabase account.

**Need detailed instructions?** See `SUPABASE_CUSTOM_SETUP.md`

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "Failed to fetch" | Check `VITE_SUPABASE_URL` in `.env` |
| "Invalid API key" | Use **anon public** key, not service_role |
| "Permission denied" | Run `ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;` |
| "Table does not exist" | Run the CREATE TABLE query again |

---

## 📊 Quick Queries

### View all signups
```sql
SELECT * FROM waitlist ORDER BY created_at DESC;
```

### Count total signups
```sql
SELECT COUNT(*) FROM waitlist;
```

### Export emails
```sql
SELECT email FROM waitlist ORDER BY created_at;
```

---

**That's it! 🎉**
