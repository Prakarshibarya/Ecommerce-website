// server/models/Store.js
const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },
    imageUrl: { type: String },        // /uploads/filename.ext
    trending: { type: Boolean, default: false },
    categories: { type: [String], default: [] },
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

module.exports = mongoose.model('Store', StoreSchema);
