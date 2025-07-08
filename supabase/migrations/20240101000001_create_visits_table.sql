-- Create visits table
CREATE TABLE IF NOT EXISTS visits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  page_url TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  screen_resolution TEXT,
  language TEXT,
  session_id TEXT,
  duration INTEGER DEFAULT 0
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS visits_created_at_idx ON visits(created_at);
CREATE INDEX IF NOT EXISTS visits_page_url_idx ON visits(page_url);
CREATE INDEX IF NOT EXISTS visits_session_id_idx ON visits(session_id);

-- Enable RLS
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users to insert visits
CREATE POLICY "Allow anonymous visits insert" ON visits
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create policy for authenticated users to read visits
CREATE POLICY "Allow authenticated visits read" ON visits
  FOR SELECT TO authenticated
  USING (true);