-- Add background positioning columns to background_images table (if they don't exist)
DO $$ 
BEGIN
    -- Add background_position column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'background_images' AND column_name = 'background_position') THEN
        ALTER TABLE background_images ADD COLUMN background_position VARCHAR(50) DEFAULT 'center';
    END IF;
    
    -- Add background_size column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'background_images' AND column_name = 'background_size') THEN
        ALTER TABLE background_images ADD COLUMN background_size VARCHAR(50) DEFAULT 'cover';
    END IF;
    
    -- Add background_repeat column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'background_images' AND column_name = 'background_repeat') THEN
        ALTER TABLE background_images ADD COLUMN background_repeat VARCHAR(50) DEFAULT 'no-repeat';
    END IF;
    
    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'background_images' AND column_name = 'updated_at') THEN
        ALTER TABLE background_images ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Update existing records with default values
UPDATE background_images 
SET 
  background_position = COALESCE(background_position, 'center'),
  background_size = COALESCE(background_size, 'cover'),
  background_repeat = COALESCE(background_repeat, 'no-repeat'),
  updated_at = COALESCE(updated_at, NOW());
