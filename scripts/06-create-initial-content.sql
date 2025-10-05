-- Create initial content sections if they don't exist
-- This script ensures the hero_title and hero_description sections exist for editing

INSERT INTO site_content (section, content, created_at, updated_at)
VALUES 
  ('hero_title', 'Welcome to Sant Roc', NOW(), NOW()),
  ('hero_description', 'The musical journey of Australian artist Kristian Attard. Experience the sounds and stories that define this unique musical project.', NOW(), NOW())
ON CONFLICT (section) DO NOTHING;

-- Verify the content was created
SELECT section, content, created_at FROM site_content 
WHERE section IN ('hero_title', 'hero_description')
ORDER BY section;
