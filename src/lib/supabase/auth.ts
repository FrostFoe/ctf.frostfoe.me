/**
 * Custom Authentication Service (No Supabase Auth)
 * Uses Supabase as database only. Manages user login/signup/logout with manual cookies.
 */

import { cookies } from "next/headers";
import { createClient } from "./server";
import type { Database } from "@/types/database";

export type User = Database["public"]["Tables"]["users"]["Row"];

/**
 * Sign up a new user
 * @param username - Username (must be unique)
 * @param password - Plain text password
 * @returns User object if successful, null if username already exists
 */
export async function signUp(
  username: string,
  password: string,
): Promise<User | null> {
  const supabase = await createClient();

  try {
    // Check if username already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .single();

    if (existingUser) {
      return null; // Username already taken
    }

    // Insert new user with default role "player"
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          username,
          password, // Plain text storage (intentional for CTF)
          role: "player",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Sign up error:", error);
      return null;
    }

    return data as User;
  } catch (error) {
    console.error("Sign up exception:", error);
    return null;
  }
}

/**
 * Log in a user
 * @param username - Username
 * @param password - Plain text password
 * @returns User object if credentials match, null otherwise
 */
export async function login(
  username: string,
  password: string,
): Promise<User | null> {
  const supabase = await createClient();

  try {
    // Query user by username and password (plain text match)
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();

    if (error || !data) {
      return null; // Invalid credentials
    }

    return data as User;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

/**
 * Create a guest session
 * @returns Guest user object
 */
export async function createGuestSession(): Promise<User | null> {
  const supabase = await createClient();

  try {
    // Create a guest user with a unique username
    const guestUsername = `guest_${Date.now()}`;

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          username: guestUsername,
          password: "guest", // Placeholder password for guests
          role: "guest",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Guest session error:", error);
      return null;
    }

    return data as User;
  } catch (error) {
    console.error("Guest session exception:", error);
    return null;
  }
}

/**
 * Set authentication cookie with user ID
 * @param userId - User ID to store in cookie
 */
export async function setAuthCookie(userId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

/**
 * Get user from auth cookie
 * @returns User object if cookie exists and is valid, null otherwise
 */
export async function getUserFromCookie(): Promise<User | null> {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", token)
      .single();

    if (error || !data) {
      // Clear invalid cookie
      clearAuthCookie();
      return null;
    }

    return data as User;
  } catch (error) {
    console.error("Get user from cookie error:", error);
    return null;
  }
}

/**
 * Clear authentication cookie
 */
export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}

/**
 * Get user by ID
 * @param userId - User ID
 * @returns User object if found, null otherwise
 */
export async function getUserById(userId: string): Promise<User | null> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) {
      return null;
    }

    return data as User;
  } catch (error) {
    console.error("Get user by ID error:", error);
    return null;
  }
}

/**
 * Log out user (clear cookie)
 */
export async function logout(): Promise<void> {
  await clearAuthCookie();
}
