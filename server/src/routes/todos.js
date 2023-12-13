require('@babel/register');
const express = require('express');
const router = express.Router();
const { User, Notebook, Todo } = require('../../db/models');
const { async } = require('regenerator-runtime');
const { log } = require('console');

router.post('/', async (req, res) => {
    try {
        const {id}= req.body;
        const todos = await Todo.findAll({where: {notebook_id: id}})
        res.json(todos)
    } catch (error) {
        console.log(error);
    }
})

router.post('/newTodo', async (req, res) => {
    try {
        console.log(req.body)
        const {todo, id} = req.body;
        const NewTodo = await Todo.create( {notebook_id: id.id, text: todo});
        res.json({msg: 'todo was created'})
    } catch (error) {
        console.log(error);
    }
})

router.delete('/deleteNote', async (req, res) => {
    try {
        const {id} = req.body;
        const note = await Notebook.destroy({where: {id}})
        res.json({msg: 'удален'})
    } catch (error) {
        console.log('error', error);
    }
  })

module.exports = router