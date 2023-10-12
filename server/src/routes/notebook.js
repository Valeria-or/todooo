require('@babel/register');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Notebook } = require('../../db/models');


// router.get('/', async(req, res) => {
//     console.log("get ====>" ,req.session)
//     const login = req.session.login;
//     try {
//         // const {login} = req.session
//         // const userLogin = req.session.login
//         const user = await User.findOne({where: {login}})
//         const notebook = Notebook.findAll({where: {user_id: user.id}})
//         res.json(notebook)
//     } catch (error) {
//         console.log(error)
//     }
// })

// router.get("/", async(req, res) => {
//     console.log("new======>", req.session)
//     res.json({msg: 'yes'})
// })
router.post('/one', async(req, res) => {
    const {login} = req.body
    // console.log("login =====>", login)
    try {
        const user = await User.findOne({where: {login}})
        const notebook = await Notebook.findAll({where: {user_id: user.id}})
        // console.log("notebooks======>", notebook)
        res.json(notebook)
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    console.log(req.body);
    // console.log("post ====>" ,req.session.login)
    const {text} = req.body;
    try {
        const {login} = req.session
        // const userLogin = req.session.login
        const user = await User.findOne({where: {login}})
        const newNotebook = await Notebook.create({title: text, user_id: user.id})
        res.json({msg: "добавлен", newNotebook})
    } catch (error) {
        console.log('error', error);
    }
  })

module.exports = router;