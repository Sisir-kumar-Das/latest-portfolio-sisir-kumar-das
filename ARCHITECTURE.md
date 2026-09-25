# Architecture — AI Concierge Multi-Agent System

The standout feature of this portfolio is an embedded AI assistant that visitors can chat with to
learn about Sisir's experience, skills, and projects. Instead of a single monolithic prompt, it is
built as a small **multi-agent, multi-tool system**, mirroring the kind of agentic architecture
used in production AI features.

## Why multi-agent?

A single large prompt that tries to do everything (answer bios, list projects, pull live GitHub
stats, take contact leads) tends to become unreliable and hard to extend. Splitting
responsibilities into small, focused agents — each with a narrow job and its own tools — keeps
behaviour predictable, testable, and easy to extend with new agents later (e.g. a "Blog Agent").

## High-level flow

```
Visitor message
      │
      ▼
┌─────────────────┐
│ Orchestrator      │  1. Classifies intent (rule-based first pass, LLM-based fallback)
│ Agent              │  2. Delegates to the right specialist agent
└─────────┬─────────┘  3. Merges the specialist's answer into a final reply
          │
          ├──▶ Profile Agent   ──uses──▶ tools/getProfile.tool.ts
          ├──▶ Projects Agent  ──uses──▶ tools/getProjects.tool.ts, tools/getGithubStats.tool.ts
          ├──▶ Contact Agent   ──uses──▶ tools/createContactLead.tool.ts (writes to MongoDB)
          └──▶ General Agent   ──fallback for small talk / anything else
          │
          ▼
   LLM Provider layer (providers/) — OpenAI | Groq | Gemini | Anthropic | Mock
          │
          ▼
   Response returned to client + persisted to ChatLog (MongoDB)
```

## Agents (`server/src/agents/`)

| Agent | Responsibility | Tools it can call |
|---|---|---|
| `orchestrator.ts` | Classifies the visitor's intent and routes to a specialist agent; assembles the final response. | — (calls the other agents) |
| `profileAgent.ts` | Answers questions about bio, skills, experience, and education. | `getProfileTool` |
| `projectsAgent.ts` | Answers questions about projects, tech stacks, and live GitHub activity. | `getProjectsTool`, `getGithubStatsTool` |
| `contactAgent.ts` | Detects intent to get in touch and captures a lead. | `createContactLeadTool` |
| `generalAgent.ts` | Fallback for greetings/small talk and anything the other agents can't handle. | — |

Every agent implements the same shape (see `agents/types.ts`):

```ts
interface Agent {
  name: string;
  canHandle(intent: Intent): boolean;
  handle(input: AgentInput): Promise<AgentResult>;
}
```

This makes the system a plain **strategy pattern** with an orchestrator picking a strategy — no
heavyweight framework is required, but the shape is intentionally compatible with LangChain-style
"tools + agent executor" concepts (LangChain is on the resume's skill list, so the code favours
those same conventions).

## Tools (`server/src/tools/`)

Tools are plain, typed functions with a `name`, `description`, and `run()` — the same contract an
LLM function-calling API expects, so wiring in real tool-calling for OpenAI/Gemini/Groq later is a
drop-in change rather than a rewrite.

- `getProfile.tool.ts` — reads `data/profile.data.ts`.
- `getProjects.tool.ts` — reads the `projects` array from the same source of truth.
- `getGithubStats.tool.ts` — calls the public GitHub REST API for live repo/follower stats.
- `createContactLead.tool.ts` — validates and persists a lead via the `ContactMessage` Mongoose
  model.

## Providers (`server/src/providers/`)

A single `LlmProvider` interface (`generate(prompt, context)`) with implementations for OpenAI,
Groq, Gemini, and Anthropic, selected at runtime via `LLM_PROVIDER` in `server/.env`. If no key is
configured, `mockProvider.ts` (a small deterministic, keyword-based responder built on the same
profile data) is used automatically — so the assistant is fully functional out of the box for
local development and demos, with zero external cost or setup.

## Data flow / persistence

- `ContactMessage` (MongoDB) — leads captured by the Contact Agent or the contact form.
- `ChatLog` (MongoDB) — every chat turn, which agent handled it, and which tools were invoked —
  useful both as a debugging trail and as a talking point in interviews about observability.

## Extending the system

Adding a new capability (e.g. "Blog Agent" or "Resume PDF download tool") means:

1. Add a tool in `tools/` with a `name`, `description`, and `run()`.
2. Add an agent in `agents/` that owns that tool and implements `canHandle` / `handle`.
3. Register the agent in `orchestrator.ts`.

No existing agent or tool needs to change.
