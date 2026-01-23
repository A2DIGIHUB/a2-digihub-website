# OKIKE Setup Guide

This guide will help you set up the OKIKE website with all required features.

## Prerequisites

- Node.js 16+ installed
- A Supabase account and project
- Vercel account (for deployment)

## 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under **Settings > API**.

## 2. Database Setup

Run the following SQL files in your Supabase SQL Editor in this exact order:

### Step 1: Create Tables and Profiles
```sql
-- Run: supabase_schema.sql
-- This creates the profiles and quotes tables
```

### Step 2: Create Profile Trigger
```sql
-- Run: trigger_user_profile.sql
-- This automatically creates a profile when a user signs up
```

### Step 3: Create CMS Tables
```sql
-- Run: cms_migration.sql
-- This creates tables for blogs, courses, and portfolio items
```

### Step 4: Create Storage Buckets
```sql
-- Run: storage_migration.sql
-- This creates storage buckets for avatars and content images
```

## 3. Verify Storage Buckets

After running `storage_migration.sql`, verify the buckets were created:

1. Go to **Storage** in your Supabase dashboard
2. You should see two buckets:
   - `avatars` (for user profile pictures)
   - `content-images` (for CMS content images)

If they don't exist, create them manually:
- Click "New bucket"
- Name: `avatars`, Public: ✓
- Name: `content-images`, Public: ✓

## 4. Create Your First Admin User

1. Sign up through the website at `/signup`
2. Go to Supabase **Authentication > Users**
3. Find your user and copy the UUID
4. Run this SQL to make yourself an admin:

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE id = 'your-user-uuid-here';
```

## 5. Vercel Deployment

### Environment Variables on Vercel

1. Go to your Vercel project
2. Navigate to **Settings > Environment Variables**
3. Add these variables:
   - `REACT_APP_SUPABASE_URL` = your Supabase URL
   - `REACT_APP_SUPABASE_ANON_KEY` = your Supabase anon key

### Deploy

```bash
git push origin master
```

Vercel will automatically deploy your changes.

## 6. Testing Upload Features

### Test Avatar Upload
1. Log in to the dashboard
2. Go to **Profile**
3. Click the camera icon to upload an avatar
4. If you see "Storage bucket not configured", verify step 4 above

### Test Content Image Upload
1. Log in as an admin
2. Go to **Admin > CMS Content**
3. Click "Add New" on any tab
4. Try uploading an image
5. If you see "Storage bucket not configured", verify step 4 above

## Troubleshooting

### Upload Issues

**Error: "Storage bucket not configured"**
- Solution: Run `storage_migration.sql` in Supabase SQL Editor
- Verify buckets exist in Storage section

**Error: "Failed to submit quote: insert or update violates foreign key constraint"**
- Solution: Run `trigger_user_profile.sql` to create the profile trigger
- For existing users, run the backfill script in that file

**Blank Screen on Vercel**
- Solution: Add environment variables to Vercel (see step 5)
- Redeploy after adding variables

### Permission Issues

**Error: "new row violates row-level security policy"**
- Solution: Check that RLS policies are created (they're in the migration files)
- Verify your user has the correct role in the profiles table

## Need Help?

Check the browser console for detailed error messages. Most issues are related to:
1. Missing environment variables
2. Storage buckets not created
3. SQL migrations not run in order
