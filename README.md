# EGZOTech

Recruitment Task

[Demo](https://egzotech-notification.vercel.app/)

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
   - Data fetching - `tanstack/react-query`
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

- **Email verification** — The registration flow currently does not require email address confirmation. Adding this step would improve security and ensure valid contact details.
- **User profile data** — During registration, optional fields such as gender, weight, and height are not collected. Extending the form would provide more complete user profiles for the application.
- **Failed login attempts** — There is no mechanism to track or limit invalid login attempts (e.g. rate limiting or temporary lockouts). Implementing this would help protect against brute-force attacks.
- **JWT token refresh** — The current approach should be updated to use refresh tokens stored in the database instead of relying solely on JWT expiration.
- **Database security** — Additional security measures are recommended, especially for the `user_credentials` table, such as encryption of sensitive fields and stricter access controls.
- **Database normalization** — The database structure should be reviewed for normalization.

## Database schema
![alt text](https://github.com/kryzasada/egzotech/blob/main/marketingimg/supabase-schema.svg)

## Application

#### Register Page
![alt text](https://github.com/kryzasada/egzotech/blob/main/marketingimg/EGZOTech-register.png)

#### Home Page
![alt text](https://github.com/kryzasada/egzotech/blob/main/marketingimg/EGZOTech-home.png)

#### Setting Page
![alt text](https://github.com/kryzasada/egzotech/blob/main/marketingimg/EGZOTech-settings.png)

#### Exercises Page
![alt text](https://github.com/kryzasada/egzotech/blob/main/marketingimg/EGZOTech-exercises.png)

#### Exercise Task Modal
![alt text](https://github.com/kryzasada/egzotech/blob/main/marketingimg/EGZOTech-exercise-task.png)