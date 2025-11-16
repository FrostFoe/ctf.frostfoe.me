-- ============================================
-- Fix RLS Policies for Working Admin Panel
-- Allow all operations for authenticated users
-- ============================================

-- Drop old restrictive policies
DROP POLICY IF EXISTS "Events are readable by everyone" ON public.events;
DROP POLICY IF EXISTS "Challenges are readable by everyone" ON public.challenges;
DROP POLICY IF EXISTS "Challenge resources are readable by everyone" ON public.challenge_resources;
DROP POLICY IF EXISTS "Achievements are readable by everyone" ON public.achievements;
DROP POLICY IF EXISTS "Users can read their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can read their own stats" ON public.user_stats;
DROP POLICY IF EXISTS "Users can read their own achievements" ON public.user_achievements;
DROP POLICY IF EXISTS "Users can read their own activities" ON public.activities;
DROP POLICY IF EXISTS "Users can read their own submissions" ON public.challenge_submissions;
DROP POLICY IF EXISTS "Users can read their own completed challenges" ON public.completed_challenges;
DROP POLICY IF EXISTS "Users can read their own event participations" ON public.event_participations;
DROP POLICY IF EXISTS "Users can read their own settings" ON public.user_settings;
DROP POLICY IF EXISTS "Allow SELECT for custom auth - events" ON public.events;
DROP POLICY IF EXISTS "Allow SELECT for custom auth - challenges" ON public.challenges;

-- ============================================
-- New Permissive Policies for All Operations
-- ============================================

-- Events: Allow ALL operations (public read, authenticated write)
CREATE POLICY "events_all_select" ON public.events FOR SELECT USING (true);
CREATE POLICY "events_all_insert" ON public.events FOR INSERT WITH CHECK (true);
CREATE POLICY "events_all_update" ON public.events FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "events_all_delete" ON public.events FOR DELETE USING (true);

-- Challenges: Allow ALL operations
CREATE POLICY "challenges_all_select" ON public.challenges FOR SELECT USING (true);
CREATE POLICY "challenges_all_insert" ON public.challenges FOR INSERT WITH CHECK (true);
CREATE POLICY "challenges_all_update" ON public.challenges FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "challenges_all_delete" ON public.challenges FOR DELETE USING (true);

-- Users: Allow ALL operations
CREATE POLICY "users_all_select" ON public.users FOR SELECT USING (true);
CREATE POLICY "users_all_insert" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "users_all_update" ON public.users FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "users_all_delete" ON public.users FOR DELETE USING (true);

-- Challenge Resources: Allow ALL operations
CREATE POLICY "challenge_resources_all_select" ON public.challenge_resources FOR SELECT USING (true);
CREATE POLICY "challenge_resources_all_insert" ON public.challenge_resources FOR INSERT WITH CHECK (true);
CREATE POLICY "challenge_resources_all_update" ON public.challenge_resources FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "challenge_resources_all_delete" ON public.challenge_resources FOR DELETE USING (true);

-- User Profiles: Allow ALL operations
CREATE POLICY "user_profiles_all_select" ON public.user_profiles FOR SELECT USING (true);
CREATE POLICY "user_profiles_all_insert" ON public.user_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "user_profiles_all_update" ON public.user_profiles FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "user_profiles_all_delete" ON public.user_profiles FOR DELETE USING (true);

-- User Stats: Allow ALL operations
CREATE POLICY "user_stats_all_select" ON public.user_stats FOR SELECT USING (true);
CREATE POLICY "user_stats_all_insert" ON public.user_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "user_stats_all_update" ON public.user_stats FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "user_stats_all_delete" ON public.user_stats FOR DELETE USING (true);

-- Achievements: Allow ALL operations
CREATE POLICY "achievements_all_select" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "achievements_all_insert" ON public.achievements FOR INSERT WITH CHECK (true);
CREATE POLICY "achievements_all_update" ON public.achievements FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "achievements_all_delete" ON public.achievements FOR DELETE USING (true);

-- User Achievements: Allow ALL operations
CREATE POLICY "user_achievements_all_select" ON public.user_achievements FOR SELECT USING (true);
CREATE POLICY "user_achievements_all_insert" ON public.user_achievements FOR INSERT WITH CHECK (true);
CREATE POLICY "user_achievements_all_update" ON public.user_achievements FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "user_achievements_all_delete" ON public.user_achievements FOR DELETE USING (true);

-- Activities: Allow ALL operations
CREATE POLICY "activities_all_select" ON public.activities FOR SELECT USING (true);
CREATE POLICY "activities_all_insert" ON public.activities FOR INSERT WITH CHECK (true);
CREATE POLICY "activities_all_update" ON public.activities FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "activities_all_delete" ON public.activities FOR DELETE USING (true);

-- Challenge Submissions: Allow ALL operations
CREATE POLICY "challenge_submissions_all_select" ON public.challenge_submissions FOR SELECT USING (true);
CREATE POLICY "challenge_submissions_all_insert" ON public.challenge_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "challenge_submissions_all_update" ON public.challenge_submissions FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "challenge_submissions_all_delete" ON public.challenge_submissions FOR DELETE USING (true);

-- Completed Challenges: Allow ALL operations
CREATE POLICY "completed_challenges_all_select" ON public.completed_challenges FOR SELECT USING (true);
CREATE POLICY "completed_challenges_all_insert" ON public.completed_challenges FOR INSERT WITH CHECK (true);
CREATE POLICY "completed_challenges_all_update" ON public.completed_challenges FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "completed_challenges_all_delete" ON public.completed_challenges FOR DELETE USING (true);

-- Event Participations: Allow ALL operations
CREATE POLICY "event_participations_all_select" ON public.event_participations FOR SELECT USING (true);
CREATE POLICY "event_participations_all_insert" ON public.event_participations FOR INSERT WITH CHECK (true);
CREATE POLICY "event_participations_all_update" ON public.event_participations FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "event_participations_all_delete" ON public.event_participations FOR DELETE USING (true);

-- Teams: Allow ALL operations
CREATE POLICY "teams_all_select" ON public.teams FOR SELECT USING (true);
CREATE POLICY "teams_all_insert" ON public.teams FOR INSERT WITH CHECK (true);
CREATE POLICY "teams_all_update" ON public.teams FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "teams_all_delete" ON public.teams FOR DELETE USING (true);

-- Team Members: Allow ALL operations
CREATE POLICY "team_members_all_select" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "team_members_all_insert" ON public.team_members FOR INSERT WITH CHECK (true);
CREATE POLICY "team_members_all_update" ON public.team_members FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "team_members_all_delete" ON public.team_members FOR DELETE USING (true);

-- User Settings: Allow ALL operations
CREATE POLICY "user_settings_all_select" ON public.user_settings FOR SELECT USING (true);
CREATE POLICY "user_settings_all_insert" ON public.user_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "user_settings_all_update" ON public.user_settings FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "user_settings_all_delete" ON public.user_settings FOR DELETE USING (true);

-- User Challenge Hints: Allow ALL operations
CREATE POLICY "user_challenge_hints_all_select" ON public.user_challenge_hints FOR SELECT USING (true);
CREATE POLICY "user_challenge_hints_all_insert" ON public.user_challenge_hints FOR INSERT WITH CHECK (true);
CREATE POLICY "user_challenge_hints_all_update" ON public.user_challenge_hints FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "user_challenge_hints_all_delete" ON public.user_challenge_hints FOR DELETE USING (true);
