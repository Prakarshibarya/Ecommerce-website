// server/routes/wallet.js
const router = require('express').Router();

router.get('/', (_req, res) => {
  res.json({
    redeemable: 25,
    threshold: 200,
    approved: { cashback: 0, referral: 0, bonus: 25, voucher: 0 },
    pending:  { cashback: 0, referral: 0, bonus: 0,  voucher: 0 }
  });
});

module.exports = router;
