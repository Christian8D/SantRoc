-- Add separate horizontal and vertical position fields to background_images table
-- This allows for more granular control over background positioning

DO $$
BEGIN
    -- Add horizontal_position column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'background_images' AND column_name = 'horizontal_position') THEN
        ALTER TABLE background_images ADD COLUMN horizontal_position VARCHAR(20) DEFAULT 'center';
    END IF;

    -- Add vertical_position column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'background_images' AND column_name = 'vertical_position') THEN
        ALTER TABLE background_images ADD COLUMN vertical_position VARCHAR(20) DEFAULT 'center';
    END IF;
END $$;

-- Parse existing background_position values and populate the new fields
UPDATE background_images
SET
    horizontal_position = CASE 
        WHEN background_position LIKE '%left%' THEN 'left'
        WHEN background_position LIKE '%right%' THEN 'right'
        ELSE 'center'
    END,
    vertical_position = CASE 
        WHEN background_position LIKE '%top%' THEN 'top'
        WHEN background_position LIKE '%bottom%' THEN 'bottom'
        ELSE 'center'
    END
WHERE horizontal_position IS NULL OR vertical_position IS NULL;

-- Add comments to document the new fields
COMMENT ON COLUMN background_images.horizontal_position IS 'Horizontal position of background image: left, center, right';
COMMENT ON COLUMN background_images.vertical_position IS 'Vertical position of background image: top, center, bottom';
