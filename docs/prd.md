# Product Requirements Document (PRD)
## Al Madina Restaurant — Production Web Application

**Document Version:** 1.0.0  
**Target Release:** Production  
**Status:** Active  
**Author:** AI Studio Engineering Team  
**Stakeholders:** Al Madina Restaurant Management, Guest Users, Design & Media Team  

---

## 1. Executive Summary
Al Madina Restaurant is an iconic culinary destination located in Police Lines Quarters, Karachi, operating 24 hours a day, 7 days a week. This web application transforms the static UI prototype into an ultra-fast, fully responsive, production-ready digital storefront and table reservation portal.

The application adheres strictly to the established design aesthetics, typography, and layout contracts while introducing interactive WhatsApp ordering, real-time table booking with verification, customer reviews, an interactive FAQ system, and an integrated Staff Management Portal. All visual elements are backed by a standardized Media Placeholder System designed to allow the creative design team to drop finalized photography into production seamlessly.

---

## 2. Target Audience & Personas
1. **Local Diners & Families (Karachi):** Looking for authentic Biryani, Sajji, Karahi, and BBQ with clear pricing in PKR, opening hours, directions, and phone numbers.
2. **Late-Night & Takeaway Customers:** Requiring frictionless 24/7 ordering via WhatsApp with itemized dishes and order notes.
3. **Event & Party Organizers:** Submitting advance requests for table reservations and party catering.
4. **Restaurant Managers & Staff:** Managing table requests, updating dish pricing/availability in real-time.
5. **Creative & Brand Design Team:** Replacing media placeholders with production-grade food photography without needing code modifications.

---

## 3. Core Functional Requirements

### 3.1. Landing Page & Hero Experience
- **Top Navigation Bar:** Persistent navigation adhering to the 3-zone contract (Brand mark, clean navigation links, and primary CTA with item counter).
- **Hero Section:** High-contrast editorial typography ("Good food. *Warmly* served."), 24/7 Karachi status indicator, instant WhatsApp order trigger, Google Maps directions link, and 4.4/5 rating social proof.
- **Bento Media Cards:** Dual responsive card showcase displaying media placeholders with slot IDs, dimensions, and floating rating badges.
- **Animated Marquee:** High-performance, GPU-accelerated ticker showcasing brand attributes with pause-on-hover interaction.

### 3.2. Menu & WhatsApp Ordering Engine
- **Search & Filter:** Instant client-side search across dish titles, ingredients, and tags. Filterable by `All`, `Featured`, `Biryani`, `Karahi`, `BBQ`, `Fast Food`, and `Drinks`.
- **Item Pricing & Details:** Accurate PKR (`Rs.`) pricing formatted with tabular numerals for alignment.
- **WhatsApp Integration:** 
  - Direct 1-click WhatsApp order link per dish.
  - Interactive **Order Tray (Slide-over Cart)** allowing customers to adjust quantities, specify delivery or pickup, provide address, and generate an itemized WhatsApp message with calculated bill.

### 3.3. Story & Heritage ("The Place")
- Dark contrast container communicating brand history, 24/7 service availability, and direct telephone call affordance (`+92 310 0004146`).

### 3.4. Guest Testimonials & Reviews
- Display of verified Google reviews (rating, text, author, relative timestamp).
- "Leave a Review" modal enabling guests to submit star ratings and testimonials dynamically stored in client state.

### 3.5. Table Reservation System ("Your Table")
- Responsive booking form capturing guest name, phone number, reservation date, time, party size (1–20 guests), and special requests (e.g. family hall, child seating).
- Form validation and instant confirmation modal with unique booking reference (`RES-XXXX`).
- One-tap WhatsApp confirmation link dispatching structured reservation data to the restaurant floor manager.

### 3.6. Location & Contact ("Find Us")
- Karachi Police Lines Quarters plus code (`V262+F9`), telephone, 24-hour schedule, and Google Maps deep links.

### 3.7. Interactive FAQ
- Accordion-style expandable panels addressing opening hours, delivery policies, table bookings, and event catering.

### 3.8. Staff Portal & Design Media Hub
- Hidden/protected staff dashboard providing:
  - Table reservation status lifecycle (`pending` → `confirmed` → `seated` → `cancelled`).
  - Dish pricing and stock status toggles (`In Stock` / `Sold Out`).
  - Media Slot Registry documenting all 11+ image slots with dimensions, aspect ratios, art direction briefs, and live image preview uploads.

---

## 4. Non-Functional Requirements
1. **Performance & Page Speed:** First Contentful Paint (FCP) < 0.8s, Largest Contentful Paint (LCP) < 1.2s, 0 image network blocking via lightweight styled placeholders.
2. **Zero-Slop UI & Accessibility:** WCAG AA compliant contrast ratios, visible focus outlines, zero broken image frames, zero fake telemetry clutter.
3. **Mobile Responsiveness:** Fluid scaling from 320px mobile viewports to 1440px+ ultra-wide displays without horizontal scrolling.
4. **Data Persistence:** Graceful client-side caching via `localStorage` with offline readiness.

---

## 5. Media Placeholder Transition Plan
The design team will replace placeholder slots according to the registry:
- Drop optimized JPG/WebP assets into `/public/assets/{placeholderId}.jpg`.
- Asset guidelines: WebP format, 82% quality compression, sRGB color profile, descriptive alt attributes.
