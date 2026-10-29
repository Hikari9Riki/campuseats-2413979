# CampusEats

A cross-platform food-ordering app for BICS 3301 (IIUM). Built with React + Vite.

## Running

```bash
npm install
npm run dev
```

Vendor data is served as a mock API from `public/api/vendors.json`
(opens at `http://localhost:5173/api/vendors.json`).

## Week 3 features

- Vendors and menus load from `/api/vendors.json` via `useEffect`, with loading,
  error + "Try again", and an `AbortController` cleanup.
- A real cart lifted to `App`: lines of `{ item, qty }` that merge on repeats,
  `+`/`−`/remove controls, a badge showing total quantity, and a derived total.
- View state (`'menu' | 'cart' | 'done'`) switches between the menu, cart and
  "Order placed" screens (no router yet).
- A controlled checkout form (name, mahallah, pickup time) with per-field
  validation and `preventDefault`.
- Personal feature (matric last digit 9): **Recently viewed menu items** — tracks
  the last 5 items you viewed, newest first, no duplicates, with a Clear button.

## Vendors

Vendor 1 (TakaYoooo) is my own shop (matric `2413979`), with a full menu of 8+
items across 3+ categories.

Vendors 2–4 are from classmates:

- Kafe Mahallah Aminah — from `2415666`
- Himar Jannah — from `2410233`
- Chinese Muslim Restaurant — from `2416789`
