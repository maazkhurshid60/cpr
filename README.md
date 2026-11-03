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

The seat request, group quote and contact forms send from the browser through
[Web3Forms](https://web3forms.com), because GitHub Pages can't run server code. Create a free
access key for the inbox that should receive enquiries, then set it as `NEXT_PUBLIC_WEB3FORMS_KEY`
in `.env.local` for local testing. Until it is set, the forms show the phone number and email
instead of a thank-you.

## Deploying to GitHub Pages

`npm run build` writes a static site to `out/`. `.github/workflows/deploy.yml` builds and
publishes it on every push to `master`.

One-time setup on GitHub:

1. **Settings -> Pages -> Build and deployment -> Source:** choose **GitHub Actions**.
2. **Settings -> Secrets and variables -> Actions -> Variables**, add:
   - `WEB3FORMS_KEY`: the Web3Forms access key (the forms don't send without it).
   - `SITE_URL`: the live address, e.g. `https://www.drztraining.com`, once a custom domain is
     attached. Leave it unset while the site is on `username.github.io/cpr`.
3. Push to `master`, or run the workflow from the **Actions** tab. The site appears at
   `https://<username>.github.io/cpr/`.

The workflow reads the sub-path (`/cpr`) from the Pages settings, so routes and images work under
it. Attaching a custom domain under **Settings -> Pages** switches that to the root automatically.
