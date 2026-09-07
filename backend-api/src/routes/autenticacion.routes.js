import express from 'express';
import { registrarUsuario, iniciarSesion } from '../controllers/autenticacion.controller.js';

const enrutadorAutenticacion = express.Router();
// Endpoints públicos de autenticación
enrutadorAutenticacion.post('/registro', registrarUsuario);
enrutadorAutenticacion.post('/login', iniciarSesion);
export default enrutadorAutenticacion;