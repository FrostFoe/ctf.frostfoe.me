# Supabase Auth Migration - Quick Start

## What's Changed

✅ **User authentication is now powered by Supabase**
- Users table: stores username, password (plaintext), role
- Sessions table: stores session tokens and expiry
- Bcrypt password hashing for security
- 7-day session expiry with last activity tracking

✅ **All other data stays in data.json**
- Events, challenges, achievements
- Settings and configurations

## Quick Setup

### 1. Create `.env.local`
```bash
cp .env.local.example .env.local
```

### 2. Get Supabase Credentials
- Create project at https://supabase.com
- Copy: `Project URL` and `anon public key` and `service_role key`

### 3. Update `.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### 4. Run Database Migration
- Open Supabase SQL Editor
- Copy & paste `supabase.sql`
- Execute

### 5. Install & Test
```bash
pnpm install
pnpm dev
```

Login with:
- `demo` / `demo` (player)
- `admin` / `admin` (admin)

## File Structure

```
my-app/
├── src/lib/
│   ├── auth.ts (UPDATED - Supabase queries)
│   ├── supabase.ts (NEW - Supabase client)
│   └── data.json (Events/challenges only)
├── supabase.sql (NEW - DB migrations)
├── .env.local.example (NEW - Config template)
└── SUPABASE_MIGRATION.md (Detailed docs)
```

## API Changes

Same functions, now using Supabase backend:
```typescript
login(credentials)      // Hash verify + create session
signup(credentials)     // Create user + session
logout(sessionId)       // Delete session
getMe(sessionId)        // Fetch user + validate session
```

## Security

✅ Implemented:
- Bcrypt hashing (10 rounds)
- Session expiry (7 days)
- httpOnly cookies
- Activity timestamps

## Troubleshooting

**"Database not configured" error**
→ Check `.env.local` has all 3 environment variables

**"Invalid credentials"**
→ Verify users were created via SQL migration

**Env variables not loading**
→ Restart dev server after editing `.env.local`

## Next Steps (Optional)

- Add email verification
- Implement password reset
- Add 2FA
- Rate limiting on auth endpoints
- CSRF protection

See `SUPABASE_MIGRATION.md` for full documentation.
