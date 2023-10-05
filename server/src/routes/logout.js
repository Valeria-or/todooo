require('@babel/register');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');


router.get("/", (req, res) => {
    req.session.destroy(() => {
      res.clearCookie("CardsCookie");
      res.json({ name: "" });
    });
  });

module.exports = router;