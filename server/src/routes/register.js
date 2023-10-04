require('@babel/register');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');



router.post('/', async (req, res) => {
    console.log(req.body);
    const {login, password} = req.body;
    try {
        console.log('try');
        const oldUserLogin = await User.findOne({where: {login}})
        if (oldUserLogin) {
            res.json({ err: 'Такой пользователь уже существует' });
        } else {
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({login, password: hash})
        req.session.login = user.login;
        req.session.save(() => {
            res.json({ msg: 'Пользователь зарегистрирован', login: user.login });
          });
        }
    } catch (error) {
        console.log('error', error);
    }
  })

module.exports = router;
