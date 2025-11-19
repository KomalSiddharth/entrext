# How to Connect Your Own Supabase Account

## 🎯 Quick Guide

Follow these steps to replace the current Supabase project with your own account.

---

## 📋 Prerequisites

Before you begin, make sure you have:
- ✅ A Supabase account (free tier is fine)
- ✅ Access to your project dashboard
- ✅ Basic understanding of SQL

---

## 🚀 Step-by-Step Setup

### Step 1: Create a Supabase Project

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Sign in or create a free account

2. **Create New Project**
   - Click "New Project"
   - Choose your organization
   - Enter project details:
     - **Name**: `companion-landing` (or any name you prefer)
     - **Database Password**: Choose a strong password (save it!)
     - **Region**: Select closest to your users
     - **Pricing Plan**: Free tier is sufficient

3. **Wait for Setup**
   - Project creation takes 1-2 minutes
   - You'll see a progress indicator

---

### Step 2: Get Your Project Credentials

1. **Navigate to Project Settings**
   - Click on your project
   - Go to **Settings** (gear icon in sidebar)
   - Click **API** section

2. **Copy Your Credentials**
   You'll need two values:

   **Project URL:**
   ```
   https://your-project-ref.supabase.co
   ```
   
   **Anon/Public Key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
   ```

   ⚠️ **Important**: Copy the `anon` `public` key, NOT the `service_role` key!

---

### Step 3: Update Environment Variables

1. **Open the `.env` file** in your project root:
   ```bash
   /workspace/app-7nv3t0d7d729/.env
   ```

2. **Replace the Supabase credentials:**
   ```env
   VITE_LOGIN_TYPE=gmail
   VITE_APP_ID=app-7nv3t0d7d729
   VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR-ANON-KEY-HERE
   ```

3. **Save the file**

---

### Step 4: Create Database Tables

You need to create the `waitlist` table in your new Supabase project.

#### Option A: Using Supabase Dashboard (Recommended)

1. **Go to SQL Editor**
   - In your Supabase dashboard
   - Click **SQL Editor** in the sidebar
   - Click **New Query**

2. **Copy and paste this SQL:**
   ```sql
   -- Create waitlist table
   CREATE TABLE IF NOT EXISTS waitlist (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     email text UNIQUE NOT NULL,
     created_at timestamptz DEFAULT now()
   );

   -- Create indexes for performance
   CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
   CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
   ```

3. **Run the query**
   - Click **Run** button (or press Ctrl+Enter)
   - You should see "Success. No rows returned"

4. **Verify the table**
   - Go to **Table Editor** in sidebar
   - You should see the `waitlist` table

#### Option B: Using Migration File

If you prefer using the migration file:

1. **Locate the migration file:**
   ```
   /workspace/app-7nv3t0d7d729/supabase/migrations/01_create_waitlist_table.sql
   ```

2. **Copy the SQL content** (lines 25-33)

3. **Paste and run** in Supabase SQL Editor

---

### Step 5: Configure Table Permissions (Important!)

By default, Supabase tables have Row Level Security (RLS) enabled. For a public waitlist, we need to allow anyone to insert emails.

1. **Go to Authentication → Policies** in Supabase dashboard

2. **Select the `waitlist` table**

3. **Check if RLS is enabled**
   - If RLS is enabled, you need to create a policy
   - If RLS is disabled, skip to Step 6

4. **Create an Insert Policy** (if RLS is enabled):
   - Click **New Policy**
   - Choose **Custom Policy**
   - Policy name: `Allow public email inserts`
   - Policy command: `INSERT`
   - Target roles: `public`
   - USING expression: `true`
   - WITH CHECK expression: `true`
   - Click **Save**

**OR disable RLS entirely** (simpler for public waitlist):

```sql
-- Run this in SQL Editor
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;
```

---

### Step 6: Test the Connection

1. **Restart your development server** (if running)

2. **Open your landing page**

3. **Click "Join the waitlist"**

4. **Enter a test email** (e.g., `test@example.com`)

5. **Submit the form**

6. **Check for success message:**
   - ✅ "Welcome to the waitlist! 🌿"

7. **Verify in Supabase:**
   - Go to **Table Editor** → `waitlist`
   - You should see your test email

---

## 🔍 Verification Checklist

After setup, verify everything is working:

- [ ] Environment variables updated in `.env`
- [ ] `waitlist` table created in Supabase
- [ ] Table has correct columns: `id`, `email`, `created_at`
- [ ] Indexes created for performance
- [ ] RLS disabled OR insert policy created
- [ ] Test email successfully submitted
- [ ] Email appears in Supabase Table Editor
- [ ] Success toast message displays
- [ ] Duplicate email shows "Already on the list" error

---

## 🎨 Visual Guide

### Finding Your Credentials

```
Supabase Dashboard
└── Your Project
    └── Settings (⚙️)
        └── API
            ├── Project URL: https://xxxxx.supabase.co
            └── Project API keys
                └── anon public: eyJhbGc... (COPY THIS)
```

### Database Setup Flow

```
SQL Editor → New Query → Paste SQL → Run → Success
                                              ↓
                                    Table Editor → Verify
```

---

## 🛠️ Troubleshooting

### Issue: "Failed to fetch" error

**Cause**: Wrong Supabase URL or network issue

**Solution:**
1. Double-check your `VITE_SUPABASE_URL` in `.env`
2. Make sure URL starts with `https://`
3. Verify project is active in Supabase dashboard

---

### Issue: "Invalid API key" error

**Cause**: Wrong or expired anon key

**Solution:**
1. Go to Supabase Dashboard → Settings → API
2. Copy the **anon public** key (not service_role!)
3. Update `VITE_SUPABASE_ANON_KEY` in `.env`
4. Restart your dev server

---

### Issue: "Permission denied" error

**Cause**: RLS is blocking inserts

**Solution:**
```sql
-- Option 1: Disable RLS (simpler)
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;

-- Option 2: Create insert policy
CREATE POLICY "Allow public inserts" ON waitlist
FOR INSERT TO public
WITH CHECK (true);
```

---

### Issue: "Table does not exist" error

**Cause**: Table not created yet

**Solution:**
1. Go to SQL Editor in Supabase
2. Run the CREATE TABLE query from Step 4
3. Verify table appears in Table Editor

---

### Issue: "Duplicate key value" error not showing

**Cause**: Unique constraint not created

**Solution:**
```sql
-- Add unique constraint
ALTER TABLE waitlist ADD CONSTRAINT waitlist_email_key UNIQUE (email);
```

---

## 📊 Verify Your Setup

Run these SQL queries in Supabase SQL Editor to verify:

### 1. Check table exists
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'waitlist';
```
**Expected**: Returns 1 row with `waitlist`

### 2. Check table structure
```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'waitlist' 
ORDER BY ordinal_position;
```
**Expected**: Returns 3 rows (id, email, created_at)

### 3. Check indexes
```sql
SELECT indexname 
FROM pg_indexes 
WHERE tablename = 'waitlist';
```
**Expected**: Returns 3 indexes (primary key + 2 custom indexes)

### 4. Check RLS status
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'waitlist';
```
**Expected**: `rowsecurity` should be `false` (or you have policies set up)

### 5. Test insert
```sql
INSERT INTO waitlist (email) 
VALUES ('test@example.com') 
RETURNING *;
```
**Expected**: Returns the inserted row with id, email, and created_at

---

## 🔐 Security Best Practices

### DO ✅

- ✅ Use the **anon public** key in your frontend
- ✅ Keep your **service_role** key secret (never expose it)
- ✅ Use environment variables for credentials
- ✅ Enable HTTPS in production
- ✅ Set up email validation on frontend
- ✅ Monitor your Supabase usage

### DON'T ❌

- ❌ Don't commit `.env` file to Git
- ❌ Don't use service_role key in frontend
- ❌ Don't expose database password
- ❌ Don't disable RLS without understanding implications
- ❌ Don't skip testing after setup

---

## 📈 Optional Enhancements

### Add Email Notifications

Set up email notifications when someone joins:

1. **Create Edge Function:**
   ```typescript
   // supabase/functions/notify-waitlist/index.ts
   import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
   
   serve(async (req) => {
     const { email } = await req.json()
     
     // Send email using your preferred service
     // (SendGrid, Resend, Mailgun, etc.)
     
     return new Response(JSON.stringify({ success: true }), {
       headers: { "Content-Type": "application/json" },
     })
   })
   ```

2. **Create Database Trigger:**
   ```sql
   CREATE OR REPLACE FUNCTION notify_new_signup()
   RETURNS TRIGGER AS $$
   BEGIN
     PERFORM net.http_post(
       url := 'https://your-project.supabase.co/functions/v1/notify-waitlist',
       body := json_build_object('email', NEW.email)::text
     );
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;
   
   CREATE TRIGGER on_waitlist_insert
   AFTER INSERT ON waitlist
   FOR EACH ROW
   EXECUTE FUNCTION notify_new_signup();
   ```

### Add Analytics

Track waitlist signups:

```sql
-- Create analytics view
CREATE VIEW waitlist_analytics AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as signups,
  SUM(COUNT(*)) OVER (ORDER BY DATE(created_at)) as cumulative
FROM waitlist
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### Export Waitlist

Export emails for email marketing:

```sql
-- Get all emails in CSV format
COPY (
  SELECT email, created_at 
  FROM waitlist 
  ORDER BY created_at
) TO STDOUT WITH CSV HEADER;
```

---

## 🎓 Learning Resources

### Supabase Documentation
- **Getting Started**: https://supabase.com/docs/guides/getting-started
- **Database**: https://supabase.com/docs/guides/database
- **Auth**: https://supabase.com/docs/guides/auth
- **API**: https://supabase.com/docs/guides/api

### Video Tutorials
- **Supabase Crash Course**: https://www.youtube.com/watch?v=7uKQBl9uZ00
- **Database Setup**: https://www.youtube.com/watch?v=dU7GwCOgvNY

### Community
- **Discord**: https://discord.supabase.com
- **GitHub**: https://github.com/supabase/supabase
- **Twitter**: https://twitter.com/supabase

---

## 📞 Need Help?

### Supabase Support
- 📧 **Email**: support@supabase.com
- 💬 **Discord**: https://discord.supabase.com
- 📚 **Docs**: https://supabase.com/docs
- 🐛 **GitHub Issues**: https://github.com/supabase/supabase/issues

### Common Questions

**Q: Is Supabase free?**
A: Yes! Free tier includes:
- 500MB database space
- 1GB file storage
- 2GB bandwidth
- 50,000 monthly active users

**Q: Can I upgrade later?**
A: Yes, you can upgrade to Pro ($25/month) anytime for more resources.

**Q: Is my data secure?**
A: Yes, Supabase uses industry-standard encryption and security practices.

**Q: Can I export my data?**
A: Yes, you can export your database anytime using pg_dump or SQL queries.

---

## ✅ Final Checklist

Before going live, make sure:

- [ ] `.env` file has your Supabase credentials
- [ ] `.env` is in `.gitignore` (don't commit secrets!)
- [ ] Database table is created
- [ ] Permissions are configured correctly
- [ ] Test email submission works
- [ ] Error handling works (duplicate email)
- [ ] Success messages display correctly
- [ ] Data appears in Supabase dashboard
- [ ] Production environment variables are set
- [ ] Backup plan for database is in place

---

## 🎉 You're All Set!

Your Companion landing page is now connected to your own Supabase account! 

**What's Next?**
1. ✅ Test the waitlist form thoroughly
2. 📊 Monitor signups in Supabase dashboard
3. 📧 Set up email notifications (optional)
4. 🚀 Deploy to production
5. 📈 Track growth and engagement

**Happy building! 🌿**

---

**Last Updated**: 2025-11-19  
**Supabase Version**: Latest  
**Difficulty**: Beginner-Friendly  
**Time Required**: 10-15 minutes
