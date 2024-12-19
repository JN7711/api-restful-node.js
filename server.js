require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./utils/logger'); // Importa los middlewares de logging
const config = require('./config/config'); // Configuración de la base de datos
    
 const app = express();
 const PORT = process.env.PORT || 3000;
    
    // Middleware
    app.use(helmet()); // Seguridad
    app.use(cors()); // Configuración de CORS
    app.use(bodyParser.json()); // Parsear JSON
    app.use(requestLogger); // Registra las solicitudes
    app.use('/api/todos', todoRoutes); // Usar rutas
    app.use(errorLogger); // Registra los errores
    app.use(errorHandler); // Manejo de errores
    
    // Conectar a la base de datos y luego iniciar el servidor
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Servidor corriendo en https://github.com/JN7711/lista-de-tareas-uno.git : ${PORT}`);
            });
        })
        .catch(err => console.error('Error al conectar a la base de datos:', err));



        