require('@babel/register');
const express = require('express');
const router = express.Router();
const { User, Notebook, Todo } = require('../../db/models');
const { async } = require('regenerator-runtime');
const { log } = require('console');

router.get('/', async (req, res) => {
    try {
        const notebokId = req.params;
        const todos = await Todo.findAll({where: {notebook_id: notebokId}})
        res.json(todos)
    } catch (error) {
        console.log(error);
    }
})

router.post('/newTodo', async (req, res) => {
    console.log(req.params);
    try {
        const notebokId = req.params;
        const {text} = req.body;
        const todo = await Todo.create( {notebook_id: notebokId, text});
        res.json(msg, 'todo was created')
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