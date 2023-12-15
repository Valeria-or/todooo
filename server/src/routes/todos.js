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
        const {newTodo, id} = req.body;
        const createNewTodo = await Todo.create( {notebook_id: id.id, text: newTodo});
        res.json(createNewTodo)
    } catch (error) {
        console.log(error);
    }
})
router.delete('/deleteTodo', async (req, res) => {
    try {
        console.log(req.body)
        const {id} = req.body;
        const createNewTodo = await Todo.destroy({where: {id}})
        res.json(createNewTodo)
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