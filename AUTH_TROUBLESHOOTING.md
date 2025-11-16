# Auth System Troubleshooting & Testing Guide

## ✅ What Should Work Now

After the fixes applied:

1. **Login with admin/admin123** → Should redirect to /dashboard
2. **Cookie should be set** → Check DevTools → Application → Cookies → `auth_token`
3. **Dashboard should load** → Shows user info and logout button
4. **Logout should work** → Clears cookie and redirects to /

## 🧪 Testing the Auth Flow

### Method 1: Browser Testing (Easiest)

1. Open http://localhost:3000/login
2. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
3. Click "লগইন করুন" (Login)

**Expected behavior:**
- Should redirect to `/dashboard`
- Page loads with user info
- No redirect loop

**Verify cookies:**
- Open DevTools (F12)
- Go to Application → Cookies
- Look for `auth_token` cookie
- Value should be a UUID (user ID)

### Method 2: Command Line Testing

```bash
# Run the test script
bash test-auth.sh
```

This will test:
1. Login endpoint
2. Auth validation
3. Logout endpoint

### Method 3: Manual cURL Testing

```bash
# 1. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt

# 2. Check current user (with cookies)
curl http://localhost:3000/api/auth/me -b cookies.txt

# 3. Logout
curl -X POST http://localhost:3000/api/auth/logout -b cookies.txt
```

## 🔍 Debugging Checklist

### Issue: Login returns 200 but page doesn't load

**Check:**
- [ ] RLS policy allows SELECT (should be `USING (true)`)
- [ ] User exists in database with correct plaintext password
- [ ] Browser console shows no errors (F12 → Console)
- [ ] Network tab shows successful redirects

**Fix:**
```sql
-- In Supabase SQL Editor
SELECT * FROM users WHERE username = 'admin';
```

### Issue: Login redirects back to /login

**Likely cause:** Cookie not being sent in subsequent requests

**Check:**
- [ ] All fetch calls use `credentials: "include"`
- [ ] UserProvider is wrapping the entire app
- [ ] Check `/api/auth/me` returns 200 (not 401)

**Test:**
```bash
# Should return 401 (not authenticated)
curl http://localhost:3000/api/auth/me

# Should return user data
curl http://localhost:3000/api/auth/me -b cookies.txt
```

### Issue: Logout doesn't work

**Check:**
- [ ] POST to `/api/auth/logout` returns 200
- [ ] Cookie is deleted (check DevTools)
- [ ] `/api/auth/me` returns 401 after logout

**Test:**
```bash
curl -X POST http://localhost:3000/api/auth/logout -b cookies.txt -v
```

Look for `Set-Cookie` header with empty value.

### Issue: Guest login not working

**Fix:** Make sure guest endpoint is being called:

```bash
curl -X POST http://localhost:3000/api/auth/guest -c cookies.txt
```

## 📝 Database Verification

### Check users exist

```sql
SELECT username, role, password FROM users;
```

Expected output:
```
admin    | admin   | admin123
guest1   | guest   | guestpass
player1  | player  | playerpass
```

### Verify RLS policy

```sql
SELECT * FROM pg_policies WHERE tablename = 'users';
```

Should show:
- `Allow SELECT for custom auth` with `USING (true)`

### Check indexes

```sql
SELECT * FROM pg_indexes WHERE tablename = 'users';
```

Should show:
- `idx_users_username`
- `idx_users_role`

## 🔧 Quick Fixes

### RLS blocking queries

```sql
-- Remove old policies
DROP POLICY IF EXISTS "Users can read their own data" ON public.users;
DROP POLICY IF EXISTS "Admins can read all user data" ON public.users;

-- Add permissive policy
CREATE POLICY "Allow SELECT for custom auth"
  ON public.users
  FOR SELECT
  USING (true);
```

### Recreate users table

```sql
-- Only if you need to reset everything
DROP TABLE IF EXISTS public.users CASCADE;

-- Then run the migration from: supabase/migrations/20250116000000_create_custom_auth.sql
```

### Reset user password

```sql
UPDATE users SET password = 'newpassword' WHERE username = 'admin';
```

### Create test users

```sql
INSERT INTO public.users (username, password, role) VALUES
  ('test1', 'password123', 'player'),
  ('test2', 'password123', 'admin'),
  ('test3', 'password123', 'guest');
```

## 📊 File Changes Applied

Files that send `credentials: "include"`:
- ✅ `src/app/(auth)/login/page.tsx`
- ✅ `src/app/(auth)/signup/page.tsx`
- ✅ `src/app/(auth)/guest/page.tsx`
- ✅ `src/components/auth/logout-button.tsx`
- ✅ `src/components/dashboard/dashboard-header.tsx` (FIXED)

Files that use useUser() correctly:
- ✅ `src/lib/context/user-context.tsx` (FIXED)
- ✅ `src/app/dashboard/page.tsx`
- ✅ `src/app/admin/page.tsx`

## 🚀 Next Steps After Testing

Once login works:

1. **Test all auth pages:**
   - `/login` → Login form
   - `/signup` → Registration form
   - `/guest` → Guest button
   - `/admin` → Admin panel (should redirect if not admin)
   - `/dashboard` → Protected page

2. **Test role-based access:**
   - Login as admin → Access `/admin`
   - Login as player → Cannot access `/admin`
   - Guest → Can access `/dashboard` but see guest notice

3. **Test redirects:**
   - Unauthenticated → `/ctf` redirects to `/login`
   - Authenticated → `/login` redirects to `/dashboard`
   - Non-admin → `/admin` redirects to `/`

## 📞 Still Having Issues?

1. Check browser console (F12 → Console) for JavaScript errors
2. Check Network tab for HTTP responses
3. Check Server terminal for error logs
4. Verify RLS policy with: `SELECT * FROM pg_policies WHERE tablename = 'users';`
5. Verify user exists: `SELECT * FROM users WHERE username = 'admin';`
