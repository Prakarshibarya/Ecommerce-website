// server/routes/user.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

function auth(req, res, next) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// GET /api/user/me
router.get('/me', auth, async (req, res) => {
  const u = await User.findById(req.user.sub).select('_id name email createdAt');
  if (!u) return res.status(404).json({ message: 'User not found' });
  res.json({ id: u._id, name: u.name, email: u.email, createdAt: u.createdAt });
});

module.exports = router;
