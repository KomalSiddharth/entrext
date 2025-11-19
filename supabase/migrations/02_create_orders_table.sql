/*
# Create Orders Table for Payment Processing

## 1. New Tables
- `orders`
  - `id` (uuid, primary key, auto-generated)
  - `user_id` (uuid, nullable, references auth.users) - Allows guest checkout
  - `items` (jsonb, not null) - Order line items with plan details
  - `total_amount` (numeric(12,2), not null) - Total order amount
  - `currency` (text, not null, default 'usd') - Payment currency
  - `status` (order_status enum, not null, default 'pending') - Order status
  - `stripe_session_id` (text, unique) - Stripe checkout session ID
  - `stripe_payment_intent_id` (text) - Stripe payment intent ID
  - `customer_email` (text) - Customer email from Stripe
  - `customer_name` (text) - Customer name from Stripe
  - `completed_at` (timestamptz) - Payment completion timestamp
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

## 2. Enums
- `order_status`: 'pending', 'completed', 'cancelled', 'refunded'

## 3. Security
- Enable RLS on `orders` table
- Users can view their own orders (if authenticated)
- Service role (Edge Functions) can manage all orders
- Guest orders are accessible only via session_id verification

## 4. Indexes
- `idx_orders_user_id` - Fast user order lookups
- `idx_orders_stripe_session_id` - Fast session lookups
- `idx_orders_status` - Fast status filtering

## 5. Notes
- Supports both authenticated and guest checkout
- All order modifications must go through Edge Functions
- Price calculation is server-side only (security)
*/

-- Order status enum
CREATE TYPE order_status AS ENUM ('pending', 'completed', 'cancelled', 'refunded');

-- Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  items jsonb NOT NULL,
  total_amount numeric(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'usd',
  status order_status NOT NULL DEFAULT 'pending'::order_status,
  stripe_session_id text UNIQUE,
  stripe_payment_intent_id text,
  customer_email text,
  customer_name text,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for faster lookups
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_stripe_session_id ON public.orders(stripe_session_id);
CREATE INDEX idx_orders_status ON public.orders(status);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can view their own orders
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can manage all orders (for Edge Functions)
CREATE POLICY "Service role can manage orders"
  ON public.orders FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');
