import express from 'express';
// Importamos las funciones del controlador
import { getMascotas, createMascotas, updateMascotas, getMascotaById, deleteMascota } from '../controllers/mascotas.controller.js';
const router = express.Router();
// Mapeo directo: URL -> Controlador
router.get('/', getMascotas);
router.get('/:id', getMascotaById);
router.post('/', createMascotas);
router.put('/:id', updateMascotas);
router.delete('/:id', deleteMascota);
export default router;