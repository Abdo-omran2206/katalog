# Katalog

I built Katalog as a simple, human-centered way to compose messages (with media) that will be delivered to your loved ones, only after a verified period of inactivity. It’s a modern Next.js app that focuses on clarity, mobile-first UX, and a clean handoff to a PHP API.

## What this is
- A Next.js (App Router) frontend for drafting messages with recipients and attachments
- A dashboard showing your latest messages
- A "Digital Trustee" settings screen to configure inactivity-based verification

## Why it exists
Preparing for the unexpected is hard. Katalog makes it easy to write and safely stage messages now, and let a verification process decide when they should be sent later.

## Tech
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS 4 for styling and responsive utilities (I use `max-sm:` heavily)
- lucide-react icons, SweetAlert2 for feedback
- Talks to a PHP backend at `http://localhost/api/...`

## Run it
1. Install deps
```bash
npm install
```
2. Dev server
```bash
npm run dev
```
Visit `http://localhost:3000`.

3. Production
```bash
npm run build
npm start
```

## Configure the backend
This UI expects these endpoints to exist (adjust URLs in the code if needed):
- `GET http://localhost/api/message/getmessage.php` — fetch latest messages
- `POST http://localhost/api/message/createmessage.php` — create a new message
- `GET|POST|PUT http://localhost/api/account/trustees.php` — trustee and inactivity settings

## Where to change things
- Dashboard UI: `app/dashboard/page.tsx`
- Latest messages card + hero: `app/dashboard/componets/maincontent.tsx`
- Create form: `app/dashboard/create/page.tsx`
- Trustee settings: `app/dashboard/componets/Trustees.tsx`
- Global layout/head: `app/layout.tsx`
- Global styles: `app/globals.css`

Note: The folder name is `componets` in the repo (typo preserved).

## Styling & UX
- Mobile-first: I tailor typography, spacing, and layout with `max-sm:` utilities
- Buttons are large/tappable; cards are readable with safe line lengths
- Icons: lucide-react; Favicon: `public/favicon.svg` (black/white book)

## Scripts
- `npm run dev` — start dev server
- `npm run build` — compile production build
- `npm start` — run production server
- `npm run lint` — lint

## Deploy
- Vercel works out of the box for this frontend
- Ensure the PHP API is reachable from your domain (CORS + HTTPS)

## Roadmap (nice-to-haves)
- Auth guards and session handling
- File previews and size/type validations
- Better error surfaces and retries
- Environment-based API base URL

## License
Add the license you prefer if you plan to distribute. 
