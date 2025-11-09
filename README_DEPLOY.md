# DeployedProject (Node.js + MongoDB, Static HTML)

This build inlines your HTML includes and serves from `public-dist` so you can deploy without a template engine.

## Run locally
1. Ensure `.env` has valid values:
   - `MONGO_URI` (your Atlas SRV including `site_db` at the end)
   - `JWT_SECRET` (long random string)
   - `PORT=3000` (optional)
2. Install deps: `npm install`
3. Start: `npm run dev`
4. Visit: `http://localhost:3000/`

## Folders
- `public-dist/` — final HTML (includes inlined), used by the server
- `public/` — your original sources (partials remain here)
- `server/` — Express app + API routes (auth, todos, contacts)
