const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ ok: false, error: 'Missing token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = { id: payload.uid, email: payload.email };
    next();
  } catch (e) {
    res.status(401).json({ ok: false, error: 'Invalid token' });
  }
}

module.exports = { requireAuth };
