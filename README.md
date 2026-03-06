# EGZOTech

Recruitment Task

[Demo](https://egzotech.vercel.app)

## Technologies

   - Frontend - `Next.js`
   - Backend - `Next.js`
   - Database - `Supabase` (Drizzle ORM)
   - Language - `typescript`
   <br />

   - Auth - `bcryptjs` and `next-auth` with JWT
   - Data validation - `zod`
   - UI - `chakra-ui`
   - UI Docs - `storybook`
   - Data Fetching - `tanstack/react-query`
   - Package Manager - `pnpm`

## Installation and run

1. Start application
   ```cmd
   git clone https://github.com/kryzasada/egzotech
   cd egzotech
   pnpm install
   pnpm run dev
   ```

2. Start storybook
   ```cmd
   pnpm run storybook
   ```


## Production deployment notes

This application was designed and built with production deployment in mind. However, the following improvements should be considered before going live:

- **Email verification** — Add email confirmation to the registration flow to prevent fake or mistyped addresses.
- **User profile data** — Extend the registration form to collect optional profile fields only if they are required by the product
- **Failed login attempts** — Add rate limiting and temporary lockouts to reduce brute-force risk
- **JWT token refresh** — Implement refresh token rotation with server-side revocation stored in the database
- **Database security** — Restrict access to user_credentials using least-privilege policies and audit-friendly controls.
- **Database normalization** — The database structure should be reviewed for normalization

## Database schema
![alt text](https://github.com/kryzasada/egzotech/blob/master/marketing/supabase-schema.svg)

## Application

#### Register Page
![alt text](https://github.com/kryzasada/egzotech/blob/master/marketing/EGZOTech-register.png)

#### Home Page
![alt text](https://github.com/kryzasada/egzotech/blob/master/marketing/EGZOTech-home.png)

#### Setting Page
![alt text](https://github.com/kryzasada/egzotech/blob/master/marketing/EGZOTech-settings.png)

#### Exercises Page
![alt text](https://github.com/kryzasada/egzotech/blob/master/marketing/EGZOTech-exercises.png)

#### Exercise Task Modal
![alt text](https://github.com/kryzasada/egzotech/blob/master/marketing/EGZOTech-exercise-started.png)