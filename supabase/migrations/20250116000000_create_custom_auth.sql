-- ============================================
-- Custom Authentication System Schema
-- For CTF Platform (ctf.frostfoe.me)
-- ============================================
-- This migration creates the users table for the custom auth system
-- Passwords are stored in plaintext (INTENTIONAL FOR CTF)
-- No Supabase Auth is used

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL, -- Plain text storage (intentional for CTF)
  role TEXT NOT NULL DEFAULT 'player' CHECK (role IN ('player', 'admin', 'guest')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create index for faster lookups by username
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users(username);

-- Create index for faster lookups by role
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create a permissive policy to allow all SELECT queries for custom auth
-- Since we're using custom auth (not Supabase Auth), we need to allow unauthenticated queries
CREATE POLICY "Allow SELECT for custom auth"
  ON public.users
  FOR SELECT
  USING (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at_trigger
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.update_users_updated_at();

-- Insert a sample admin user (optional - for testing)
-- Password: admin123
-- INSERT INTO public.users (username, password, role) 
-- VALUES ('admin', 'admin123', 'admin');
