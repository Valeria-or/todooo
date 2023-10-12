require('@babel/register');
const express = require('express');
const router = express.Router();
const { User, Notebook } = require('../../db/models');

router.post('/one', async(req, res) => {
    const {login} = req.body
    try {
        const user = await User.findOne({where: {login}})
        const notebook = await Notebook.findAll({where: {user_id: user.id}})
        res.json(notebook)
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    console.log(req.body);
    const {text} = req.body;
    try {
        const {login} = req.session
        const user = await User.findOne({where: {login}})
        const newNotebook = await Notebook.create({title: text, user_id: user.id})
        res.json({msg: "добавлен", newNotebook})
    } catch (error) {
        console.log('error', error);
    }
  })

module.exports = router;