-- Enhanced Project Status System Migration
-- Run this in Supabase SQL Editor

-- Step 1: Add new columns to quotes table
ALTER TABLE quotes 
ADD COLUMN IF NOT EXISTS progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
ADD COLUMN IF NOT EXISTS current_milestone TEXT,
ADD COLUMN IF NOT EXISTS estimated_completion DATE,
ADD COLUMN IF NOT EXISTS started_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Step 2: Update status column to support new values
-- Note: Existing data will remain valid, new statuses can be used going forward
COMMENT ON COLUMN quotes.status IS 'Project status: pending, under_review, approved, in_progress, in_development, testing, ready_for_delivery, delivered, completed, rejected, on_hold';

-- Step 3: Create project_activities table
CREATE TABLE IF NOT EXISTS project_activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('status_change', 'comment', 'file_upload', 'milestone_completed', 'deadline_updated', 'progress_update')),
  description TEXT NOT NULL,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Step 4: Create project_milestones table
CREATE TABLE IF NOT EXISTS project_milestones (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Step 5: Enable RLS on new tables
ALTER TABLE project_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_milestones ENABLE ROW LEVEL SECURITY;

-- Step 6: RLS Policies for project_activities

-- Users can view activities for their own projects
CREATE POLICY "Users can view their project activities"
  ON project_activities FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM quotes 
      WHERE quotes.id = project_activities.quote_id 
      AND quotes.user_id = auth.uid()
    )
  );

-- Admins can view all activities
CREATE POLICY "Admins can view all activities"
  ON project_activities FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Admins can insert activities
CREATE POLICY "Admins can insert activities"
  ON project_activities FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Step 7: RLS Policies for project_milestones

-- Users can view milestones for their own projects
CREATE POLICY "Users can view their project milestones"
  ON project_milestones FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM quotes 
      WHERE quotes.id = project_milestones.quote_id 
      AND quotes.user_id = auth.uid()
    )
  );

-- Admins can view all milestones
CREATE POLICY "Admins can view all milestones"
  ON project_milestones FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Admins can manage milestones
CREATE POLICY "Admins can insert milestones"
  ON project_milestones FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update milestones"
  ON project_milestones FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete milestones"
  ON project_milestones FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Step 8: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_project_activities_quote_id ON project_activities(quote_id);
CREATE INDEX IF NOT EXISTS idx_project_activities_created_at ON project_activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_milestones_quote_id ON project_milestones(quote_id);
CREATE INDEX IF NOT EXISTS idx_project_milestones_order ON project_milestones(quote_id, order_index);

-- Step 9: Create function to auto-log status changes
CREATE OR REPLACE FUNCTION log_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO project_activities (quote_id, activity_type, description, created_by, metadata)
    VALUES (
      NEW.id,
      'status_change',
      'Status changed from ' || COALESCE(OLD.status, 'none') || ' to ' || NEW.status,
      auth.uid(),
      jsonb_build_object('old_status', OLD.status, 'new_status', NEW.status)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 10: Create trigger for status changes
DROP TRIGGER IF EXISTS on_quote_status_change ON quotes;
CREATE TRIGGER on_quote_status_change
  AFTER UPDATE ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION log_status_change();

-- Step 11: Backfill initial activity for existing quotes
INSERT INTO project_activities (quote_id, activity_type, description, created_at, metadata)
SELECT 
  id,
  'status_change',
  'Project created with status: ' || status,
  created_at,
  jsonb_build_object('status', status)
FROM quotes
WHERE NOT EXISTS (
  SELECT 1 FROM project_activities 
  WHERE project_activities.quote_id = quotes.id
)
ON CONFLICT DO NOTHING;

-- Migration complete!
-- You can now use the enhanced status system
