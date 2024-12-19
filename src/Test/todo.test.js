const request = require('supertest');
const app = require('../app'); // Asegúrate de exportar tu app en app.js
const Todo = require('../models/todoModel');

describe('Todo API', () => {
    beforeAll(async () => {
        // Conectar a la base de datos antes de las pruebas
        await Todo.deleteMany(); // Limpiar la colección antes de las pruebas
    });

    afterAll(async () => {
        // Cerrar la conexión a la base de datos después de las pruebas
        await Todo.deleteMany(); // Limpiar la colección después de las pruebas
    });

    it('debería crear una nueva tarea', async () => {
        const response = await request(app)
            .post('/todos')
            .send({ title: 'Tarea de prueba' });
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.title).toBe('Tarea de prueba');
    });

    it('debería obtener todas las tareas', async () => {
        const response = await request(app).get('/todos');
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('debería obtener una tarea por ID', async () => {
        const todo = await Todo.create({ title: 'Tarea de prueba' });
        const response = await request(app).get(`/todos/${todo._id}`);
        
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Tarea de prueba');
    });

    it('debería actualizar una tarea', async () => {
        const todo = await Todo.create({ title: 'Tarea de prueba' });
        const response = await request(app)
            .put(`/todos/${todo._id}`)
            .send({ title: 'Tarea actualizada' });
        
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Tarea actualizada');
    });

    it('debería eliminar una tarea', async () => {
        const todo = await Todo.create({ title: 'Tarea de prueba' });
        const response = await request(app).delete(`/todos/${todo._id}`);
        
        expect(response.status).toBe(204); // No Content
    });
});


