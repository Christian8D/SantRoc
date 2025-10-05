-- Create storage bucket for background images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'SantRoc',
  'SantRoc',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy to allow public read access to background images
CREATE POLICY "Public read access for SantRoc images" ON storage.objects
FOR SELECT USING (bucket_id = 'SantRoc');

-- Policy to allow authenticated users to upload background images
CREATE POLICY "Authenticated users can upload SantRoc images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'SantRoc' 
  AND auth.role() = 'authenticated'
);

-- Policy to allow authenticated users to update background images
CREATE POLICY "Authenticated users can update SantRoc images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'SantRoc' 
  AND auth.role() = 'authenticated'
);

-- Policy to allow authenticated users to delete background images
CREATE POLICY "Authenticated users can delete SantRoc images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'SantRoc' 
  AND auth.role() = 'authenticated'
);
