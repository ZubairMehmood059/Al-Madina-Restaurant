# Al Madina Restaurant

A modern, responsive restaurant website for Al Madina Restaurant in Karachi. The app showcases the restaurant’s menu, story, reviews, location details, reservation flow, and WhatsApp ordering experience.

## Overview

Al Madina Restaurant serves authentic Pakistani cuisine, including biryani, karahi, BBQ, sajji, and fast food favorites. This project turns the restaurant’s brand into a polished digital storefront for guests, staff, and the design team.

### Included features

- Hero section and brand storytelling
- Menu browsing with category filters
- WhatsApp order tray with quantity adjustments and delivery/pickup options
- Reservation form with status tracking
- Customer review gallery and review submission flow
- FAQ and location/contact information
- Staff dashboard for managing reservations, menu pricing, and item availability
- Local persistence using browser storage for menu, orders, reviews, and reservations

## Tech stack

- React 19
- Vite
- TypeScript
- CSS and custom styling
- Local browser state persistence

## Project structure

- `src/App.tsx` — main application composition and state management
- `src/components/` — page sections and interactive UI components
- `src/data/restaurantData.ts` — menu, reviews, and restaurant content
- `src/types.ts` — shared TypeScript interfaces
- `public/` — static assets and gallery media placeholders
- `docs/` — product and design documentation

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The app will start on:

```text
http://localhost:3000
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Available scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Notes

- This project is a client-side restaurant app and does not require an API key to run locally.
- Menu items, reservations, reviews, and tracked orders are stored in the browser using `localStorage` for a lightweight demo experience.
- The WhatsApp order flow is designed for direct ordering and customer communication with the restaurant team.

## License

This project is intended for restaurant showcase and demo use within the project workspace.
