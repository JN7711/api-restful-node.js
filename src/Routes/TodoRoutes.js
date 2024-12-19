const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const auth = require('../middlewares/auth');
const { validateTodo } = require('../middlewares/validate'); // Importa el middleware de validación

// Rutas CRUD
router.get('/', todoController.getTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', auth, validateTodo, todoController.createTodo); // Aplica la validación y autenticación antes de crear un nuevo todo
router.put('/:id', auth, validateTodo, todoController.updateTodo); // Aplica la validación y autenticación antes de actualizar un todo
router.delete('/:id', auth, todoController.deleteTodo); // Aplica autenticación antes de eliminar un todo

module.exports = router;



