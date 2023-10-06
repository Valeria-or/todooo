require('@babel/register');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');



router.post('/', async (req, res) => {
    console.log("login ====> ", req.body);
    const {login, password} = req.body;
    try {
        console.log('try');
        const oldUserLogin = await User.findOne({where: {login}})
        if (oldUserLogin) {
            const checkPass = await bcrypt.compare(password, oldUserLogin.password)
            // const hash = await bcrypt.hash(password, 10);
            if(checkPass){
                req.session.login = oldUserLogin.login;
                req.session.save(() => {
                    res.json({ msg: 'Пользователь вошел', login });
                  });
            } else {
                res.json({ err: "неверный пароль"})
            }
            
        } else {
            res.json({ err: "Такого пользователя не существует"})
        }
    } catch (error) {
        console.log('error', error);
    }
  })

module.exports = router;