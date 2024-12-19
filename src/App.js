
require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes'); // Asegúrate de que este archivo exista
const errorHandler = require('./middleware/errorHandler'); // Middleware de manejo de errores

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Cambia esto por la URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json());

// Conexión a la base de datos (MongoDB)
mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/todoList', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('No se pudo conectar a la base de datos', err));

// Definir el esquema y modelo de la tarea
const todoSchema = new mongoose.Schema({
    description: { type: String, required: true },
    done: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema);

// Rutas de la API
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).send('Error al obtener las tareas');
    }
});

app.post('/todos', async (req, res) => {
    const newTodo = new Todo({
        description: req.body.description,
        done: req.body.done
    });

    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(400).send('Error al agregar la tarea');
    }
});

app.put('/todos/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).send('Error al actualizar la tarea');
    }
});

app.delete('/todos/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).send('Error al eliminar la tarea');
    }
});

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app; // Exportar la aplicación



