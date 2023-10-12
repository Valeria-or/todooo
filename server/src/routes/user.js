require('@babel/register');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const auth = req.session.auth;
        res.json(auth)
    } catch (error) {
        console.log(err)
    }
})

module.exports = router;