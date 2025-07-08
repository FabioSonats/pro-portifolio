-- Fix RLS policy for anonymous visit inserts
DROP POLICY IF EXISTS "Allow anonymous visits insert" ON visits;

-- Create a more permissive policy for anonymous users to insert visits
CREATE POLICY "Allow anonymous visits insert" ON visits
  FOR INSERT 
  WITH CHECK (true);

-- Also allow anonymous users to read their own visits if needed
CREATE POLICY "Allow anonymous visits read" ON visits
  FOR SELECT 
  USING (true);