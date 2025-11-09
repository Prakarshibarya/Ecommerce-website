import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(422).json({ ok:false, error:'Missing fields' });
  await Contact.create({ name, email, message });
  res.json({ ok:true, message:'Contact saved' });
});

export default router;
