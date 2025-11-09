const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

const StoreSchema = new mongoose.Schema(
  {
    name: String,
    link: String,
    about: String,
    cashbackRates: String,
    usefulTips: String,
    offers: String,
    why: String,
    policies: String,
    faqs: String,
    trending: { type: Boolean, default: false },
    categories: { type: [String], default: [] },
    imageUrl: String
  },
  { timestamps: true }
);
const Store = mongoose.models.Store || mongoose.model('Store', StoreSchema);

/* GET /api/stores → public read */
router.get('/', async (_req, res) => {
  try {
    const items = await Store.find().sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load stores' });
  }
});

/* POST /api/stores → protected create */
router.post(
  '/',
  requireAuth,
  upload.single('image'),
  async (req, res) => {
    try {
      let { name, link, about, cashbackRates, usefulTips, offers, why, policies, faqs, trending, categories } = req.body;

      let cats = [];
      if (typeof categories === 'string') {
        try {
          const parsed = JSON.parse(categories);
          cats = Array.isArray(parsed) ? parsed : [];
        } catch {
          cats = categories ? [categories] : [];
        }
      } else if (Array.isArray(categories)) {
        cats = categories;
      }

      const doc = await Store.create({
        name: name || '',
        link: link || '',
        about: about || '',
        cashbackRates: cashbackRates || '',
        usefulTips: usefulTips || '',
        offers: offers || '',
        why: why || '',
        policies: policies || '',
        faqs: faqs || '',
        trending: String(trending).toLowerCase() === 'true',
        categories: cats,
        imageUrl: ''
      });

      res.status(201).json(doc);
    } catch (e) {
      res.status(400).json({ error: 'Failed to create store' });
    }
  }
);

module.exports = router;
