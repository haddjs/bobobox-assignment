# Bobobox — Take-Home Assignment

Built with Next.js, Tailwind CSS, and Alpine.js.

---

## Project Overview

This project was built as part of a take-home assignment to demonstrate:
1. Dynamic DOM manipulation using Alpine.js.
2. API data rendering using fetch with React Hooks.
3. Clean, complex, and responsive form design using Tailwind CSS.

## Features
### Alpine.js Carousel
- Integrated Alpine.js with Next.js via <script> and ref initialisation.
- Fully interactive carousel with:
    - Auto-advance every 3 seconds.
    - Smooth transitions and fade animations.
    - Manual navigation buttons and indicators.
    - Responsive design across devices.
    - Uses placeholder images from Picsum Photos.

### Company List (Table View)
- Fetches company data from mock API:
- [`https://json-placeholder.mock.beeceptor.com/companies`](https://json-placeholder.mock.beeceptor.com/companies)
- Implements loading, success, and error states with useState + useEffect.
- Includes:
    - Search/filter functionality.
    - Responsive table view (desktop) and card view (mobile).
    - Clean, professional styling with translucent backgrounds and blur effects.

> Note:
- The provided API does not include fields such as Founded Year or Headquarters City as required in the brief. Therefore, the displayed columns are Name, Industry, Country, and Address, which closely match the available data.
- Alpine.js is intentionally used here to demonstrate lightweight, declarative DOM manipulation within a mostly-React/Next app. While Alpine.js integrates and functions correctly for the carousel, it’s not the conventional pairing for a React-first codebase. Using it is a pragmatic choice for this assignment but may not be ideal for larger, production React apps where React-native solutions are preferred.

### Company Registration Form
- Includes all requested components:
    - Company Name (text input)
    - Industry Sector (dropdown)
    - Employee Size (radio group)
    - Contact Email (text input)
    - Headquarters City (text input)
    - Terms & Conditions checkbox
    - Submit button
- Form state and validation are intentionally omitted (per assignment spec).

## View Switching
- Users can toggle between Company List and Company Registration views using a simple, elegant tab system with animated active states.

## Responsiveness
- Fully responsive on mobile, tablet, and desktop.
- Adaptive layouts:
    - Table switches to card list on smaller screens.
    - Carousel adjusts its height accordingly.

## Aesthetics
- Professional modern theme inspired by Apple Glassmorphism.
- Smooth animations and consistent spacing for clean UI flow.
