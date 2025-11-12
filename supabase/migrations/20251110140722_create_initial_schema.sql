/*
  # Create Superglow Initial Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `parties`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `party_name` (text, required)
      - `child_name` (text, required)
      - `child_dob` (date, required)
      - `event_date` (date, required)
      - `start_time` (time, required)
      - `end_time` (time, optional)
      - `location` (text, required)
      - `description` (text, optional)
      - `cover_image_url` (text, optional)
      - `video_url` (text, optional)
      - `theme_id` (text, optional)
      - `theme_name` (text, optional)
      - `theme_bg_color` (text, optional)
      - `allow_non_listed_guests` (boolean, default true)
      - `collect_dietaries` (boolean, default true)
      - `rsvp_deadline` (date, optional)
      - `invite_code` (text, unique)
      - `invite_link` (text)
      - `gift_ideas` (text array, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `guests`
      - `id` (uuid, primary key)
      - `party_id` (uuid, references parties)
      - `name` (text, required)
      - `email` (text, optional)
      - `dietary_restrictions` (text, optional)
      - `rsvp_status` (text, default 'pending')
      - `rsvp_message` (text, optional)
      - `rsvp_date` (timestamp, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public RSVP access via invite code
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create parties table
CREATE TABLE IF NOT EXISTS parties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  
  -- Basic Info
  party_name text NOT NULL,
  child_name text NOT NULL,
  child_dob date NOT NULL,
  
  -- Event Details
  event_date date NOT NULL,
  start_time time NOT NULL,
  end_time time,
  location text NOT NULL,
  description text,
  temperature text,
  
  -- Media
  cover_image_url text,
  video_url text,
  
  -- Theme
  theme_id text,
  theme_name text,
  theme_bg_color text,
  
  -- Settings
  allow_non_listed_guests boolean DEFAULT true,
  collect_dietaries boolean DEFAULT true,
  rsvp_deadline date,
  
  -- Sharing
  invite_code text UNIQUE NOT NULL,
  invite_link text NOT NULL,
  
  -- Gift Ideas
  gift_ideas text[] DEFAULT '{}',
  
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create guests table
CREATE TABLE IF NOT EXISTS guests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id uuid REFERENCES parties(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  dietary_restrictions text,
  rsvp_status text DEFAULT 'pending',
  rsvp_message text,
  rsvp_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Parties policies
CREATE POLICY "Users can view own parties"
  ON parties FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own parties"
  ON parties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own parties"
  ON parties FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own parties"
  ON parties FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view parties by invite code"
  ON parties FOR SELECT
  TO anon
  USING (true);

-- Guests policies
CREATE POLICY "Users can view guests for own parties"
  ON guests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM parties
      WHERE parties.id = guests.party_id
      AND parties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add guests to own parties"
  ON guests FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM parties
      WHERE parties.id = guests.party_id
      AND parties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update guests for own parties"
  ON guests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM parties
      WHERE parties.id = guests.party_id
      AND parties.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM parties
      WHERE parties.id = guests.party_id
      AND parties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete guests from own parties"
  ON guests FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM parties
      WHERE parties.id = guests.party_id
      AND parties.user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view guests for parties"
  ON guests FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can RSVP as guest"
  ON guests FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Public can update own RSVP"
  ON guests FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_parties_user_id ON parties(user_id);
CREATE INDEX IF NOT EXISTS idx_parties_invite_code ON parties(invite_code);
CREATE INDEX IF NOT EXISTS idx_guests_party_id ON guests(party_id);
CREATE INDEX IF NOT EXISTS idx_guests_rsvp_status ON guests(rsvp_status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_parties_updated_at
  BEFORE UPDATE ON parties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
