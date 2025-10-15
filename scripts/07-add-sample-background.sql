-- Add a sample background image to test the hero section
-- Replace the URL with your actual image URL

INSERT INTO background_images (image_url, is_active, created_at)
VALUES (
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  true,
  NOW()
)
ON CONFLICT DO NOTHING;

-- Check if the background image was added
SELECT id, image_url, is_active, created_at FROM background_images;
