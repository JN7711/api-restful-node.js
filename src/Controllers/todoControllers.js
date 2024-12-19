
                const Todo = require('../models/todoModel');
                const { body, validationResult } = require('express-validator');
                
                // Crear tarea con validación
                exports.createTodo = [
                    body('title').notEmpty().withMessage('El título es obligatorio'),
                    async (req, res) => {
                        const errors = validationResult(req);
                        if (!errors.isEmpty()) {
                            return res.status(400).json({ errors: errors.array() });
                        }
                        const todo = new Todo(req.body);
                        try {
                            const savedTodo = await todo.save();
                            res.status(201).json(savedTodo);
                        } catch (error) {
                            res.status(400).json({ message: error.message });
                        }
                    }
                ];
                
                // Leer todas las tareas con paginación
                exports.getAllTodos = async (req, res) => {
                    const { page = 1, limit = 10 } = req.query;
                    try {
                        const todos = await Todo.find()
                            .limit(limit * 1)
                            .skip((page - 1) * limit);
                        const count = await Todo.countDocuments();
                        res.json({
                            todos,
                            totalPages: Math.ceil(count / limit),
                            currentPage: page
                        });
                    } catch (error) {
                        res.status(500).json({ message: error.message });
                    }
                };
                
                // Leer tarea por ID
                exports.getTodoById = async (req, res) => {
                    try {
                        const todo = await Todo.findById(req.params.id);
                        if (!todo) return res.status(404).json({ message: 'Tarea no encontrada' });
                        res.json(todo);
                    } catch (error) {
                        res.status(500).json({ message: error.message });
                    }
                };
                
                // Actualizar tarea
                exports.updateTodo = async (req, res) => {
                    try {
                        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
                        if (!updatedTodo) return res.status(404).json({ message: 'Tarea no encontrada' });
                        res.json(updatedTodo);
                    } catch (error) {
                        res.status(400).json({ message: error.message });
                    }
                };
                
                // Eliminar tarea
                exports.deleteTodo = async (req, res) => {
                    try {
                        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
                        if (!deletedTodo) return res.status(404).json({ message: 'Tarea no encontrada' });
                        res.status(204).send();
                    } catch (error) {
                        res.status(500).json({ message: error.message });
                    }
                };


