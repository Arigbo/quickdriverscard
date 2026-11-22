# Quick Drivers Card

Issue printable driver ID cards with QR codes. Anyone can scan a card to
verify the driver and check the live status of their vehicle documents.

## Pages

| Route          | What it is                                                                 |
| -------------- | -------------------------------------------------------------------------- |
| `/`            | Landing page                                                               |
| `/dashboard`   | Driver registry: stats, search, status filters and a detail drawer         |
| `/driver/[id]` | Public verification page. This is where a card's QR code points; built for phones |

**Dashboard**
- **Add driver:** a form for identity, vehicle, emergency contact, an optional photo,
  and any number of documents with a scan or PDF.
- **Driver panel:**
  - Download the card as a true-size CR80 PDF (85.6 × 53.98 mm).
  - Open the verification page or copy its link.
  - Browse each document's history, upload a renewal, or add a new document.

**Document history.** Every document keeps all of its versions. On the verification
page and in the dashboard, each document is an expandable row. The row shows the current
status, and opening it reveals a timeline of every version, from newest to oldest.
Selecting a version opens a viewer showing the uploaded scan or PDF, or a clearly
marked specimen for demo data. The viewer also shows the document's details and has
newer/older navigation (arrow keys work too).

## Stack

Next.js 15 (App Router) · React 19 · Sass · Framer Motion · lucide-react ·
QRious (QR codes) · html-to-image + jsPDF (card export) · Lenis (smooth scroll)

## Design

- Off-white canvas, near-black ink, hairline dividers. Colour is reserved for
  document status (valid / expiring / expired).
- Type: Instrument Serif for display, Inter for UI, JetBrains Mono for plates
  and IDs. The fonts are self-hosted through `next/font` so PDF export can embed them.
- The ID card is sized in `em`, and its base font-size is tied to its
  container width (`cqw`). It renders the same at any size, including the off-screen
  copy that is used for export.

## Motion

Motion components live in `src/components/motion/`. All of them respect `prefers-reduced-motion`.

- **Smooth scroll:** Lenis inertial scrolling. Scrollable overlays opt out with `data-lenis-prevent`.
- **Cursor:** a dot plus a lagging ring that grows over interactive elements. It shows a label for `data-cursor="Label"`. Only on mouse and trackpad devices.
- **Magnetic buttons:** `<Magnetic>` pulls its child toward the pointer.
- **3D card:** `<TiltCard>` tilts toward the pointer with moving light, floats when idle, and flips to a back face on click.
- **Scroll effects:**
  - hero parallax
  - a pinned section where a deck of cards fans out in 3D
  - text that lights up word by word (`<ScrubText>`)
  - a marquee whose speed follows scroll velocity
  - a phone mock-up that stands up in 3D and runs a scan
  - a scroll progress bar
  - a nav that hides on scroll down
- **Details:**
  - word-by-word headline reveals
  - count-up stats
  - a sliding filter pill and animated row reflow
  - a plate number that decodes like a scanner
  - a pulsing status dot
  - a dot-grid light that follows the cursor

## Document verification (Nigeria)

The app knows which documents a Nigerian driver needs. These depend on whether
the vehicle is private or commercial, and imported or local. The app can also
check each document with the authority that issued it.

- **Automatic checks:** the driver's licence (FRSC, via Dojah) and plate
  number (NVIS, via Prembly) are checked through `POST /api/verify`. API keys
  stay on the server. Results are matched against the record on file.
- **Guided manual checks:** insurance (NIID), vehicle licence, proof of
  ownership and hackney permit (AutoReg), roadworthiness (Lagos DVIS) and
  customs papers (CVMS). The dashboard opens the official portal, shows what to
  enter, and records the outcome.
- **Required-documents checklist:** shown in the dashboard and on the public
  verification page. The verification page also shows how many documents have
  been confirmed with the issuing authorities.

With no keys set, checks run in a labelled **simulated** mode. Copy
`.env.example` to `.env.local` and add provider keys to go live. Research,
portal links and sources are in
[`docs/nigeria-document-verification.md`](docs/nigeria-document-verification.md).

## Data

Demo data lives in `src/data/drivers.js`. Document expiry dates are stored as
day offsets from today, so the demo always shows a realistic mix of statuses.
Each document's earlier versions are generated as its history.

Drivers and documents added in the dashboard are saved in the browser's
**IndexedDB** (`src/lib/store.js`) and merged with the demo data. They show up on
the dashboard and the verification page in that browser, and stay in sync
across its tabs. **They are not shared between devices.** To make that work,
back the functions in `src/lib/store.js` with an API and a database (for
example Postgres, plus object storage for files). The UI doesn't need to change.

## SEO

- **Metadata:** title template, description, canonical URLs, Open Graph and Twitter
  cards (`src/app/layout.jsx` and per page).
- **Share images:** generated with `next/og`. The site has one, and each verification
  link gets its own showing the plate number and status. Names are left out on purpose.
- **Crawling:** `robots.txt` and `sitemap.xml`. Verification pages are `noindex` and
  disallowed, because they hold personal data.
- **App and icons:** web app manifest, SVG icon, favicon, Apple touch icon and maskable PNG icons.
- **Structured data:** JSON-LD (`WebSite` and `WebApplication`) on the landing page.

Set `NEXT_PUBLIC_SITE_URL` to the production URL (e.g.
`https://quickdriverscard.vercel.app`) so canonical URLs, the sitemap and share
images use absolute links. On Vercel the production domain is detected
automatically.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
