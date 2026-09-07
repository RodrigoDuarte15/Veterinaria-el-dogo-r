import express from 'express';
// Importamos las funciones del controlador
import { getClientes, createCliente, updateCliente } from '../controllers/cliente.controller.js';
import { verificarTokenAcceso } from '../middlewares/autenticar.middleware.js';
const router = express.Router();
// Mapeo directo: URL -> Controlador
router.get('/', getClientes);

router.post('/',verificarTokenAcceso, createCliente);
router.put('/:id' ,verificarTokenAcceso, updateCliente);
export default router;