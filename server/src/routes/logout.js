require('@babel/register');
const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
    req.session.destroy(() => {
      res.clearCookie("CardsCookie");
      res.json({ name: "" });
    });
  });

module.exports = router;