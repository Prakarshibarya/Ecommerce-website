import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ---- middleware (fixes req.body undefined)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- serve static frontend from /public
const publicDir = path.join(__dirname, "..", "public");
app.use(express.static(publicDir));

// ---- db
await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected");

// ---- helpers
function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// ---- API
app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing name, email or password" });
    }
    const exist = await User.findOne({ email });
    if (exist) return res.status(409).json({ error: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    const token = signToken(user);
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "Missing email or password" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken(user);
    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

// ---- fallback to index.html for any unknown route (optional)
app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running: http://localhost:${port}`));
