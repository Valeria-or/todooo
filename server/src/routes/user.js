require('@babel/register');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        const login = req.session.login;
        res.json(login)
    } catch (error) {
        console.log(err)
    }
})

module.exports = router;