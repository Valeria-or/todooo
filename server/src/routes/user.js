require('@babel/register');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // console.log("userGet ===>" , req.session)
    try {
        const login = req.session.login;
        res.json(login)
    } catch (error) {
        console.log(err)
    }
})

module.exports = router;