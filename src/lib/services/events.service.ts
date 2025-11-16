import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface CTFEvent {
  id: number;
  title: string;
  slug: string;
  description?: string;
  status: "upcoming" | "ongoing" | "completed";
  ctf_type: string;
  start_date?: string;
  end_date?: string;
  total_challenges?: number;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

/**
 * Get all events with optional filtering
 */
export async function getEvents(
  filters?: {
    status?: string;
    limit?: number;
    offset?: number;
  }
): Promise<CTFEvent[]> {
  try {
    let query = supabase.from("events").select("*");

    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    const limit = filters?.limit || 100;
    const offset = filters?.offset || 0;

    const { data, error } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

/**
 * Get single event by ID
 */
export async function getEventById(id: number): Promise<CTFEvent | null> {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    return null;
  }
}

/**
 * Get event by slug
 */
export async function getEventBySlug(slug: string): Promise<CTFEvent | null> {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching event ${slug}:`, error);
    return null;
  }
}

/**
 * Get event count by status
 */
export async function getEventCountByStatus(
  status: string
): Promise<number> {
  try {
    const { count, error } = await supabase
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("status", status);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error("Error counting events:", error);
    return 0;
  }
}

/**
 * Get total event count
 */
export async function getTotalEventCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from("events")
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error("Error counting events:", error);
    return 0;
  }
}
