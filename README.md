## Liture Admin

Liture Admin is the Next.js application that powers the Liture EdTech public website and internal admin console. It combines the marketing site, user authentication, and admin workflows for managing webinars, internships, memberships, registrations, members, and dashboard analytics.

## What It Does

- Public landing experience with sections for the brand story, achievements, opportunities, memberships, members, and contact.
- Public listings for webinars and internships.
- Authentication flows for login, signup, email verification, password reset, and forgot-password.
- Admin dashboard with analytics cards, charts, and recent registration tables.
- Management screens for webinars, internships, memberships, users, and registrations.
- Server-side auth and data fetching backed by a Django API.

## Tech Stack

- Next.js 16 with the App Router
- React 19
- Tailwind CSS 4
- NextAuth for authentication
- React Query and TanStack Table for data-heavy admin views
- MongoDB-related dependencies for data access where needed
- Nodemailer and Resend for email workflows

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm, pnpm, yarn, or bun
- A running Django API for authentication and app data

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm run start
```

## Environment Variables

The app expects these variables in the local environment or deployment platform:

- `DJANGO_API_URL` - base URL for the backend API
- `FRONTEND_URL` - public frontend URL used in email and redirect flows
- `NEXTAUTH_SECRET` - secret for NextAuth
- `EMAIL_HOST` - SMTP host, defaults to `smtp.gmail.com`
- `EMAIL_PORT` - SMTP port, defaults to `465`
- `EMAIL_HOST_USER` - SMTP username
- `EMAIL_HOST_PASSWORD` - SMTP password
- `EMAIL_FROM` - sender address for outgoing email

If you use remote images or file uploads, make sure the deployment environment also allows the configured asset host.

## Project Structure

- `app/(root)` - public site pages and sections
- `app/(auth)` - authentication pages and flows
- `app/(admin)` - protected admin pages and dashboard
- `app/api` - route handlers that support auth and user endpoints
- `app/_components` - shared UI for the app routes
- `components` - reusable UI primitives and shared components
- `service` - client helpers for API calls and business operations
- `lib` - auth, email, action, and validation utilities

## Main Routes

- `/` - public homepage
- `/webinars` - webinar listings
- `/internships` - internship listings
- `/login` - sign in
- `/signup` - sign up
- `/forgot-password` - request password reset
- `/reset-password` - complete password reset
- `/verify-email` - confirm email address
- `/admin` - admin dashboard
- `/admin/webinars` - manage webinars
- `/admin/internships` - manage internships
- `/admin/memberships` - manage memberships
- `/admin/users` - manage users
- `/admin/registrations/*` - view registrations by type

## Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run lint checks

## Notes

- The admin dashboard is protected and redirects unauthorised users to the login page.
- Several views depend on the Django backend being available, so the app is best run with the API configured.
- Remote assets are configured in `next.config.mjs` for the allowed image host.
