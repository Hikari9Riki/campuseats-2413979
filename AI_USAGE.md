# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s): None
- What I asked for: Built the initial CampusEats static vendor and menu layout from the Week 1 lab sheet.
- What I kept, changed or rejected, and why: Wrote the components directly following the starter CSS and my own vendor data (TakaYoooo, `2413979`).
- One thing the AI got wrong and how I fixed it: N/A (did not use AI in Week 1).

## Week 2
- Tool(s): None
- What I asked for: Added interactive vendor selection state and the initial personal feature (matric last digit 9: Recently viewed items).
- What I kept, changed or rejected, and why: Kept state in `App.jsx` and passed handlers via props.
- One thing the AI got wrong and how I fixed it: N/A (did not use AI in Week 2).

## Week 3
- Tool(s): LM Studio (Bionic coding agent)
- What I asked for: Modify the CampusEats project according to the W03 lab sheet —
  move vendors to `public/api/vendors.json`, fetch with loading/error/retry and an
  AbortController cleanup, build a lifted cart, a validated checkout form, view-state
  routing, and the "Recently viewed" personal feature (matric last digit 9).
- What I kept, changed or rejected, and why: Kept the agent's structure (Status,
  CartItem, CartPage, CheckoutForm) and filled the TODO validation rules; adjusted the
  checkout validation to also require a chosen pickup time and mahallah, and derived
  totals/counts with `reduce` instead of storing them.
- One thing the AI got wrong and how I fixed it: It initially left `onView` out of the
  menu cards, so "Recently viewed" never updated until I wired it through
  `MenuList` -> `MenuItemCard`.

## Week 4
### Gemini Coding Assistant
- What I asked for: Refactor CampusEats for Week 4 — extract custom hooks
  (`useLocalStorage`, `useVendors`, `useCart`), move cart and orders state into
  `CartContext`/`CartProvider`, set up multi-page routing with `react-router`
  (`Layout` + `Outlet`, `HomePage`, `VendorPage`, `CartPage`, `OrdersPage`,
  `NotFoundPage`), and update the matric digit 9 personal feature ("Recently viewed")
  so viewed items persist with `useLocalStorage` and appear on `HomePage` as links
  to their vendor page.
- What I kept, changed or rejected, and why: Kept the custom hooks, `CartProvider`,
  and route structure matching the lab sheet. Removed old cart prop drilling from
  `Header`, `MenuList`, and `CartPage` so they consume `useCart()` directly, and deleted
  the old `src/components/CartPage.jsx` after moving it to `src/pages/CartPage.jsx`.
- One thing the AI got wrong and how I fixed it: An older snippet suggested importing
  from `react-router-dom`, which is deprecated in modern React Router; I changed all
  router imports to come directly from `'react-router'` as specified in the lab sheet.

### DeepSeek (chat assistant)
- What I asked for: Review and expand `public/api/vendors.json` so every vendor has
  exactly 8 menu items, with the menu content themed to each vendor — TakaYoooo as a
  Japanese vendor, Kafe Mahallah Aminah as a regular student food vendor, Himar Jannah
  as a (fictional, donkey-themed) Arabic cuisine vendor, and Chinese Muslim Restaurant
  as a Chinese food vendor.
- What I kept, changed or rejected, and why: Kept all existing vendor ids, menu ids,
  locations, open hours and `isOpen` flags so nothing downstream (favourites, recently
  viewed, cart keys) broke. Replaced the off-theme items at TakaYoooo (removed
  `Ayam Goreng Berempah`, `Mee Goreng Mamak`, `Teh O Ais Limau`, `Roti Bom`,
  `Sagu Gula Melaka`, `TakaDrink`) with Japanese dishes/drinks/desserts, keeping
  `Karagee Hokage`, `TakaTakamen` and `Nasi Lemak Taka` as the `popular` flags. Added
  six new student-food items to Kafe Mahallah Aminah, five Arabic items to Himar Jannah
  (including `Shawarma Himar` and `Kunafa`), and five Chinese items to Chinese Muslim
  Restaurant. Preserved the existing `available: false` entries (`Himar Halib`,
  `Chinese Tea`).
- One thing the AI got wrong and how I fixed it: Its first pass only topped up the
  menus without removing the off-theme items at TakaYoooo, so it ended up with more
  than 8 items and a `Roti Bom` sitting next to `Karagee Hokage`. I rejected that
  version, asked for a themed rewrite instead of an append, and manually verified the
  final file has exactly 8 items per vendor with every `id` still unique and prefixed
  with its vendor id.