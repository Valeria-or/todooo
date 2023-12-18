require('@babel/register');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');



router.post('/', async (req, res) => {
    const {login, password} = req.body;
    try {
        const oldUserLogin = await User.findOne({where: {login}})
        if (oldUserLogin) {
            const checkPass = await bcrypt.compare(password, oldUserLogin.password)
            const photo =  oldUserLogin.photo
            if(checkPass){
                req.session.login = oldUserLogin.login;
                req.session.auth = true;
                req.session.id = oldUserLogin.id;
                req.session.save(() => {
                    res.json({ msg: 'Пользователь вошел', login, photo, auth: true });
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