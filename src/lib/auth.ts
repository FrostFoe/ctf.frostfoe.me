import crypto from "crypto";
import { supabaseAdmin } from "./supabase";
import { sanitize } from "./utils";

export interface User {
  id: string;
  username: string;
  password?: string;
  role: "player" | "admin";
}

interface SupabaseUser {
  id: string;
  username: string;
  password?: string;
  role: "player" | "admin";
  created_at?: string;
  updated_at?: string;
}

/**
 * Convert Supabase user row to User interface (password omitted)
 */
function formatUser(dbUser: SupabaseUser): Omit<User, "password"> {
  return {
    id: dbUser.id,
    username: dbUser.username,
    role: dbUser.role,
  };
}

/**
 * In this setup passwords are stored as plaintext (not recommended) and compared directly.
 */
function hashPassword(password: string): Promise<string> {
  // Not hashing; just return the plaintext password so interface is preserved
  return Promise.resolve(password);
}

function comparePassword(password: string, stored: string): Promise<boolean> {
  return Promise.resolve(password === stored);
}

/**
 * Login user with username and password
 */
export async function login(credentials: {
  username: string;
  password: string;
}) {
  const { username, password } = credentials;

  if (!username || !password) {
    return { error: "Username and password are required", status: 400 };
  }

  if (!supabaseAdmin) {
    return { error: "Database not configured", status: 500 };
  }

  const sanitizedUsername = sanitize(username);
  const sanitizedPassword = sanitize(password);

  try {
    // Find user by username
    const { data: users, error: fetchError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("username", sanitizedUsername)
      .limit(1);

    if (fetchError || !users || users.length === 0) {
      return { error: "Invalid credentials", status: 401 };
    }

    const user = users[0] as SupabaseUser;

    // Verify password
    const isValid = await comparePassword(sanitizedPassword, user.password || "");

    if (!isValid) {
      return { error: "Invalid credentials", status: 401 };
    }

    // Create session token
    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    // Store session in database
    const { error: sessionError } = await supabaseAdmin
      .from("sessions")
      .insert({
        user_id: user.id,
        session_token: sessionToken,
        expires_at: expiresAt.toISOString(),
      });

    if (sessionError) {
      console.error("Session creation error:", sessionError);
      return { error: "Failed to create session", status: 500 };
    }

    return {
      user: formatUser(user),
      sessionId: sessionToken,
    };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Internal server error", status: 500 };
  }
}

/**
 * Sign up new user
 */
export async function signup(credentials: {
  username: string;
  password: string;
}) {
  const { username, password } = credentials;

  if (!username || !password) {
    return { error: "Username and password are required", status: 400 };
  }

  if (!supabaseAdmin) {
    return { error: "Database not configured", status: 500 };
  }

  const sanitizedUsername = sanitize(username);
  const sanitizedPassword = sanitize(password);

  if (sanitizedPassword.length < 6) {
    return { error: "Password must be at least 6 characters", status: 400 };
  }

  try {
    // Check if user exists
    const { data: existing } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("username", sanitizedUsername)
      .limit(1);

    if (existing && existing.length > 0) {
      return { error: "Username already exists", status: 409 };
    }

    // Hash password
    const passwordHash = await hashPassword(sanitizedPassword);

    // Create new user
    const { data: newUserData, error: createError } = await supabaseAdmin
      .from("users")
      .insert({
        username: sanitizedUsername,
        password: passwordHash,
        role: "player",
      })
      .select()
      .single();

    if (createError || !newUserData) {
      console.error("User creation error:", createError);
      return { error: "Failed to create user", status: 500 };
    }

    const newUser = newUserData as SupabaseUser;

    // Create session token
    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    // Store session
    const { error: sessionError } = await supabaseAdmin
      .from("sessions")
      .insert({
        user_id: newUser.id,
        session_token: sessionToken,
        expires_at: expiresAt.toISOString(),
      });

    if (sessionError) {
      console.error("Session creation error:", sessionError);
      return { error: "Failed to create session", status: 500 };
    }

    return {
      user: formatUser(newUser),
      sessionId: sessionToken,
    };
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "Internal server error", status: 500 };
  }
}

/**
 * Logout user by removing session
 */
export async function logout(sessionId: string) {
  if (!sessionId || !supabaseAdmin) {
    return { success: true };
  }

  try {
    const { error } = await supabaseAdmin
      .from("sessions")
      .delete()
      .eq("session_token", sessionId);

    if (error) {
      console.error("Logout error:", error);
    }

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: true };
  }
}

/**
 * Get current user from session
 */
export async function getMe(sessionId: string) {
  if (!sessionId || !supabaseAdmin) {
    return { user: null };
  }

  try {
    // Find session
    const { data: sessions, error: sessionError } = await supabaseAdmin
      .from("sessions")
      .select("user_id, expires_at")
      .eq("session_token", sessionId)
      .single();

    if (sessionError || !sessions) {
      return { user: null };
    }

    // Check if session is expired
    if (new Date(sessions.expires_at) < new Date()) {
      // Delete expired session
      await supabaseAdmin
        .from("sessions")
        .delete()
        .eq("session_token", sessionId);

      return { user: null };
    }

    // Get user data
    const { data: user, error: userError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("id", sessions.user_id)
      .single();

    if (userError || !user) {
      return { user: null };
    }

    // Update last activity
    await supabaseAdmin
      .from("sessions")
      .update({ last_activity: new Date().toISOString() })
      .eq("session_token", sessionId);

    return {
      user: formatUser(user as SupabaseUser),
    };
  } catch (error) {
    console.error("GetMe error:", error);
    return { user: null };
  }
}
