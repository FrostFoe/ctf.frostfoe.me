-- ============================================
-- Complete CTF Platform Schema
-- Full migration from localStorage/JSON to Supabase
-- ============================================

-- Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  image TEXT,
  badge TEXT,
  status TEXT NOT NULL CHECK (status IN ('upcoming', 'ongoing', 'ended')),
  ctf_type TEXT NOT NULL CHECK (ctf_type IN ('series', 'jeopardy', 'other')),
  format TEXT,
  total_challenges BIGINT DEFAULT 0,
  players_count BIGINT DEFAULT 0,
  teams_count BIGINT DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE,
  start_time TEXT,
  end_date TIMESTAMP WITH TIME ZONE,
  end_time TEXT,
  team_size_min BIGINT,
  team_size_max BIGINT,
  difficulty TEXT,
  skill_level TEXT,
  type TEXT,
  location TEXT,
  hosted_by TEXT,
  hosted_by_logo TEXT,
  rules TEXT,
  prizes TEXT[],
  player_avatars TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenges Table
CREATE TABLE IF NOT EXISTS public.challenges (
  id BIGSERIAL PRIMARY KEY,
  event_id BIGINT NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  series_id TEXT,
  series_order BIGINT,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  difficulty TEXT CHECK (difficulty IN ('সহজ', 'মধ্যম', 'কঠিন')),
  points BIGINT NOT NULL,
  solves_count BIGINT DEFAULT 0,
  success_rate TEXT,
  author TEXT,
  flag TEXT NOT NULL,
  alternate_flags TEXT[],
  tags TEXT[],
  hints TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenge Resources Table
CREATE TABLE IF NOT EXISTS public.challenge_resources (
  id BIGSERIAL PRIMARY KEY,
  challenge_id BIGINT NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT,
  size BIGINT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Profiles Table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar TEXT,
  bio TEXT,
  email TEXT,
  country TEXT,
  join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Statistics Table
CREATE TABLE IF NOT EXISTS public.user_stats (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  total_points BIGINT DEFAULT 0,
  ranking BIGINT DEFAULT 0,
  challenges_solved BIGINT DEFAULT 0,
  event_participations BIGINT DEFAULT 0,
  teams_membership BIGINT DEFAULT 0,
  current_streak BIGINT DEFAULT 0,
  longest_streak BIGINT DEFAULT 0,
  solve_rate TEXT DEFAULT '0%',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements Table
CREATE TABLE IF NOT EXISTS public.achievements (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  rarity TEXT CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Achievements Table
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Activities Table
CREATE TABLE IF NOT EXISTS public.activities (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('challenge_solved', 'event_joined', 'rank_achieved', 'team_created', 'team_joined')),
  title TEXT NOT NULL,
  description TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenge Submissions Table
CREATE TABLE IF NOT EXISTS public.challenge_submissions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  challenge_id BIGINT NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  event_id BIGINT NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  flag TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Completed Challenges Table (for user progress)
CREATE TABLE IF NOT EXISTS public.completed_challenges (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  challenge_id BIGINT NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  event_id BIGINT NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  solved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  time_spent_minutes BIGINT DEFAULT 0,
  points_earned BIGINT NOT NULL,
  hints_used BIGINT DEFAULT 0,
  UNIQUE(user_id, challenge_id, event_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event Participations Table
CREATE TABLE IF NOT EXISTS public.event_participations (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  event_id BIGINT NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT CHECK (status IN ('participating', 'completed', 'abandoned')) DEFAULT 'participating',
  score BIGINT DEFAULT 0,
  rank BIGINT DEFAULT 0,
  UNIQUE(user_id, event_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teams Table
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  logo TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  join_code TEXT,
  created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  total_points BIGINT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Members Table
CREATE TABLE IF NOT EXISTS public.team_members (
  id BIGSERIAL PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('leader', 'moderator', 'member')) DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, user_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Settings Table
CREATE TABLE IF NOT EXISTS public.user_settings (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'dark',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  email_notifications BOOLEAN DEFAULT FALSE,
  show_profile_public BOOLEAN DEFAULT FALSE,
  language TEXT DEFAULT 'bn',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenge Hints Table (track which hints user has used)
CREATE TABLE IF NOT EXISTS public.user_challenge_hints (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  challenge_id BIGINT NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  hint_index BIGINT NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, challenge_id, hint_index),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Indexes for Performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_ctf_type ON public.events(ctf_type);
CREATE INDEX IF NOT EXISTS idx_challenges_event_id ON public.challenges(event_id);
CREATE INDEX IF NOT EXISTS idx_challenges_series_id ON public.challenges(series_id);
CREATE INDEX IF NOT EXISTS idx_challenge_resources_challenge_id ON public.challenge_resources(challenge_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(id);
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON public.user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON public.user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON public.activities(user_id);
CREATE INDEX IF NOT EXISTS idx_challenge_submissions_user_id ON public.challenge_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_challenge_submissions_challenge_id ON public.challenge_submissions(challenge_id);
CREATE INDEX IF NOT EXISTS idx_completed_challenges_user_id ON public.completed_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_completed_challenges_event_id ON public.completed_challenges(event_id);
CREATE INDEX IF NOT EXISTS idx_event_participations_user_id ON public.event_participations(user_id);
CREATE INDEX IF NOT EXISTS idx_event_participations_event_id ON public.event_participations(event_id);
CREATE INDEX IF NOT EXISTS idx_teams_created_by ON public.teams(created_by);
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON public.team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON public.team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON public.user_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_user_challenge_hints_user_id ON public.user_challenge_hints(user_id);

-- ============================================
-- Enable RLS and Set Policies
-- ============================================

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.completed_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_participations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenge_hints ENABLE ROW LEVEL SECURITY;

-- Allow public read for events and challenges
CREATE POLICY "Events are readable by everyone"
  ON public.events FOR SELECT USING (true);

CREATE POLICY "Challenges are readable by everyone"
  ON public.challenges FOR SELECT USING (true);

CREATE POLICY "Challenge resources are readable by everyone"
  ON public.challenge_resources FOR SELECT USING (true);

CREATE POLICY "Achievements are readable by everyone"
  ON public.achievements FOR SELECT USING (true);

-- Allow users to read their own data
CREATE POLICY "Users can read their own profile"
  ON public.user_profiles FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can read their own stats"
  ON public.user_stats FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can read their own achievements"
  ON public.user_achievements FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can read their own activities"
  ON public.activities FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can read their own submissions"
  ON public.challenge_submissions FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can read their own completed challenges"
  ON public.completed_challenges FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can read their own event participations"
  ON public.event_participations FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can read their own settings"
  ON public.user_settings FOR SELECT USING (user_id = auth.uid());

-- Allow custom auth (no Supabase Auth)
CREATE POLICY "Allow SELECT for custom auth - events"
  ON public.events FOR SELECT USING (true);

CREATE POLICY "Allow SELECT for custom auth - challenges"
  ON public.challenges FOR SELECT USING (true);
