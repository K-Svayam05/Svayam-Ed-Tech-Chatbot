# Svayam Ed-Tech Chatbot

## Overview

**Svayam** is an AI-powered educational chatbot designed to deliver personalized learning experiences. By understanding your educational background, learning style, and country-specific curriculum, Svayam provides tailored explanations and guidance, making complex concepts accessible and relatable. Whether you're a student or a lifelong learner, Svayam adapts to your needs, helping you build knowledge efficiently and effectively.

## Features

- **Personalized Explanations:** Answers are tailored to your education level, age, and country.
- **Context-Aware Responses:** The chatbot connects new concepts to what you already know.
- **Support for Multiple Learning Styles:** Visual, auditory, reading/writing, and kinesthetic preferences.
- **Cultural Relevance:** Uses examples and analogies relevant to your background.
- **Chat History:** Stores your previous questions and answers for easy reference.
- **Rate Limiting:** Prevents spam and ensures fair usage.
- **Secure Authentication:** JWT-based user authentication.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, shadcn-ui, Tailwind CSS
- **Backend:** Flask, Flask-SQLAlchemy, Flask-Migrate, Flask-CORS
- **AI Model:** Google Gemini Generative AI
- **Database:** PostgreSQL (NeonDB recommended)
- **Deployment:** Vercel (static + Python serverless)

## Getting Started

### Prerequisites
- Node.js & npm
- Python 3.8+
- PostgreSQL (local or NeonDB)

### 1. Clone the Repository
```sh
git clone <YOUR_GIT_URL>
cd Svayam-Ed-Tech-Chatbot
```

### 2. Install Frontend Dependencies
```sh
npm install
```

### 3. Install Backend Dependencies
```sh
pip install -r requirements.txt
```

### 4. Environment Variables
Create a `.env` file in the project root with the following (update values as needed):
```
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
GOOGLE_API_KEY=your_google_gemini_api_key
JWT_SECRET_KEY=your_secret_key
```

### 5. Database Migration
Run the following to set up your database:
```sh
flask db upgrade
```
Or, if using Alembic directly:
```sh
alembic upgrade head
```

### 6. Running the Application
#### Backend (Flask)
```sh
python run.py
```
Or for production (e.g., with Gunicorn):
```sh
gunicorn wsgi:app
```

#### Frontend (Vite)
```sh
npm run dev
```

The frontend will be available at `http://localhost:5173` by default.

## API Usage
- All API endpoints are prefixed with `/api`.
- Main chat endpoint: `POST /api/chat` (requires JWT authentication)
- Chat history: `GET /api/chat/history`

## Deployment
This project is ready for deployment on Vercel. The `vercel.json` configures both the frontend and backend. Push your code to a Git provider and connect the repo to Vercel.

## Database Migration to Neon Postgres

1. **Set the DATABASE_URL environment variable**
   - For local development, add to `.env`.
   - For Vercel, set in Project Settings > Environment Variables.

2. **Migrate your local Postgres data to Neon**
   - Dump your local database:
     ```sh
     pg_dump --dbname=postgresql://<local_user>:<local_password>@localhost/<local_db> --format=custom --file=local_db.dump
     ```
   - Restore to Neon:
     ```sh
     pg_restore --no-owner --no-privileges --dbname="<your_neon_database_url>" local_db.dump
     ```

3. **Run Alembic Migrations**
   ```sh
   flask db upgrade
   # or
   alembic upgrade head
   ```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
