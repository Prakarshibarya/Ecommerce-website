const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://gangarpit:<password>@cluster0.najuf4k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const campaignSchema = new mongoose.Schema({
  name: String,
  link: String,
  about: String,
  offers: String,
  why: String,
  policies: String,
  faqs: String,
});

const storeSchema = new mongoose.Schema({
  name: String,
  link: String,
  about: String,
  offers: String,
  why: String,
  policies: String,
  faqs: String,
});

const Campaign = mongoose.model('Campaign', campaignSchema);
const Store = mongoose.model('Store', storeSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.post('/api/campaigns', (req, res) => {
  const newCampaign = new Campaign(req.body);
  newCampaign.save((err, campaign) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(campaign);
  });
});

app.get('/api/campaigns', (req, res) => {
  Campaign.find({}, (err, campaigns) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(campaigns);
  });
});

// CRUD for Stores
app.post('/api/stores', (req, res) => {
  const newStore = new Store(req.body);
  newStore.save((err, store) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(store);
  });
});

app.get('/api/stores', (req, res) => {
  Store.find({}, (err, stores) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(stores);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
