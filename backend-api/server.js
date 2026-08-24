import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'node:process';
import clientesRoutes from './src/routes/clientes.routes.js';
import mascotasRoutes from './src/routes/mascotas.routes.js';
// Importaremos las rutas en el siguiente paso
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000; // El puerto 4000 es común para APIs
// Middlewares
app.use(cors()); // Permite peticiones desde el frontend de React (puerto 5173/3000)
app.use(express.json()); // Permite a Express leer JSON en el body de las peticiones
app.use('/api/clientes', clientesRoutes);
app.use('/api/mascotas', mascotasRoutes);
// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Veterinaria "El Dogo" Funcionando!');
});
// Aquí se agregarán las rutas específicas de la API (clientes, mascotas)
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(` Servidor API escuchando en http://localhost:${PORT}`);
});