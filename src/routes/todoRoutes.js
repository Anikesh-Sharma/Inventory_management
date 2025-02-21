const express = require('express');
const router = express.Router();
const { CreateTodo, UpdateTodo, DeleteTodo, GetTodos } = require('../controllers/todoControler');

router.post('/create', CreateTodo);
router.patch('/update/:id', UpdateTodo);
router.delete('/delete/:id', DeleteTodo);
router.get('/', GetTodos);

module.exports = router;
