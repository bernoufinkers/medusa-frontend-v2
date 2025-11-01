# Medusa Next.js v15 Storefront - AI Coding Instructions

## Architecture Overview

This is a **Next.js 15 App Router** storefront for **Medusa v2** e-commerce backend, using **Server Components**, **Server Actions**, and **Turbopack** for development.

### Key Dependencies & Integration Points
- **Medusa JS SDK**: `@medusajs/js-sdk` - primary API client (`src/lib/config.ts`)
- **Authentication**: JWT tokens stored in httpOnly cookies (`_medusa_jwt`)
- **Cart**: Persistent via cookies (`_medusa_cart_id`) with region-based management
- **Caching**: Next.js cache tags with Medusa-specific invalidation patterns
- **Styling**: Tailwind CSS + `@medusajs/ui` component library

## Critical Development Patterns

### Data Fetching ("use server" functions)
All data layer functions in `src/lib/data/` are Server Actions:
```ts
// Pattern: Always include cache options and auth headers
const headers = { ...(await getAuthHeaders()) }
const next = { ...(await getCacheOptions("products")) }
```

Key data functions:
- `retrieveCart()` - Gets cart with expanded fields via cache
- `retrieveCustomer()` - Auth-gated customer data
- `listProducts()` - Region-aware product fetching with pagination
- `addToCart()` - Server Action with cache invalidation

### Region & Country Code Handling
**Critical**: All routes are prefixed with country codes (`/us/`, `/nl/`):
- Middleware (`src/middleware.ts`) handles region detection and redirects
- Use `getRegion(countryCode)` to get region data
- Cart operations require `countryCode` parameter for region association

### Cache Management Strategy
```ts
// Pattern: Tag-based cache invalidation
const cartCacheTag = await getCacheTag("carts")
revalidateTag(cartCacheTag)
```

Cache tags: `carts`, `customers`, `products`, `orders`, `fulfillment`, `regions`

### Module Architecture Pattern
Modules follow `/components` → `/templates` hierarchy:
- **Components**: Reusable UI elements (buttons, forms, cards)
- **Templates**: Page-level layouts combining multiple components
- **Server Components**: Default, use "use client" only when needed

Example: `src/modules/cart/templates/index.tsx` combines components for full cart page.

## Essential File Patterns

### Environment Configuration
```bash
# Required for startup (checked by check-env-variables.js)
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_test_...
MEDUSA_BACKEND_URL=http://localhost:9000  # Note: NOT NEXT_PUBLIC_
```

### Product Actions Pattern
```tsx
// Key pattern for add-to-cart functionality
const handleAddToCart = async () => {
  await addToCart({
    variantId: selectedVariant.id,
    quantity: amount,
    countryCode, // Required for region handling
  })
}
```

### Server Action Error Handling
```ts
// Standard pattern in lib/data/ functions
.catch(medusaError) // Custom error handler for Medusa API responses
```

## Development Workflow

### Local Development
```bash
yarn dev          # Starts Next.js with Turbopack on port 8000
yarn build        # Production build
yarn analyze      # Bundle analysis
```

### Required Backend Setup
- Medusa server running on port 9000
- Regions configured in Medusa Admin
- Publishable API key configured
- CORS settings for frontend domain

### Testing Cart/Checkout Flow
1. Ensure regions are set up in backend
2. Products must have variants with inventory
3. Test region switching via country code URLs
4. Verify cart persistence across sessions

## Common Gotchas

1. **Country Code Routes**: All pages expect `[countryCode]` param - use `LocalizedClientLink` for navigation
2. **Server Components by Default**: Only add "use client" for interactivity (forms, state)
3. **Cache Invalidation**: Always revalidate related cache tags after mutations
4. **Region Dependency**: Cart, pricing, and shipping all depend on region - pass `countryCode` consistently
5. **Auth Headers**: Include in all API calls via `getAuthHeaders()` for customer context

## Key Files to Understand
- `src/middleware.ts` - Region detection and URL structure
- `src/lib/data/cart.ts` - Cart operations and server actions
- `src/lib/config.ts` - Medusa SDK configuration
- `src/app/[countryCode]/(main)/layout.tsx` - Main layout with cart/customer context
- `check-env-variables.js` - Required environment validation