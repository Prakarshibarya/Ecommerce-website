const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

/* storage (memory is fine; you can later persist to S3/disk) */
const upload = multer({ storage: multer.memoryStorage() });

/* model (safe if already compiled) */
const CampaignSchema = new mongoose.Schema(
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
    imageUrl: String
  },
  { timestamps: true }
);
const Campaign =
  mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema);

/* GET /api/campaigns → public read (admin page uses this) */
router.get('/', async (_req, res) => {
  try {
    const items = await Campaign.find().sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load campaigns' });
  }
});

/* POST /api/campaigns → protected create */
router.post(
  '/',
  requireAuth,
  upload.single('image'),
  async (req, res) => {
    try {
      const {
        name,
        link,
        about,
        cashbackRates,
        usefulTips,
        offers,
        why,
        policies,
        faqs
      } = req.body;

      const doc = await Campaign.create({
        name: name || '',
        link: link || '',
        about: about || '',
        cashbackRates: cashbackRates || '',
        usefulTips: usefulTips || '',
        offers: offers || '',
        why: why || '',
        policies: policies || '',
        faqs: faqs || '',
        imageUrl: '' // plug real URL if you later store the file
      });

      res.status(201).json(doc);
    } catch (e) {
      res.status(400).json({ error: 'Failed to create campaign' });
    }
  }
);

module.exports = router;
