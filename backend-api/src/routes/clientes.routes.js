import express from 'express';
// Importamos las funciones del controlador
import { getClientes, createCliente, updateCliente, getClienteById, deleteCliente } from '../controllers/cliente.controller.js';
const router = express.Router();
// Mapeo directo: URL -> Controlador
router.get('/', getClientes);
router.get('/:id', getClienteById);
router.post('/', createCliente);
router.put('/:id', updateCliente);
// router.delete('/:id', deleteCliente); // Asumiendo que existe
router.delete('/:id', deleteCliente);
export default router;