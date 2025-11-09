require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const campaignsRouter = require('./routes/campaigns');
const storesRouter = require('./routes/stores');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
app.use(express.static(PUBLIC_DIR));
app.get('/', (_req, res) => res.sendFile(path.join(PUBLIC_DIR, 'index.html')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/wallet', require('./routes/wallet'));
app.use('/api/campaigns', campaignsRouter);
app.use('/api/stores', storesRouter);

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));
app.use('/uploads', express.static(path.join(PUBLIC_DIR, 'uploads')));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI (or MONGODB_URI) missing in .env');
  process.exit(1);
}

mongoose.connect(MONGO_URI, { dbName: 'baenephit' })
  .then(() => {
    console.log(' MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error(' MongoDB connection error:', err.message);
    process.exit(1);
  });
