# Project Task Board & Implementation Roadmap
## Al Madina Restaurant — Production Readiness & AWS CI/CD

---

## 1. Task Execution Status

### Phase 1: Prototype-to-Production Migration
- [x] **Project Scaffolding:** Clean React 19 + TypeScript + Vite + Tailwind CSS v4 environment.
- [x] **Metadata & Title Sync:** Updated `metadata.json` and `index.html` with restaurant metadata, Google Fonts, and Schema.org `Restaurant` structured data.
- [x] **Theme Configuration:** Configured Google Fonts (`Instrument Serif` & `Plus Jakarta Sans`) and CSS custom variables in `src/index.css`.
- [x] **Strict Type Modeling:** Implemented TypeScript interfaces in `src/types.ts` for Menu Items, Reservations, Reviews, Order Items, and Media Slots.

### Phase 2: High-Fidelity UI Conversion (Mockup Accuracy)
- [x] **Top Navigation Bar (`Navbar.tsx`):** 3-zone contract, brand wordmark, responsive mobile drawer, staff dashboard trigger, and active order counter.
- [x] **Hero Section (`Hero.tsx`):** Headline typography matching screenshot ("Good food. *Warmly* served."), 24/7 indicator, WhatsApp CTA, Google Maps directions, and 4.4/5 rating social proof.
- [x] **Bento Grid Media Composition:** Dual tall cards with slot IDs, dimensions, floating Google rating badge, and "Made for sharing" caption.
- [x] **Continuous Marquee Ticker (`Marquee.tsx`):** GPU-accelerated infinite ticker with pause-on-hover interaction.
- [x] **Menu Section (`MenuSection.tsx`):** Category filters, search input, 6 core dishes from screenshots + 4 authentic dishes, PKR pricing, and direct WhatsApp links.
- [x] **The Place / Heritage (`PlaceStory.tsx`):** Dark card with editorial typography, phone call CTA, and 24/7 stat card.
- [x] **Guest Reviews (`ReviewsSection.tsx`):** Verified Google testimonials, 5-star ratings, author credentials, and "Write a Review" interactive modal.
- [x] **Atmosphere Gallery (`AtmosphereGallery.tsx`):** 6-card photography grid with detailed modal inspector for slot dimensions.
- [x] **Table Reservation (`ReservationSection.tsx`):** Form with date/time picker, guest count, instant confirmation modal, and WhatsApp booking dispatch.
- [x] **Find Us & Contact (`FindUsSection.tsx`):** Google Maps card, exact Karachi coordinates, store hours, and telephone contact rows.
- [x] **FAQ Accordion (`FaqSection.tsx`):** Expandable answers for operating hours, delivery, table bookings, and catering.
- [x] **Footer (`Footer.tsx`):** Dark theme footer, brand tagline, action buttons, copyright, and smooth scroll to top.
- [x] **Floating WhatsApp (`FloatingWhatsApp.tsx`):** Fixed chat trigger matching screenshot.

### Phase 3: Zero-Image Media Placeholder Architecture
- [x] **MediaPlaceholder Component:** Resilient CSS vector placeholders with slot IDs, dimensions, aspect ratios, and zero external image network dependencies.
- [x] **Design Team Hub (`StaffDashboard.tsx`):** Complete registry of all 11+ media slots with upload preview capability.

### Phase 4: Order Tray, Real WhatsApp & Live Order Tracking
- [x] **Order Drawer (`OrderDrawer.tsx`):** Slide-over order tray, quantity increments, delivery vs. takeaway selection, and formatted WhatsApp message generation.
- [x] **Live Order Tracking Engine (`OrderDrawer.tsx`):** Integrated order tracking UI with Order ID search (e.g. `ORD-8821`, `ORD-7740`, `ORD-9104`), live progress bar (0% - 100%), animated status beacon, 5-stage kitchen & delivery timeline, estimated countdown timer, delivery rider contact, and WhatsApp kitchen status inquiry.
- [x] **Navigation & Interactive Animations:**
  - Added "Track Order" button with animated compass icon and live status pulse to `Navbar.tsx`.
  - Added smooth animated hover underlines to navigation items.
  - Dish cards hover elevation (`hover:-translate-y-1.5 hover:shadow-lg`), image zoom, and micro-animations on '+ Add to Tray'.
  - Gallery cards hover scale (`scale-105`) and backdrop blur reveal.
  - Review cards hover elevation and border transitions.
  - Story section 24/7 stat card hover lift and animated clock icon.
- [x] **Staff Portal Order Dispatcher (`StaffDashboard.tsx`):** Added Kitchen Orders tab allowing staff to view orders, advance preparation status (`confirmed` -> `preparing` -> `packaging` -> `out_for_delivery` -> `delivered`), and notify customers via WhatsApp.

### Phase 5: Documentation & Production Specifications
- [x] `prd.md` — Complete Product Requirements Document.
- [x] `architecture.md` — System Architecture & AWS Infrastructure Specification.
- [x] `design.md` — Brand & Interface Design Specification.
- [x] `task.md` — Task board and implementation roadmap.
- [x] `.github/workflows/deploy.yml` — Automated AWS CI/CD pipeline.
- [x] `Dockerfile` & `nginx.conf` — Production container runtime configuration.

### Phase 6: Usability, Consistency & Accessibility Polish
- [x] **Type Scale & Font Hierarchy Harmonization:** Consistent eyebrow scales, balanced headings (`text-wrap: balance`), and tabular numerals for pricing.
- [x] **WCAG AA Contrast Compliance:** Elevated muted text across light backgrounds (`#323933` / `#384039` instead of low-contrast grays) and dark panels (`#d8e0da` / `#cbd3cf`), ensuring $\ge 4.5:1$ contrast across all text.
- [x] **Form Usability & Semantics:** Explicit `htmlFor` on all form labels and `id` on inputs across `ReservationSection` and `OrderDrawer`.
- [x] **Touch Targets ($\ge 44\text{px}$):** Updated buttons, inputs, category tabs, and action links with minimum 44px touch targets.
- [x] **Focus Ring Discipline:** Visible focus rings (`focus-visible:ring-2 focus-visible:ring-[#181c1a]`) across all interactive affordances.
- [x] **Reduced-Motion Support:** `@media (prefers-reduced-motion: reduce)` rules for users sensitive to motion.

### Phase 7: Enhanced SEO & Performance Architecture
- [x] **Rich Schema.org (JSON-LD) Graph:** Configured multi-entity `@graph` containing `Restaurant` (with geo-coordinates, hours, price range, ReserveAction, and OrderAction) and `FAQPage` (with all 4 customer questions & answers for Google Rich Search Results).
- [x] **Social Meta & OpenGraph Integration:** Validated `og:type="restaurant"`, `og:site_name`, `og:locale="en_PK"`, Twitter summary cards, and canonical link.
- [x] **Local Karachi Geo-Tags:** Added `geo.region`, `geo.placename`, `geo.position`, and `ICBM` coordinates for local search ranking in Karachi.
- [x] **Performance Code-Splitting:** Dynamic `React.lazy` loading for `OrderDrawer` and `StaffDashboard`, preventing heavy modal bundles from loading on initial visit.
- [x] **Vite Bundle Chunking:** Configured `manualChunks` in `vite.config.ts` separating `vendor-react` and `vendor-icons` for long-term browser cache efficiency.
- [x] **Resource Hints:** Added DNS prefetching for `wa.me` and `maps.google.com` along with preconnected Google Fonts with `display=swap`.

---

## 2. Design Team Handover Checklist
When the design team finalizes photography:
1. [ ] Hero: `hero-biryani.jpg` (`600 x 800`, 3:4)
2. [ ] Hero: `hero-chef.jpg` (`600 x 800`, 3:4)
3. [ ] Menu: `dish-sajji.jpg` (`800 x 600`, 4:3)
4. [ ] Menu: `dish-biryani.jpg` (`800 x 600`, 4:3)
5. [ ] Menu: `dish-karahi.jpg` (`800 x 600`, 4:3)
6. [ ] Menu: `dish-bbq-platter.jpg` (`800 x 600`, 4:3)
7. [ ] Menu: `dish-zinger.jpg` (`800 x 600`, 4:3)
8. [ ] Menu: `dish-lassi.jpg` (`800 x 600`, 4:3)
9. [ ] Story: `story-dining.jpg` (`800 x 450`, 16:9)
10. [ ] Story: `story-bread.jpg` (`400 x 400`, 1:1)
11. [ ] Location: `location-map.jpg` (`800 x 500`, 16:10)

Drop assets into `/public/assets/` or preview via the **Staff Dashboard > Design Team Media Slots** tab.
