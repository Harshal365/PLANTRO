# Database Setup Guide for Plantro

## Database Schema Overview

The database is now configured with PostgreSQL and includes the following features:

### **User Management**
- **Authentication**: Email/password + OAuth (Google)
- **User Data**: Name, phone, avatar, preferences
- **Ad Tracking**: UTM parameters, campaign IDs, ad sources
- **Session Management**: Login tracking, session history

### **Order Management**
- **Orders**: Complete order history with status tracking
- **Order Items**: Product details and quantities
- **Addresses**: Shipping and billing addresses
- **Ad Attribution**: Campaign tracking for conversions

### **Analytics**
- **Ad Campaigns**: Track campaign performance (impressions, clicks, conversions)
- **User Sessions**: Track user behavior and bounce rates
- **Analytics Events**: Custom event tracking (page views, add to cart, purchases)

## Setup Instructions

### 1. Set Up Database (Supabase Recommended)

**Option A: Supabase (Free & Easy)**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your PostgreSQL connection string from Settings > Database
4. Copy the connection string

**Option B: Local PostgreSQL**
```bash
# Install PostgreSQL locally
brew install postgresql  # macOS
# or use Docker
docker run --name plantro-db -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Database (Supabase or local PostgreSQL)
DATABASE_URL="postgresql://postgres:password@localhost:5432/plantro?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-here"

# Google OAuth (Optional - for Google Sign In)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Run Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) View database in Prisma Studio
npx prisma studio
```

### 4. Install Dependencies

```bash
npm install next-auth @auth/prisma-adapter bcryptjs
npm install -D @types/bcryptjs
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/[...nextauth]` - NextAuth authentication (sign in, sign out, OAuth)

### Users
- `GET /api/users` - Get current user profile
- `POST /api/users` - Create new user
- `PUT /api/users` - Update user profile

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get specific order details

## Ad Campaign Tracking

### UTM Parameters (Automatic)
When users visit your site from ads, capture these parameters:
- `utm_source` - Traffic source (facebook, google, instagram)
- `utm_medium` - Medium (cpc, banner, email)
- `utm_campaign` - Campaign name
- `utm_term` - Search terms
- `utm_content` - Ad content

### Campaign ID Tracking
Store campaign-specific IDs to track which ad led to conversion:
- `adCampaignId` - Platform campaign ID
- `adSetId` - Ad set ID
- `adId` - Specific ad ID
- `adPlatform` - Platform name (facebook, google, etc.)

### Example Implementation

```typescript
// Capture UTM parameters on page load
const searchParams = new URLSearchParams(window.location.search)
const utmParams = {
  utmSource: searchParams.get('utm_source'),
  utmMedium: searchParams.get('utm_medium'),
  utmCampaign: searchParams.get('utm_campaign'),
  utmTerm: searchParams.get('utm_term'),
  utmContent: searchParams.get('utm_content'),
}

// Send to signup API
await fetch('/api/auth/signup', {
  method: 'POST',
  body: JSON.stringify({
    email,
    password,
    name,
    ...utmParams,
  }),
})
```

## Next Steps

### 1. Update Account Page
Integrate the signup/signin forms with the new API endpoints.

### 2. Update Checkout Page
Connect the checkout form to the `/api/orders` endpoint.

### 3. Add UTM Tracking
Add UTM parameter capture to your landing pages.

### 4. Set Up Google OAuth (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URIs (your domain + `/api/auth/callback/google`)
4. Copy client ID and secret to `.env`

### 5. Deploy Database
- **Supabase**: Already hosted, just use the connection string
- **Railway**: Easy PostgreSQL hosting
- **Neon**: Serverless PostgreSQL

## Ad Platform Integration

### Facebook Ads
- Add Facebook Pixel to your pages
- Track events: ViewContent, AddToCart, Purchase
- Store campaign IDs in orders

### Google Ads
- Add Google Analytics tag
- Track conversions
- Store campaign IDs in orders

### ROI Calculation
Use the `AdCampaign` model to track:
- Budget vs. spent
- Conversions vs. cost
- Conversion value (total order value from campaign)
- ROI = (Conversion Value - Spent) / Spent * 100

## Security Notes

- Passwords are hashed with bcrypt (12 rounds)
- JWT tokens for session management
- Row-level security can be added with Supabase
- Never commit `.env` file to Git
- Use environment variables for all secrets

## Support

For issues with:
- **Prisma**: https://www.prisma.io/docs
- **NextAuth**: https://next-auth.js.org
- **Supabase**: https://supabase.com/docs
