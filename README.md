# Upgraded Project (Node.js + MongoDB)

This package upgrades your existing static site (HTML/CSS) to include **JavaScript**, **Node.js**, and **MongoDB**.

## What's included
- `public/` — your original site plus:
  - `login.html` — sign up & login
  - `dashboard.html` — authenticated page with a Todo CRUD + Contact form (AJAX)
  - `js/app.js` — frontend JS that talks to Node.js APIs
- `server/` — Express API with Mongoose models
  - `routes/auth.js`, `routes/todos.js`, `routes/contacts.js`
  - `models/User.js`, `models/Todo.js`, `models/Contact.js`
  - `middleware/auth.js` — JWT auth
  - `index.js` — server bootstrap
- `.env.example` — sample environment variables
- `package.json` — dependencies and scripts

## Quick Start
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Set environment**
   - Copy `.env.example` to `.env`
   - Set `MONGO_URI` (e.g., `mongodb://127.0.0.1:27017/site_db`)
   - Set a strong `JWT_SECRET`
3. **Run MongoDB**
   - Local MongoDB or MongoDB Atlas
4. **Start the server**
   ```bash
   npm run dev
   ```
5. Open: `http://localhost:3000/login.html`
   - Sign up, then log in
   - You'll be redirected to `dashboard.html` to manage Todos and submit the Contact form

## Notes
- All API routes are under `/api/*` and served on the same origin as the static files.
- CORS is enabled for convenience; restrict as needed.
- JWT expiry is set to 7 days by default.
