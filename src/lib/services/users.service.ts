import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface User {
  id: number;
  username: string;
  email?: string;
  role: "user" | "organizer" | "admin";
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

/**
 * Get all users with optional filtering
 */
export async function getUsers(
  filters?: {
    role?: string;
    limit?: number;
    offset?: number;
  }
): Promise<User[]> {
  try {
    let query = supabase.from("users").select("*");

    if (filters?.role) {
      query = query.eq("role", filters.role);
    }

    const limit = filters?.limit || 100;
    const offset = filters?.offset || 0;

    const { data, error } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

/**
 * Get single user by ID
 */
export async function getUserById(id: number): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    return null;
  }
}

/**
 * Get user by username
 */
export async function getUserByUsername(username: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching user ${username}:`, error);
    return null;
  }
}

/**
 * Get user count by role
 */
export async function getUserCountByRole(role: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", role);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error("Error counting users:", error);
    return 0;
  }
}

/**
 * Get total user count
 */
export async function getTotalUserCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error("Error counting users:", error);
    return 0;
  }
}

/**
 * Get user stats
 */
export async function getUserStats(): Promise<{
  total: number;
  admins: number;
  organizers: number;
  users: number;
}> {
  try {
    const total = await getTotalUserCount();
    const admins = await getUserCountByRole("admin");
    const organizers = await getUserCountByRole("organizer");
    const users = total - admins - organizers;

    return { total, admins, organizers, users };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return { total: 0, admins: 0, organizers: 0, users: 0 };
  }
}
