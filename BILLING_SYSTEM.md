# Companion Billing System Documentation

## Overview
The Companion landing page now includes a complete, secure billing system powered by Stripe. Users can select a pricing plan and complete payment through a professional, trust-driven billing page.

## Features

### 1. Secure Payment Processing
- **Stripe Integration**: Industry-standard payment processing
- **SSL Encryption**: All payment data is encrypted with 256-bit SSL
- **PCI Compliance**: No card details stored on our servers
- **Guest Checkout**: Users can purchase without creating an account

### 2. Billing Page (`/billing`)
- **Clean, Trust-Driven Design**: Professional layout with security badges
- **Form Validation**: Real-time validation for all input fields
- **Order Summary**: Clear breakdown of selected plan and features
- **Responsive Design**: Optimized for mobile and desktop

### 3. Payment Success Page (`/payment-success`)
- **Payment Verification**: Server-side verification through Stripe API
- **Order Confirmation**: Detailed payment information display
- **User Guidance**: Clear next steps after successful payment

## User Flow

1. **Plan Selection**: User clicks "Get Started" on a pricing tier
2. **Billing Page**: User is redirected to `/billing?plan=<plan_name>`
3. **Form Completion**: User fills out billing information
4. **Stripe Checkout**: User is redirected to Stripe's secure payment page
5. **Payment Processing**: Stripe processes the payment
6. **Verification**: User returns to `/payment-success` for verification
7. **Confirmation**: Payment is verified and order is marked as completed

## Technical Implementation

### Database Schema

#### Orders Table
```sql
CREATE TABLE orders (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  items jsonb NOT NULL,
  total_amount numeric(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'usd',
  status order_status NOT NULL DEFAULT 'pending',
  stripe_session_id text UNIQUE,
  stripe_payment_intent_id text,
  customer_email text,
  customer_name text,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### Edge Functions

#### 1. create_stripe_checkout
**Purpose**: Creates a Stripe checkout session and pending order

**Request Body**:
```json
{
  "items": [
    {
      "name": "Companion Plus Plan",
      "price": 9.99,
      "quantity": 1
    }
  ],
  "currency": "usd",
  "payment_method_types": ["card"]
}
```

**Response**:
```json
{
  "code": "SUCCESS",
  "data": {
    "url": "https://checkout.stripe.com/...",
    "sessionId": "cs_...",
    "orderId": "uuid"
  }
}
```

#### 2. verify_stripe_payment
**Purpose**: Verifies payment completion and updates order status

**Request Body**:
```json
{
  "sessionId": "cs_..."
}
```

**Response**:
```json
{
  "code": "SUCCESS",
  "data": {
    "verified": true,
    "status": "paid",
    "amount": 999,
    "currency": "usd",
    "customerEmail": "user@example.com",
    "orderUpdated": true
  }
}
```

### Frontend Components

#### BillingPage.tsx
- Form fields: Name, Email, Card Number, Expiry, CVV, Address, City, Postal Code
- Client-side validation with react-hook-form
- Security indicators (SSL badge, encryption notice)
- Order summary sidebar with plan details
- Responsive grid layout (2 columns on desktop, 1 on mobile)

#### PaymentSuccess.tsx
- Loading state while verifying payment
- Success state with payment details
- Error state with retry options
- Navigation buttons to home or pricing page

### API Functions

```typescript
// Create Stripe checkout session
export async function createStripeCheckout(items: OrderItem[])

// Verify payment completion
export async function verifyStripePayment(sessionId: string)
```

## Security Features

1. **Server-Side Validation**: All price calculations happen on the server
2. **Row Level Security**: Orders table has RLS policies
3. **Service Role Only**: Only Edge Functions can modify orders
4. **No Client-Side Secrets**: Stripe secret key never exposed to client
5. **HTTPS Only**: All communication encrypted with SSL

## Configuration Required

### Environment Variables
The following environment variable must be configured in Supabase:

```
STRIPE_SECRET_KEY=sk_test_...
```

**How to Configure**:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your Secret Key (starts with `sk_test_` for test mode)
3. Add to Supabase project secrets
4. Restart Edge Functions if needed

### Stripe Setup Steps
1. Create a Stripe account at https://stripe.com
2. Navigate to Developers > API keys
3. Copy the Secret key (for production, use live keys)
4. Add the key to Supabase environment secrets
5. Test the payment flow with Stripe test cards

### Test Cards
Use these test card numbers in development:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

## Pricing Plans

### Free Plan
- Price: $0
- Features: Basic connection features, up to 5 connections/month
- Action: Shows welcome page with next steps (no payment required)
- User Flow: Redirects to billing page → Shows Free Plan welcome screen → Join waitlist or view other plans

### Plus Plan
- Price: $9.99/month
- Features: Unlimited connections, priority matching, advanced filters
- Action: Proceed to billing page with payment form

### Pro Plan
- Price: $19.99/month
- Features: Everything in Plus + VIP badge, exclusive events, 24/7 support
- Action: Proceed to billing page with payment form

## Error Handling

### Common Errors

1. **STRIPE_SECRET_KEY not configured**
   - Error: "STRIPE_SECRET_KEY not configured"
   - Solution: Add Stripe secret key to Supabase environment

2. **Invalid session_id**
   - Error: "Missing session_id parameter"
   - Solution: Ensure user is redirected from Stripe with session_id

3. **Payment verification failed**
   - Error: "Payment verification failed"
   - Solution: Check Stripe dashboard for payment status

## User Experience Enhancements

1. **Trust Indicators**:
   - SSL encryption badge
   - Secure payment notice
   - 30-day money-back guarantee
   - Cancel anytime message

2. **Visual Feedback**:
   - Loading states during processing
   - Success animations on completion
   - Clear error messages with retry options

3. **Mobile Optimization**:
   - Single column layout on mobile
   - Touch-optimized form inputs
   - Sticky order summary on desktop

## Future Enhancements

1. **Subscription Management**: Allow users to manage subscriptions
2. **Invoice Generation**: Automatic invoice emails
3. **Multiple Payment Methods**: Add PayPal, Apple Pay, Google Pay
4. **Discount Codes**: Promotional code support
5. **Annual Billing**: Discounted annual plans
6. **Order History**: User dashboard with past orders

## Support

For payment-related issues:
1. Check Stripe Dashboard for transaction details
2. Verify environment variables are configured
3. Review Edge Function logs in Supabase
4. Test with Stripe test cards first
5. Contact Stripe support for payment processing issues

## Compliance

- **PCI DSS**: Stripe handles all card data (PCI Level 1 certified)
- **GDPR**: Customer data stored securely in Supabase
- **Data Retention**: Order records kept for accounting purposes
- **Privacy**: No card details stored in our database
