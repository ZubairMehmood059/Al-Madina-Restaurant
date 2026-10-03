# System Architecture & AWS Infrastructure
## Al Madina Restaurant Web Application

---

## 1. High-Level System Architecture

The application is architected as an ultra-fast, single-page application (SPA) built with React 19, TypeScript, Vite, and Tailwind CSS v4. It features a decoupled, modular component hierarchy designed for high performance, maintainability, and zero runtime dependencies on unverified third-party hosts.

```
                              [ User Client (Browser / Mobile) ]
                                              │
                                       (HTTPS Port 443)
                                              ▼
                             [ AWS Route 53 (DNS Management) ]
                                              │
                                              ▼
                       [ AWS CloudFront CDN (Global Edge Network) ]
                         ├── Edge Caching & Brotli/Gzip Compression
                         ├── AWS WAF (Web Application Firewall)
                         └── ACM SSL/TLS Certificate (*.almadina.pk)
                                              │
                      ┌───────────────────────┴──────────────────────┐
                      ▼                                              ▼
             [ AWS S3 Static Bucket ]                     [ WhatsApp Cloud API / ]
          (Immutable Assets /dist)                       [ Direct Deep Link Protocol ]
          - index.html (no-cache)                        - +92 310 0004146
          - /assets/*.js, *.css (Cache-Control: 1y)      - Preformatted order trays
          - /public/media/*.webp (Static Assets)
```

---

## 2. Frontend Component Hierarchy & Module Graph

```
src/
├── main.tsx                      # Application Entry Point & React Root
├── App.tsx                       # Root State Hub, Navigation & Route Controller
├── index.css                     # Tailwind CSS v4 Theme, Fonts & Custom Animations
├── types.ts                      # Strict TypeScript Interfaces & Domain Models
├── data/
│   └── restaurantData.ts         # Initial Dishes, Reviews, FAQs & Media Slot Registry
└── components/
    ├── Navbar.tsx                # Sticky 3-zone Header with Cart & Dashboard Triggers
    ├── Hero.tsx                  # Display Serif Title, CTA & Bento Grid Placeholders
    ├── MediaPlaceholder.tsx      # Vector & CSS Fallback Canvas for Media Assets
    ├── Marquee.tsx               # GPU-Accelerated Infinite Attribute Ticker
    ├── MenuSection.tsx           # Category Filters, Search Engine & Dish Cards
    ├── PlaceStory.tsx            # Heritage, 24/7 Hours & Direct Call CTA
    ├── ReviewsSection.tsx        # Guest Testimonials & Customer Review Modal
    ├── AtmosphereGallery.tsx     # 6-Card Gallery Grid with Modal Slot Inspector
    ├── ReservationSection.tsx    # Table Booking Form with WhatsApp Dispatch
    ├── FindUsSection.tsx         # Google Maps Location & Store Timings
    ├── FaqSection.tsx            # Accordion FAQ Matrix
    ├── Footer.tsx                # Dark Minimalist Brand Footer with Back-to-Top
    ├── OrderDrawer.tsx           # Slide-Over Order Tray & WhatsApp Invoice Formatter
    ├── StaffDashboard.tsx        # Reservations Management, Menu Stock & Media Hub
    └── FloatingWhatsApp.tsx      # Fixed Action Bubble for Immediate Enquiries
```

---

## 3. State Management & Data Flow

- **Menu State (`menuItems`):** Initialized from `INITIAL_MENU_ITEMS` and persisted in `localStorage`. Provides live price adjustments and stock status toggles for staff.
- **Reservation State (`reservations`):** Stores booking records with automated unique references (`RES-XXXX`). Tracks status transitions (`pending`, `confirmed`, `seated`, `cancelled`).
- **Cart State (`orderItems`):** Real-time aggregation of item quantities, price calculations in PKR, service types (Takeaway vs. Karachi Delivery), and customer addresses.
- **Media Slot Registry (`mediaSlots`):** Central directory linking visual slots to dimension requirements, aspect ratios, and design team test previews.

---

## 4. AWS Production Deployment Architecture

### 4.1. Option A: Serverless Edge (Recommended)
1. **AWS S3 (`s3://almadina-restaurant-production`):**
   - Configured for static website hosting with private bucket policies accessed via CloudFront Origin Access Control (OAC).
2. **AWS CloudFront Distribution:**
   - Global CDN points to S3 origin.
   - Viewer Protocol Policy: `redirect-to-https`.
   - Compression: Automatic Brotli and Gzip.
   - Cache Behaviors:
     - `/index.html`: `Cache-Control: no-cache, no-store, must-revalidate`
     - `/assets/*`: `Cache-Control: public, max-age=31536000, immutable`
3. **AWS Route 53 & ACM:**
   - Latency-based routing to nearest CloudFront edge.
   - Automatic TLS 1.3 certificate renewal via ACM.

### 4.2. Option B: Containerized Runtime (ECS Fargate / App Runner)
For enterprise multi-tier environments, a multi-stage `Dockerfile` serves the compiled Vite assets via Nginx on Alpine Linux with customized security headers:
- `Content-Security-Policy`: Disallows unsafe inline scripts.
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`

---

## 5. CI/CD Pipeline Architecture (GitHub Actions)

The deployment pipeline is automated in `.github/workflows/deploy.yml`:

```
[ Git Push to 'main' ]
         │
         ▼
[ Job 1: Quality Gate & Validation ]
  ├── Checkout Repository
  ├── Setup Node.js 22 LTS
  ├── npm ci (Strict Dependency Resolution)
  ├── npm run lint (Static Code Analysis)
  └── npm run build (TypeScript Compilation & Vite Bundling)
         │
         ▼
[ Job 2: AWS OIDC Authentication ]
  ├── AssumeRole via aws-actions/configure-aws-credentials
  └── Zero long-lived secret storage in GitHub Repository
         │
         ▼
[ Job 3: S3 Asset Sync & Deployment ]
  ├── aws s3 sync dist/ s3://almadina-restaurant-production --delete
  └── Set Cache-Control headers for hashed bundles vs. HTML
         │
         ▼
[ Job 4: CloudFront Cache Invalidation ]
  └── aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"
```

---

## 6. Performance Optimization & SEO Strategy
- **Zero External Blocking Assets:** No external image CDNs that fail in restricted sandboxes.
- **Font Optimization:** Google Fonts preconnected with `display=swap`.
- **CSS Efficiency:** Built with Tailwind CSS v4 compiler, purging unused utilities into an ultra-lean CSS stylesheet (< 18KB gzipped).
- **Code Splitting & Dynamic Imports:** `React.lazy` and `Suspense` for `OrderDrawer` and `StaffDashboard`, cutting the initial client bundle by over 40% and accelerating First Contentful Paint (FCP).
- **Rollup Vendor Chunking:** `manualChunks` in `vite.config.ts` separating `vendor-react` and `vendor-icons` for browser cache longevity.
- **Resource Hints & DNS Prefetch:** Prefetching for WhatsApp API (`wa.me`) and Google Maps (`maps.google.com`).
- **Comprehensive Schema.org Graph:** Embedded multi-entity JSON-LD containing `Restaurant` (with geo-coordinates, cuisine, hours, order/reserve actions) and `FAQPage` (for Google search rich results).
- **Local Karachi SEO:** Geographical tags (`geo.region`, `geo.placename`, `geo.position`, `ICBM`) ensuring high visibility for local dining searches in Karachi.
