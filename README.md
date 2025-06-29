# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c4a9cdc7-0953-4e4e-b4e3-df96ea3bde75

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c4a9cdc7-0953-4e4e-b4e3-df96ea3bde75) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c4a9cdc7-0953-4e4e-b4e3-df96ea3bde75) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Database Migration to Neon Postgres

### 1. Set the DATABASE_URL environment variable

For local development and deployment (e.g., Vercel), set the following environment variable:

```
DATABASE_URL=postgresql://neondb_owner:npg_YS3CWp5bKasy@ep-twilight-darkness-a4dfd89u-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
```

- For local development, you can add this line to a `.env` file in the project root.
- For Vercel, add this variable in the Vercel dashboard under Project Settings > Environment Variables.

### 2. Migrate your local Postgres data to Neon

**A. Dump your local database:**

```
pg_dump --dbname=postgresql://<local_user>:<local_password>@localhost/<local_db> --format=custom --file=local_db.dump
```

**B. Restore to Neon:**

```
pg_restore --no-owner --no-privileges --dbname="postgresql://neondb_owner:npg_YS3CWp5bKasy@ep-twilight-darkness-a4dfd89u-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require" local_db.dump
```

Replace `<local_user>`, `<local_password>`, and `<local_db>` with your local database credentials.

### 3. Alembic Migrations

Alembic is now configured to use the Neon DB. To run migrations:

```
flask db upgrade
```

or (if using Alembic directly):

```
alembic upgrade head
```
