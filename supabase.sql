-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'player' CHECK (role IN ('player', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sessions table for active sessions
CREATE TABLE IF NOT EXISTS sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(session_token);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);

-- Insert demo users (password hashes should be bcrypt - these are examples)
-- For demo: password "demo" and "admin" (you should update with real bcrypt hashes)
INSERT INTO users (username, password_hash, role) VALUES
  ('demo', '$2b$10$YOeKVwjvAvJJkSHpxZCcb.FHtAYl5Pv8xVCn7KqnU8VX9g/nW6.ni', 'player'),
  ('admin', '$2b$10$WfpgXMZBQvP8bSW2xZl2AOp2BH0hs.aLQkh5KcGo0HgS5N4lRdcwG', 'admin')
ON CONFLICT (username) DO NOTHING;
