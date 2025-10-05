-- Insert default background image
INSERT INTO background_images (image_url, is_active) VALUES
  ('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-05%20at%2011.04.58-yaFtrLD59evaa7pfHNXUAQapuxRjNG.png', true);

-- Insert default site content
INSERT INTO site_content (section, content) VALUES
  ('hero_title', 'Sant Roc'),
  ('hero_description', 'Sant Roc is the project of Australian musician Kristian Attard, whose work with a range of renowned artists has shaped his distinctive sound. Blending 70s psychedelia with jazz grooves, warm analog textures, and hypnotic rhythms, Sant Roc evokes the spirit of an era, capturing sun-soaked desert vibes and the electric pulse of the city. The first record was written to lost reel-to-reel tapes of drums recorded in the 70s in San Francisco, and became the foundation for Kristian to build his 70s-inspired sonic landscape. With a new record set for release and plans for shows and touring later in the year, Sant Roc is set to continue its evolution.');

-- Insert sample music links
INSERT INTO music_links (title, url, order_index) VALUES
  ('Frost Bite', '#', 1),
  ('Thursday Encounters', '#', 2);

-- Insert sample videos
INSERT INTO videos (title, youtube_url, category) VALUES
  ('Frost Bite - Tropico Beauty', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'music'),
  ('Elbe Mi O - Goold Diggers LA', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'music');

-- Insert sample events
INSERT INTO events (title, description, event_date) VALUES
  ('Album Release Show', 'Join us for the official album release party', '2025-12-15 20:00:00+00'),
  ('Thursday Night Sessions', 'Live performance at The Groove Room', '2025-11-20 21:00:00+00');
