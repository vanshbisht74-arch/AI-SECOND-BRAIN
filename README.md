# NEXUS: The Digital Second Brain

NEXUS is a premium, production-ready personal knowledge operating system designed for intelligence, productivity, and calm.

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18 or higher
- **npm** or **yarn**

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash  
   cd nexus/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `nexus/server/` (I have already created one for you with your API key).
4. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the client directory:
   ```bash
   cd nexus/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

---

## ✨ Key Features
- **Global Command Palette**: Press `CMD+K` (Mac) or `CTRL+K` (Windows/Linux) to search everything.
- **AI Assistant**: Intelligent chat with contextual memory powered by Gemini 2.0.
- **Notes & Knowledge**: TipTap-powered rich text editor with markdown support.
- **Coding Hub**: Monaco-powered code editor for snippets and debugging.
- **Study Hub**: 3D Flashcards and spaced repetition system.
- **Knowledge Graph**: Visual representation of your second brain.

## 🛠 Tech Stack
- **Frontend**: React 19, Vite 6, TypeScript, Tailwind CSS v4, Framer Motion.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM.
- **Intelligence**: OpenRouter API (Gemini 2.0 Flash).
