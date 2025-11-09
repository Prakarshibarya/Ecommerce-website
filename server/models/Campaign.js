// server/models/Campaign.js
const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },
    imageUrl: { type: String },         // /uploads/filename.ext
    about: { type: String },
    cashbackRates: { type: String },
    usefulTips: { type: String },
    offers: { type: String },
    why: { type: String },
    policies: { type: String },
    faqs: { type: String },
    createdBy: {
      email: { type: String },
      name: { type: String }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Campaign', CampaignSchema);
