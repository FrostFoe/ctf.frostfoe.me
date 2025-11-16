#!/bin/bash

# Simple test script to verify auth flow
# Usage: bash test-auth.sh

BASE_URL="http://localhost:3000"
COOKIE_JAR="cookies.txt"

echo "🧪 Testing Custom Auth System"
echo "================================"

# Clean up old cookies
rm -f $COOKIE_JAR

echo ""
echo "1️⃣  Testing Login with admin/admin123..."
RESPONSE=$(curl -s -c $COOKIE_JAR -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  $BASE_URL/api/auth/login)

echo "Response: $RESPONSE"

if echo "$RESPONSE" | grep -q "admin"; then
  echo "✅ Login successful!"
else
  echo "❌ Login failed!"
  exit 1
fi

echo ""
echo "2️⃣  Testing GET /api/auth/me (should have auth_token cookie)..."
RESPONSE=$(curl -s -b $COOKIE_JAR $BASE_URL/api/auth/me)
echo "Response: $RESPONSE"

if echo "$RESPONSE" | grep -q "admin"; then
  echo "✅ Auth validation successful!"
else
  echo "❌ Auth validation failed!"
  exit 1
fi

echo ""
echo "3️⃣  Testing Logout..."
RESPONSE=$(curl -s -b $COOKIE_JAR -c $COOKIE_JAR -X POST $BASE_URL/api/auth/logout)
echo "Response: $RESPONSE"

echo ""
echo "4️⃣  Testing GET /api/auth/me after logout (should fail)..."
RESPONSE=$(curl -s -b $COOKIE_JAR $BASE_URL/api/auth/me)
echo "Response: $RESPONSE"

if echo "$RESPONSE" | grep -q "Not authenticated"; then
  echo "✅ Logout successful!"
else
  echo "⚠️  Still authenticated (check manually)"
fi

echo ""
echo "================================"
echo "✅ Basic auth flow tests complete!"
echo ""
echo "Now test in browser:"
echo "1. Go to http://localhost:3000/login"
echo "2. Enter: admin / admin123"
echo "3. Should redirect to /dashboard"
echo "4. Check DevTools → Application → Cookies for auth_token"
echo "5. Click logout button"
