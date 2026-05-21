# NEXUS

The Ultimate Digital Second Brain & Personal Knowledge Operating System.

## Architecture

- **Frontend**: React 19, Vite 6, TypeScript, Tailwind CSS v4, Framer Motion, shadcn/ui.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM.
- **AI**: OpenAI & OpenRouter (Gemini 2.0 Flash).

## Setup Instructions

To get the application running locally, follow these steps:

### 1. Database Setup
Ensure you have a PostgreSQL database running and update the `DATABASE_URL` in `nexus/server/.env`.

### 2. Backend Setup
```bash
cd server
npm install
npx prisma generate
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Key Features

- **Universal Memory**: Contextual retrieval from your notes and chat history.
- **Document Intelligence**: Upload documents for instant summaries and AI-generated quizzes.
- **Knowledge Workspace**: Premium markdown editor with Apple-inspired design.
- **Global Search**: Command palette (CMD+K) for instant navigation.
- **Productivity Hub**: Integrated tasks, goals, and focus tracking.
