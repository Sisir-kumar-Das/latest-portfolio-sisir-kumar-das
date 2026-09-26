# Deployment Guide

This project deploys as three free-tier pieces that all auto-update whenever you push to
`main` — no manual redeploy step, ever:

| Piece | Where | Free tier | Auto-deploys on push to `main`? |
|---|---|---|---|
| Frontend (`client/`) | [Vercel](https://vercel.com) | Yes, generous | ✅ via Vercel's GitHub App |
| Backend (`server/`) | [Render](https://render.com) | Yes (sleeps after 15 min idle) | ✅ via Render's GitHub integration |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) | Yes, M0 512MB cluster, forever free | N/A (database, not code) |

Repo-side deploy config is already committed: [render.yaml](../render.yaml) (backend blueprint)
and [client/vercel.json](../client/vercel.json) (SPA rewrites). [.github/workflows/ci.yml](../.github/workflows/ci.yml)
runs a build+lint check on every push/PR to `main` as the CI half of the pipeline; Vercel/Render's
native git integration is the CD half — together that's your full CI/CD pipeline, with zero
custom deploy scripts or secrets to manage.

> This repo's default branch is `main` (not `master`) — that's the branch to connect everything
> to below.

## 1. Create a free MongoDB Atlas cluster (~5 min)

1. Sign up at https://www.mongodb.com/cloud/atlas/register (free, no card required).
2. Create a free **M0** cluster (any provider/region close to you).
3. **Database Access** → add a database user (username + password — save these).
4. **Network Access** → add IP address `0.0.0.0/0` (allow access from anywhere — required
   since Render's IPs aren't static on the free tier).
5. **Database** → **Connect** → **Drivers** → copy the connection string, e.g.
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority`
   (fill in your real username/password, and add a database name like `portfolio` before the `?`).

Keep this connection string — it's your `MONGODB_URI`.

## 2. Deploy the backend to Render (~5 min)

1. Sign up / log in at https://render.com with your GitHub account.
2. **New +** → **Blueprint** → select this repo → Render detects [render.yaml](../render.yaml)
   automatically and proposes the `sisir-portfolio-api` web service. Click **Apply**.
   - If you'd rather configure manually instead of using the blueprint: **New +** → **Web
     Service** → select the repo → set **Root Directory** to `server`, **Build Command** to
     `npm install && npm run build`, **Start Command** to `npm start`, **Plan** to `Free`.
3. When prompted for environment variables (or afterwards under the service's **Environment**
   tab), set:
   - `MONGODB_URI` = the Atlas connection string from step 1
   - `LLM_PROVIDER` = `gemini`
   - `GEMINI_API_KEY` = your Gemini key
   - `CLIENT_ORIGIN` = leave as `http://localhost:5173` for now — you'll update this in step 4
     once you have the Vercel URL
4. Deploy. Once live, note the URL Render gives you, e.g. `https://sisir-portfolio-api.onrender.com`.
5. Confirm it's healthy: open `https://<your-render-url>/api/health` in a browser — you should
   see `{"status":"ok","db":true}`.

**Free tier note:** Render's free web services spin down after 15 minutes of inactivity and take
~30-50 seconds to wake up on the next request. This is fine for a portfolio demo; if it matters,
Render's cheapest paid tier removes the sleep behavior.

## 3. Deploy the frontend to Vercel (~5 min)

1. Sign up / log in at https://vercel.com with your GitHub account.
2. **Add New** → **Project** → import this repo.
3. Vercel needs to build only the `client` folder:
   - **Root Directory**: click **Edit** and select `client`.
   - Framework preset: Vite (auto-detected).
   - Build/output settings are picked up from [client/vercel.json](../client/vercel.json)
     automatically once the root directory is set to `client`.
4. Add an environment variable:
   - `VITE_API_BASE_URL` = `https://<your-render-url>/api` (from step 2.4)
5. Deploy. Note the URL Vercel gives you, e.g. `https://sisir-kumar-das-portfolio.vercel.app`.

## 4. Connect the two: update `CLIENT_ORIGIN` on Render

1. Back in Render → your service → **Environment** → set:
   - `CLIENT_ORIGIN` = `https://<your-vercel-url>` (from step 3.5) — you can add
     `http://localhost:5173` too, comma-separated, to keep local dev working against the deployed
     API if you ever want that: `http://localhost:5173,https://<your-vercel-url>`
2. Save — Render redeploys automatically with the new env var.

## 5. Verify the whole pipeline

1. Visit your Vercel URL — the site should load with live data (not fallback placeholders).
2. Open the AI Concierge widget and send a message — you should get a real Gemini-generated
   reply.
3. Make any small commit and push to `main` (e.g. edit a heading) — within a couple of minutes
   both Vercel and Render will show a new deployment in progress in their dashboards, and the
   live site updates automatically. That's your CI/CD loop working end to end.

## Where do I put secrets?

Nowhere in the repo — every secret above (`MONGODB_URI`, `GEMINI_API_KEY`, etc.) is entered
directly into the Render/Vercel dashboard's environment variable settings, never committed to
git. `server/.env` and `client/.env` remain local-only (already gitignored).
