# ICSF Backend

Independent Node.js API for the Institute of Cybersecurity & Forensics platform. It connects to the separate React frontend through `VITE_API_URL` and stores users, sessions, courses, lessons, enrollments and progress in PostgreSQL.

## What it provides

- Session-based authentication with secure, HTTP-only cookies
- Student registration and shared role-aware login
- Admin, tutor and student authorization
- Administrator-created tutor accounts and one-time temporary passwords
- Course publishing and tutor assignment
- Pending enrollment requests and administrator approval
- Server-enforced lesson locking until approval
- Modules, lessons and student progress
- Account suspension with immediate access revocation
- Contact-message storage, input validation and rate limiting

## Local setup

1. Install Node.js 20 or newer and PostgreSQL.
2. Create a PostgreSQL database named `institute_db` using pgAdmin or `psql`. SQL commands do not run directly in PowerShell.
3. Copy `.env.example` to `.env` and replace every example value.
4. Run:

```powershell
npm install
npm run db:push
npm run db:seed
npm run dev
```

The health check is `http://localhost:4000/api/health`.

## Initial administrator

`npm run db:seed` creates the administrator using `ADMIN_NAME`, `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`. The password is hashed before storage. Change it after the first successful login and remove `ADMIN_PASSWORD` from the hosting environment after seeding.

## Connect the frontend locally

Create `.env` in the React frontend:

```env
VITE_API_URL=http://localhost:4000/api
```

The backend `.env` must contain:

```env
CLIENT_URL=http://localhost:5173
```

Restart both projects after changing environment variables.

## Production deployment

Deploy this folder as a separate web service. On Render, use the included `render.yaml`, then set:

- `DATABASE_URL`: PostgreSQL connection string from the database provider
- `CLIENT_URL`: exact Vercel URL, without a trailing slash
- `ADMIN_EMAIL`: initial administrator email
- `ADMIN_PASSWORD`: strong temporary administrator password

After the first deployment, open the provider shell and run `npm run db:seed` once. Set the frontend's Vercel environment variable to:

```env
VITE_API_URL=https://your-backend-host/api
```

Redeploy the frontend after adding the variable. Never put `DATABASE_URL`, `SESSION_SECRET` or administrator passwords in Vercel's frontend variables.

For custom domains, use `www.yourdomain.tld` for the frontend and `api.yourdomain.tld` for this service. Add the exact frontend origin to `CLIENT_URL`. Multiple permitted frontend origins can be comma-separated.
