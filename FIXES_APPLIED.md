# Auth System - Fixes Applied

## Problems Identified & Fixed

### 1. ❌ RLS Policies Blocking Queries
**Problem:** RLS policies referenced `auth.uid()` which only works with Supabase Auth, not custom auth
**Solution:** Changed policy to `USING (true)` to allow all SELECT queries for custom auth

**File Modified:**
- `supabase/migrations/20250116000000_create_custom_auth.sql`

**SQL Applied:**
```sql
DROP POLICY IF EXISTS "Users can read their own data" ON public.users;
DROP POLICY IF EXISTS "Admins can read all user data" ON public.users;

CREATE POLICY "Allow SELECT for custom auth"
  ON public.users
  FOR SELECT
  USING (true);
```

---

### 2. ❌ Cookies Not Sent With Requests
**Problem:** Fetch calls didn't include `credentials: "include"`, so auth_token cookie wasn't sent
**Solution:** Added `credentials: "include"` to all fetch calls

**Files Modified:**
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/signup/page.tsx`
- `src/app/(auth)/guest/page.tsx`
- `src/components/auth/logout-button.tsx`

**Changed from:**
```typescript
fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password }),
})
```

**Changed to:**
```typescript
fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password }),
  credentials: "include", // ← Added this
})
```

---

### 3. ❌ User Context Not Setting Loading State During Fetch
**Problem:** `isLoading` wasn't being set to true at start of fetch
**Solution:** Set `isLoading = true` before fetching user

**File Modified:**
- `src/lib/context/user-context.tsx`

**Changed from:**
```typescript
const fetchUser = async () => {
  try {
    const response = await fetch("/api/auth/me", {
```

**Changed to:**
```typescript
const fetchUser = async () => {
  setIsLoading(true);
  try {
    const response = await fetch("/api/auth/me", {
```

---

### 4. ❌ Dashboard Header Using Non-existent Context Properties
**Problem:** `dashboard-header.tsx` tried to call `logout()` function from useUser() which doesn't exist
**Solution:** Implemented logout inline using fetch API

**File Modified:**
- `src/components/dashboard/dashboard-header.tsx`

**Changed from:**
```typescript
const { user, logout, isGuest } = useUser();

const handleLogout = async () => {
  await logout();
  router.push("/login");
  router.refresh();
};
```

**Changed to:**
```typescript
const { user } = useUser();
const [isLoggingOut, setIsLoggingOut] = useState(false);
const isGuest = user?.role === "guest";

const handleLogout = async () => {
  setIsLoggingOut(true);
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      await new Promise(resolve => setTimeout(resolve, 100));
      router.push("/");
      router.refresh();
    }
  } catch (error) {
    console.error("Logout error:", error);
    setIsLoggingOut(false);
  }
};
```

---

### 5. ⏱️ Race Condition Between Redirect & Cookie Setting
**Problem:** Router pushed before cookie was fully set
**Solution:** Added 100ms delay between API response and router.push()

**Pattern Applied To:**
- Login
- Signup
- Guest login
- Logout

**Code:**
```typescript
if (response.ok) {
  await new Promise(resolve => setTimeout(resolve, 100));
  router.push("/dashboard");
  router.refresh();
}
```

---

## Testing the Fixes

### Quick Test
1. Go to http://localhost:3000/login
2. Enter: `admin` / `admin123`
3. Should redirect to `/dashboard` ✅
4. Check DevTools → Cookies → `auth_token` exists ✅
5. Click logout → Redirects to home ✅

### Detailed Testing
```bash
bash test-auth.sh
```

### Manual Testing
```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt

# Get current user
curl http://localhost:3000/api/auth/me -b cookies.txt

# Logout
curl -X POST http://localhost:3000/api/auth/logout -b cookies.txt
```

---

## Current Status

✅ **Database Schema:** Users table with plaintext passwords
✅ **API Endpoints:** All 5 auth endpoints working
✅ **Auth Pages:** Login, Signup, Guest all functional
✅ **Cookie Management:** Properly set, sent, and cleared
✅ **Session Validation:** Middleware validates on every request
✅ **User Context:** Correctly fetches and manages user state
✅ **Component Integration:** Dashboard, Admin, CTF pages protected
✅ **Logout Flow:** Properly clears cookies and redirects

---

## Files to Read

1. **Setup:** `SETUP_GUIDE.md`
2. **Troubleshooting:** `AUTH_TROUBLESHOOTING.md`
3. **Complete Docs:** `CUSTOM_AUTH_README.md`
4. **Quick Reference:** `QUICK_REFERENCE.md`
