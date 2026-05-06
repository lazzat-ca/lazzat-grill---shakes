-- Add priceCombo column to menu_items table
-- This migration is now obsolete. Use price_combo (snake_case) as per schema.sql
-- ALTER TABLE menu_items ADD COLUMN priceCombo numeric;

-- Optionally, you can set a default value (uncomment if needed):
-- ALTER TABLE menu_items ALTER COLUMN priceCombo SET DEFAULT 0;

-- If you want to allow NULLs (default), nothing else is needed.
-- If you want to disallow NULLs, run:
-- ALTER TABLE menu_items ALTER COLUMN priceCombo SET NOT NULL;