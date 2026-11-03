# DRZ Emergency Response Training website

Next.js 16 (App Router, Cache Components) with Tailwind CSS 4. Every page is prerendered static.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Where to change things

| To change | Edit |
| --- | --- |
| Phone, email, hours, address, service area | `lib/site.ts` |
| Course details, individual prices, durations | `lib/courses.ts` (`price: null` shows "Call for price") |
| Class dates and seats on /schedule | `lib/schedule.ts` (past dates hide themselves) |
| FAQ answers | `lib/faqs.ts` |
| Logo | `app/components/Logo.tsx` and `app/icon.svg` |
| Colours and fonts | `app/globals.css` and `app/layout.tsx` |
| Cancellation policy | `app/cancellation-policy/page.tsx` |

## Form emails

The seat request, group quote and contact forms send email through Resend. Copy `.env.example`
to `.env.local` (or set the same variables on the host) and fill in `RESEND_API_KEY` and
`LEAD_FROM_EMAIL`. Until then the forms show the phone number and email instead of a thank-you,
and each enquiry is written to the server log so nothing is lost.

Set `NEXT_PUBLIC_SITE_URL` to the live domain so canonical links and the sitemap are correct.
