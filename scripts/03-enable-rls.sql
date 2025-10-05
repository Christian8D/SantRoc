-- Enable Row Level Security
ALTER TABLE background_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_links ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view background images" ON background_images
  FOR SELECT USING (true);

CREATE POLICY "Public can view events" ON events
  FOR SELECT USING (true);

CREATE POLICY "Public can view videos" ON videos
  FOR SELECT USING (true);

CREATE POLICY "Public can view site content" ON site_content
  FOR SELECT USING (true);

CREATE POLICY "Public can view music links" ON music_links
  FOR SELECT USING (true);

-- Note: Admin policies will be added after authentication is set up
-- For now, you'll need to manage content through the Supabase dashboard
-- or add authenticated user policies later
