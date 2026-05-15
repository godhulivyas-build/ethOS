# 🧠 ETHOS: The Identity Operating System

ETHOS is an AI-native operating system designed to convert disparate information streams into authentic thought leadership. By securely connecting to a user's data sources (Gmail, Twitter, RSS, PDFs), ETHOS autonomously extracts high-leverage insights, stores them in an intelligent vector memory graph, and orchestrates multi-agent AI pipelines to generate hyper-personalized content tailored to the user's "Voice DNA."

## 🚀 Features

- **Automated Data Ingestion:** Background workers pull data from connected third-party platforms (e.g., Gmail newsletters) securely using OAuth 2.0.
- **Knowledge Refinery Pipeline:** Extracts mental models, startup ideas, and recurring trends from raw HTML/text using LangChain and GPT-4o.
- **Vector Memory (RAG):** Persists insights into a Pinecone semantic vector database, allowing the AI to "remember" user contexts over time.
- **Voice DNA Generation:** Content Generation Agents utilize Retrieval-Augmented Generation (RAG) to draft authentic platform-specific content that perfectly matches the user's formality, tone, and directives.
- **Dynamic Dashboard:** A Next.js 14 frontend built with TailwindCSS and Framer Motion for a premium, dynamic user experience.

## 🛠️ Architecture Stack

### Frontend (Client)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS, Framer Motion
- **UI Components:** Glassmorphism, tailored animations, dynamic API polling

### Backend (Server)
- **Framework:** FastAPI (Python 3.13+)
- **Database:** PostgreSQL (SQLAlchemy ORM) / SQLite fallback
- **Authentication:** Custom Google OAuth 2.0 Flow
- **AI Orchestration:** LangChain (langchain-openai, langchain-core)
- **Vector Database:** Pinecone (Semantic Search)
- **Background Tasks:** FastAPI BackgroundTasks (Ready for Inngest/BullMQ scaling)

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ethos.git
   cd ethos
   ```

2. **Start the Frontend:**
   ```bash
   npm install
   npm run dev
   ```
   *Runs on `http://localhost:3000`*

3. **Start the Backend:**
   Open a second terminal inside the `/backend` directory.
   ```bash
   cd backend
   pip install -r requirements.txt
   python -m uvicorn app.main:app --reload --port 8000
   ```
   *Runs on `http://localhost:8000`*

## 🔑 Environment Setup

Ensure you configure the `.env` files for both the frontend and backend.
* **Backend:** Requires `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `OPENAI_API_KEY`, and `PINECONE_API_KEY`.

---
*Built as the ultimate engine for autonomous personal brand building.*
