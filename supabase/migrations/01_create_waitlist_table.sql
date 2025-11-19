/*
# Create waitlist table

## Plain English Explanation
This migration creates a simple waitlist table to store email addresses of people who want to join Companion. 
It tracks when they signed up and ensures each email can only be added once.

## Tables

### `waitlist`
- `id` (uuid, primary key) - Unique identifier for each signup
- `email` (text, unique, not null) - Email address of the person joining the waitlist
- `created_at` (timestamptz, default: now()) - When they signed up

## Security Changes
- No RLS enabled - this is a public waitlist form that anyone can submit to
- Anyone can insert their email into the waitlist
- No authentication required for signup

## Notes
- Email validation will be handled on the frontend
- Duplicate emails are prevented by the unique constraint
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);
