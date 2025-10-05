-- Enable RLS on all tables
ALTER TABLE background_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Background Images Policies
CREATE POLICY "Public read access for background images" ON background_images
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage background images" ON background_images
FOR ALL USING (auth.role() = 'authenticated');

-- Site Content Policies
CREATE POLICY "Public read access for site content" ON site_content
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage site content" ON site_content
FOR ALL USING (auth.role() = 'authenticated');

-- Music Links Policies
CREATE POLICY "Public read access for music links" ON music_links
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage music links" ON music_links
FOR ALL USING (auth.role() = 'authenticated');

-- Videos Policies
CREATE POLICY "Public read access for videos" ON videos
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage videos" ON videos
FOR ALL USING (auth.role() = 'authenticated');

-- Events Policies
CREATE POLICY "Public read access for events" ON events
FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage events" ON events
FOR ALL USING (auth.role() = 'authenticated');
