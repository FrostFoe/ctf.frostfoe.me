# Supabase Auth Migration Guide

## Overview
User authentication data has been migrated from `data.json` to Supabase. Events, challenges, and other CTF data remain in `data.json`.

**What moved to Supabase:**
- Users table (id, username, password_hash, role, timestamps)
- Sessions table (session tokens, expiry, user references)

**What stays in data.json:**
- Events
- Challenges
- Achievements
- All other CTF-related data

## Setup Steps

### 1. Create Supabase Project
- Go to https://supabase.com and create a new project
- Save your project credentials

### 2. Run SQL Migrations
- Open Supabase SQL Editor
- Copy and paste the contents of `supabase.sql`
- Execute the SQL

This creates:
- `users` table with fields: id, username, password_hash, role, created_at, updated_at
- `sessions` table with fields: id, user_id, session_token, created_at, expires_at, last_activity
- Proper indexes and foreign key constraints

### 3. Set Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Install Dependencies
```bash
pnpm install
```

### 5. Test the Migration
```bash
pnpm dev
```

Try logging in with:
- Username: `demo` / Password: `demo` (player)
- Username: `admin` / Password: `admin` (admin)

## Database Schema

### users table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'player',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### sessions table
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Auth Flow

1. **Login**: 
   - Query `users` table by username
   - Compare bcrypt password hash
   - Create session token, store in `sessions` table
   - Return session token as cookie

2. **Session Validation**:
   - Check `sessions` table for valid token
   - Verify expiry
   - Update last_activity

3. **Logout**:
   - Delete session from `sessions` table

## API Functions

All functions in `src/lib/auth.ts` now use Supabase:

```typescript
export async function login(credentials: { username: string; password: string })
export async function signup(credentials: { username: string; password: string })
export async function logout(sessionId: string)
export async function getMe(sessionId: string)
```

## Security Notes

✅ **Implemented:**
- Bcrypt password hashing (10 rounds)
- Session expiry (7 days)
- httpOnly cookies
- Last activity tracking

📝 **Consider Adding:**
- CSRF protection with CSRF tokens
- Rate limiting on auth endpoints
- Session refresh mechanism
- Password strength validation
- Email verification on signup
- Two-factor authentication

## Troubleshooting

**"Database not configured" error:**
- Check `.env.local` has all three environment variables
- Restart dev server after setting env vars

**Login fails with "Invalid credentials":**
- Verify users were created in SQL migration
- Check password hashes (demo/admin users have bcrypt hashes included in SQL)

**Sessions not persisting:**
- Verify `sessions` table exists in Supabase
- Check `expires_at` timestamp is in future

## Files Changed

- `src/lib/auth.ts` - Migrated to Supabase queries
- `src/lib/supabase.ts` - New Supabase client configuration
- `supabase.sql` - New SQL migration file
- `package.json` - Added @supabase/supabase-js dependency
- `.env.local.example` - Environment variable template

## Rollback

If you need to revert to file-based auth:
1. Restore `src/lib/auth.ts.backup`
2. Remove `src/lib/supabase.ts`
3. Restore users/sessions data to `data.json`
