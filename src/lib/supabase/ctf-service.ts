import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ============================================
// EVENT OPERATIONS
// ============================================

export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getEventById(eventId: number) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .single();

  if (error) throw error;
  return data;
}

export async function getEventBySlug(slug: string) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data || null;
}

// ============================================
// CHALLENGE OPERATIONS
// ============================================

export async function getChallenges(eventId?: number) {
  let query = supabase.from("challenges").select("*");

  if (eventId) {
    query = query.eq("event_id", eventId);
  }

  const { data, error } = await query.order("series_order", {
    ascending: true,
  });

  if (error) throw error;
  return data;
}

export async function getChallengeById(challengeId: number) {
  const { data, error } = await supabase
    .from("challenges")
    .select(
      `
      *,
      challenge_resources (*)
    `
    )
    .eq("id", challengeId)
    .single();

  if (error) throw error;
  return data;
}

export async function getChallengesByEvent(eventId: number) {
  const { data, error } = await supabase
    .from("challenges")
    .select(
      `
      *,
      challenge_resources (*)
    `
    )
    .eq("event_id", eventId)
    .order("series_order", { ascending: true });

  if (error) throw error;
  return data;
}

// ============================================
// USER PROFILE OPERATIONS
// ============================================

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function createUserProfile(
  userId: string,
  username: string,
  email?: string
) {
  const { data, error } = await supabase
    .from("user_profiles")
    .insert({
      id: userId,
      display_name: username,
      email: email,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateUserProfile(
  userId: string,
  updates: {
    display_name?: string;
    avatar?: string;
    bio?: string;
    country?: string;
  }
) {
  const { data, error } = await supabase
    .from("user_profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// USER STATS OPERATIONS
// ============================================

export async function getUserStats(userId: string) {
  const { data, error } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function initializeUserStats(userId: string) {
  const { data, error } = await supabase
    .from("user_stats")
    .insert({
      user_id: userId,
      total_points: 0,
      ranking: 0,
      challenges_solved: 0,
      event_participations: 0,
      teams_membership: 0,
      current_streak: 0,
      longest_streak: 0,
      solve_rate: "0%",
    })
    .select()
    .single();

  if (error && error.code !== "23505") throw error; // 23505 = unique violation
  return data;
}

export async function updateUserStats(
  userId: string,
  updates: {
    total_points?: number;
    challenges_solved?: number;
    solve_rate?: string;
    current_streak?: number;
    longest_streak?: number;
  }
) {
  const { data, error } = await supabase
    .from("user_stats")
    .update(updates)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// CHALLENGE COMPLETION OPERATIONS
// ============================================

export async function completedChallenge(
  userId: string,
  challengeId: number,
  eventId: number,
  pointsEarned: number,
  timeSpentMinutes?: number,
  hintsUsed?: number
) {
  const { data, error } = await supabase
    .from("completed_challenges")
    .insert({
      user_id: userId,
      challenge_id: challengeId,
      event_id: eventId,
      points_earned: pointsEarned,
      time_spent_minutes: timeSpentMinutes || 0,
      hints_used: hintsUsed || 0,
    })
    .select()
    .single();

  if (error && error.code !== "23505") throw error; // Ignore if already completed
  return data;
}

export async function getCompletedChallenges(
  userId: string,
  eventId?: number
) {
  let query = supabase
    .from("completed_challenges")
    .select("*")
    .eq("user_id", userId);

  if (eventId) {
    query = query.eq("event_id", eventId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function isChallengeCompleted(
  userId: string,
  challengeId: number,
  eventId: number
): Promise<boolean> {
  const { data, error } = await supabase
    .from("completed_challenges")
    .select("id")
    .eq("user_id", userId)
    .eq("challenge_id", challengeId)
    .eq("event_id", eventId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return !!data;
}

// ============================================
// CHALLENGE SUBMISSION OPERATIONS
// ============================================

export async function submitChallenge(
  userId: string,
  challengeId: number,
  eventId: number,
  flag: string,
  isCorrect: boolean
) {
  const { data, error } = await supabase
    .from("challenge_submissions")
    .insert({
      user_id: userId,
      challenge_id: challengeId,
      event_id: eventId,
      flag,
      is_correct: isCorrect,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserChallengeSubmissions(
  userId: string,
  challengeId: number,
  eventId: number
) {
  const { data, error } = await supabase
    .from("challenge_submissions")
    .select("*")
    .eq("user_id", userId)
    .eq("challenge_id", challengeId)
    .eq("event_id", eventId)
    .order("submitted_at", { ascending: false });

  if (error) throw error;
  return data;
}

// ============================================
// CHALLENGE HINTS OPERATIONS
// ============================================

export async function recordHintUsage(
  userId: string,
  challengeId: number,
  hintIndex: number
) {
  const { data, error } = await supabase
    .from("user_challenge_hints")
    .insert({
      user_id: userId,
      challenge_id: challengeId,
      hint_index: hintIndex,
    })
    .select()
    .single();

  if (error && error.code !== "23505") throw error; // Ignore if already used
  return data;
}

export async function getUsedHints(userId: string, challengeId: number) {
  const { data, error } = await supabase
    .from("user_challenge_hints")
    .select("hint_index")
    .eq("user_id", userId)
    .eq("challenge_id", challengeId)
    .order("hint_index", { ascending: true });

  if (error) throw error;
  return data.map((d) => d.hint_index);
}

// ============================================
// ACHIEVEMENTS OPERATIONS
// ============================================

export async function getAchievements() {
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getUserAchievements(userId: string) {
  const { data, error } = await supabase
    .from("user_achievements")
    .select(
      `
      *,
      achievements (*)
    `
    )
    .eq("user_id", userId)
    .order("unlocked_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function unlockAchievement(userId: string, achievementId: string) {
  const { data, error } = await supabase
    .from("user_achievements")
    .insert({
      user_id: userId,
      achievement_id: achievementId,
    })
    .select()
    .single();

  if (error && error.code !== "23505") throw error; // Ignore if already unlocked
  return data;
}

// ============================================
// ACTIVITY OPERATIONS
// ============================================

export async function logActivity(
  userId: string,
  type: "challenge_solved" | "event_joined" | "rank_achieved" | "team_created" | "team_joined",
  title: string,
  description?: string
) {
  const { data, error } = await supabase
    .from("activities")
    .insert({
      user_id: userId,
      type,
      title,
      description,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserActivities(userId: string, limit: number = 10) {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("user_id", userId)
    .order("timestamp", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

// ============================================
// EVENT PARTICIPATION OPERATIONS
// ============================================

export async function joinEvent(userId: string, eventId: number) {
  const { data, error } = await supabase
    .from("event_participations")
    .insert({
      user_id: userId,
      event_id: eventId,
      status: "participating",
    })
    .select()
    .single();

  if (error && error.code !== "23505") throw error;
  return data;
}

export async function getUserEventParticipations(userId: string) {
  const { data, error } = await supabase
    .from("event_participations")
    .select(
      `
      *,
      events (*)
    `
    )
    .eq("user_id", userId)
    .order("joined_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getEventParticipation(userId: string, eventId: number) {
  const { data, error } = await supabase
    .from("event_participations")
    .select("*")
    .eq("user_id", userId)
    .eq("event_id", eventId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data || null;
}

export async function updateEventParticipation(
  userId: string,
  eventId: number,
  updates: {
    status?: "participating" | "completed" | "abandoned";
    score?: number;
    rank?: number;
  }
) {
  const { data, error } = await supabase
    .from("event_participations")
    .update(updates)
    .eq("user_id", userId)
    .eq("event_id", eventId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// TEAMS OPERATIONS
// ============================================

export async function createTeam(
  userId: string,
  name: string,
  description?: string,
  isPublic: boolean = true
) {
  const joinCode = generateJoinCode();

  const { data, error } = await supabase
    .from("teams")
    .insert({
      name,
      description,
      is_public: isPublic,
      join_code: joinCode,
      created_by: userId,
    })
    .select()
    .single();

  if (error) throw error;

  // Add creator as leader
  await addTeamMember(data.id, userId, "leader");

  return data;
}

export async function getTeams() {
  const { data, error } = await supabase
    .from("teams")
    .select(
      `
      *,
      team_members (*)
    `
    )
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getTeamById(teamId: string) {
  const { data, error } = await supabase
    .from("teams")
    .select(
      `
      *,
      team_members (
        *,
        users (*)
      )
    `
    )
    .eq("id", teamId)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserTeams(userId: string) {
  // First get the team IDs for this user
  const { data: teamMemberships, error: membershipsError } = await supabase
    .from("team_members")
    .select("team_id")
    .eq("user_id", userId);

  if (membershipsError) throw membershipsError;

  if (!teamMemberships || teamMemberships.length === 0) {
    return [];
  }

  const teamIds = teamMemberships.map((tm: any) => tm.team_id);

  // Then get the full team data
  const { data, error } = await supabase
    .from("teams")
    .select(
      `
      *,
      team_members (*)
    `
    )
    .in("id", teamIds);

  if (error) throw error;
  return data;
}

export async function addTeamMember(
  teamId: string,
  userId: string,
  role: "member" | "moderator" | "leader" = "member"
) {
  const { data, error } = await supabase
    .from("team_members")
    .insert({
      team_id: teamId,
      user_id: userId,
      role,
    })
    .select()
    .single();

  if (error && error.code !== "23505") throw error;
  return data;
}

export async function removeTeamMember(teamId: string, userId: string) {
  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("team_id", teamId)
    .eq("user_id", userId);

  if (error) throw error;
}

// ============================================
// USER SETTINGS OPERATIONS
// ============================================

export async function getUserSettings(userId: string) {
  const { data, error } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function updateUserSettings(
  userId: string,
  updates: {
    theme?: string;
    notifications_enabled?: boolean;
    email_notifications?: boolean;
    show_profile_public?: boolean;
    language?: string;
  }
) {
  const { data, error } = await supabase
    .from("user_settings")
    .update(updates)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function generateJoinCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function getLeaderboard(eventId?: number, limit: number = 100) {
  let query = supabase
    .from("completed_challenges")
    .select(
      `
      user_id,
      users (username),
      user_profiles (display_name, avatar),
      event_id
    `
    );

  if (eventId) {
    query = query.eq("event_id", eventId);
  }

  const { data, error } = await query;

  if (error) throw error;

  // Group and aggregate scores
  const scores = new Map<
    string,
    { userId: string; username: string; displayName: string; avatar?: string; totalPoints: number }
  >();

  for (const entry of data) {
    const userId = entry.user_id;
    const username = (entry as any).users?.username;
    const displayName = (entry as any).user_profiles?.display_name;
    const avatar = (entry as any).user_profiles?.avatar;

    if (!scores.has(userId)) {
      scores.set(userId, {
        userId,
        username: username || "",
        displayName: displayName || username || "",
        avatar,
        totalPoints: 0,
      });
    }
  }

  return Array.from(scores.values())
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, limit);
}
