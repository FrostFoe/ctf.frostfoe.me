-- ============================================
-- Add missing columns for admin functionality
-- ============================================

-- Add team_size to events if it doesn't exist
ALTER TABLE IF EXISTS public.events 
ADD COLUMN IF NOT EXISTS team_size BIGINT DEFAULT 5;

-- Add image_url and registration_url if they don't exist
ALTER TABLE IF EXISTS public.events 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS registration_url TEXT;

-- Add missing columns to challenges
ALTER TABLE IF EXISTS public.challenges 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS resources TEXT[],
ADD COLUMN IF NOT EXISTS docker_image TEXT,
ADD COLUMN IF NOT EXISTS max_attempts BIGINT DEFAULT 999;
