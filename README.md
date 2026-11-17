# Quick Drivers Card

Issue printable driver ID cards with QR codes. Anyone can scan a card to
verify the driver and check the live status of their vehicle documents.

## Pages

| Route          | What it is                                                                 |
| -------------- | -------------------------------------------------------------------------- |
| `/`            | Landing page                                                               |
| `/dashboard`   | Driver registry: stats, search, status filters and a detail drawer         |
| `/driver/[id]` | Public verification page. This is where a card's QR code points; built for phones |

From the dashboard drawer you can download a driver's card as a true-size
CR80 PDF (85.6 × 53.98 mm), open their verification page, or copy its link.

## Stack

Next.js 15 (App Router) · React 19 · Sass · Framer Motion · lucide-react ·
QRious (QR codes) · html-to-image + jsPDF (card export)

## Design

- Off-white canvas, near-black ink, hairline dividers. Colour is reserved for
  document status (valid / expiring / expired).
- Type: Instrument Serif for display, Inter for UI, JetBrains Mono for plates
  and IDs. The fonts are self-hosted through `next/font` so PDF export can embed them.
- The ID card is sized in `em`, and its base font-size is tied to its
  container width (`cqw`). It renders the same at any size, including the off-screen
  copy that is used for export.

## Data

Demo data lives in `src/data/drivers.js`. Document expiry dates are stored as
day offsets from today, so the demo always shows a realistic mix of statuses.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
