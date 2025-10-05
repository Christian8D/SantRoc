-- Drop existing policies that are too restrictive
DROP POLICY IF EXISTS "Authenticated users can manage background images" ON background_images;
DROP POLICY IF EXISTS "Authenticated users can manage site content" ON site_content;
DROP POLICY IF EXISTS "Authenticated users can manage music links" ON music_links;
DROP POLICY IF EXISTS "Authenticated users can manage videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can manage events" ON events;

-- Create more permissive policies for admin operations
-- Allow service role (server-side operations) and authenticated users
CREATE POLICY "Admin access for background images" ON background_images
FOR ALL USING (
  auth.role() = 'service_role' OR 
  auth.role() = 'authenticated'
);

CREATE POLICY "Admin access for site content" ON site_content
FOR ALL USING (
  auth.role() = 'service_role' OR 
  auth.role() = 'authenticated'
);

CREATE POLICY "Admin access for music links" ON music_links
FOR ALL USING (
  auth.role() = 'service_role' OR 
  auth.role() = 'authenticated'
);

CREATE POLICY "Admin access for videos" ON videos
FOR ALL USING (
  auth.role() = 'service_role' OR 
  auth.role() = 'authenticated'
);

CREATE POLICY "Admin access for events" ON events
FOR ALL USING (
  auth.role() = 'service_role' OR 
  auth.role() = 'authenticated'
);
