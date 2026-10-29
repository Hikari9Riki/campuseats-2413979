# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s):
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 2
- Tool(s):
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

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
- One thing the AI got wrong and how I fixed it: (fill this in — e.g. it initially left
  `onView` out of the menu cards, so "Recently viewed" never updated until I wired it
  through `MenuList` → `MenuItemCard`).
