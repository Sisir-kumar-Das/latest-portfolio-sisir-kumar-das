# Sisir Kumar Das — Portfolio

Personal portfolio of **Sisir Kumar Das**, a Full-Stack Software Engineer (MERN) with 3+ years of
production experience. Built as a React + Node/Express + MongoDB monorepo, with a standout feature:
an embedded **multi-agent, multi-tool AI concierge** that can answer visitor questions about my
experience, projects and skills in real time.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for a full breakdown of the multi-agent system design,
and [DEPLOYMENT.md](./DEPLOYMENT.md) for how to deploy it for free with an auto-updating CI/CD
pipeline (Vercel + Render + MongoDB Atlas).

## ✨ Highlights

- **Unique differentiator** — an AI Concierge chat widget powered by an orchestrator + specialist
  agent pattern (Profile Agent, Projects Agent, GitHub Agent, Contact Agent), each with its own
  tools, coordinated by a router/orchestrator agent.
- **Provider-agnostic LLM layer** — plug in OpenAI, Groq, Gemini or Anthropic via env vars; falls
  back to a deterministic offline mock provider so the whole app runs with **zero API keys**.
- **Real content, no placeholders** — resume data (experience, skills, projects) lives in one
  typed source of truth (`server/src/data/profile.data.ts`) consumed by both the REST API and the
  agent tools, so the UI and the AI concierge never drift out of sync.
- **Modern MERN stack** — React 18 + TypeScript + Vite + Tailwind CSS on the client; Express +
  TypeScript + Mongoose on the server; MongoDB for contact leads and chat transcripts.

## 🗂️ Project structure

```
sisir-kumar-das-portfolio/
├── client/                 # React + Vite + TypeScript + Tailwind frontend
├── server/                 # Express + TypeScript backend
│   └── src/
│       ├── agents/         # Orchestrator + specialist agents
│       ├── tools/          # Tools the agents call (profile, projects, GitHub, contact)
│       ├── providers/      # Pluggable LLM providers (OpenAI/Groq/Gemini/Anthropic/Mock)
│       ├── models/         # Mongoose models (ContactMessage, ChatLog)
│       ├── routes/         # REST routes
│       └── data/           # Single source of truth for portfolio content
├── package.json            # npm workspaces root (client + server)
└── ARCHITECTURE.md         # Deep dive into the multi-agent design
```

## 🚀 Getting started

### Prerequisites

- Node.js 18.18+ and npm 10+
- (Optional) A MongoDB connection string — local via Docker/Community Server, or a free
  [MongoDB Atlas](https://www.mongodb.com/atlas) cluster. The app runs without Mongo, but the
  contact form and chat-history logging need it.
- (Optional) An API key for OpenAI, Groq, Gemini, or Anthropic. Without one, the AI concierge
  automatically uses the built-in **mock provider** so you can demo it instantly.

### Install

```bash
npm install
```

This installs dependencies for both workspaces (`client` and `server`) in one shot.

### Configure environment variables

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Fill in `server/.env` with your MongoDB URI and (optionally) an LLM API key — see the comments in
`server/.env.example` for every supported variable.

### Run in development

```bash
npm run dev
```

This starts the Express API (default `http://localhost:5000`) and the Vite dev server (default
`http://localhost:5173`) together, with the client proxying `/api` requests to the server.

### Build for production

```bash
npm run build
npm start
```

## 🧭 Roadmap

This first pass covers project setup, the design system, and the core agent/tool skeleton. Next
steps (tracked for our following session): fully-designed page sections and content polish,
real LLM provider wiring, GitHub live-stats integration, deployment (e.g. Vercel + Render/Railway +
MongoDB Atlas), and automated tests.

## 📄 License

MIT — see [LICENSE](./LICENSE).
