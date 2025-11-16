import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Challenge {
  id: number;
  title: string;
  description?: string;
  category: string;
  difficulty: string;
  points: number;
  event_id: number;
  flag?: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

/**
 * Get all challenges with optional filtering
 */
export async function getChallenges(
  filters?: {
    event_id?: number;
    category?: string;
    difficulty?: string;
    limit?: number;
    offset?: number;
  }
): Promise<Challenge[]> {
  try {
    let query = supabase
      .from("challenges")
      .select("*")
      .order("points", { ascending: false });

    if (filters?.event_id) {
      query = query.eq("event_id", filters.event_id);
    }
    if (filters?.category) {
      query = query.eq("category", filters.category);
    }
    if (filters?.difficulty) {
      query = query.eq("difficulty", filters.difficulty);
    }

    const limit = filters?.limit || 100;
    const offset = filters?.offset || 0;

    const { data, error } = await query
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return [];
  }
}

/**
 * Get challenges by event
 */
export async function getChallengesByEvent(eventId: number): Promise<Challenge[]> {
  try {
    const { data, error } = await supabase
      .from("challenges")
      .select("*")
      .eq("event_id", eventId)
      .order("points", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error fetching challenges for event ${eventId}:`, error);
    return [];
  }
}

/**
 * Get single challenge by ID
 */
export async function getChallengeById(id: number): Promise<Challenge | null> {
  try {
    const { data, error } = await supabase
      .from("challenges")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching challenge ${id}:`, error);
    return null;
  }
}

/**
 * Get challenge count by event
 */
export async function getChallengeCountByEvent(eventId: number): Promise<number> {
  try {
    const { count, error } = await supabase
      .from("challenges")
      .select("*", { count: "exact", head: true })
      .eq("event_id", eventId);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error("Error counting challenges:", error);
    return 0;
  }
}

/**
 * Get total challenge count
 */
export async function getTotalChallengeCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from("challenges")
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error("Error counting challenges:", error);
    return 0;
  }
}
