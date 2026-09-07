import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ConexionBaseDatos from '../db.js';

export const registrarUsuario = async (peticion, respuesta) => {
    const { correoElectronico, contrasena, rol } = peticion.body;

    if (!correoElectronico || !contrasena || !rol) {
        return respuesta.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
        const [usuarioExistente] = await ConexionBaseDatos.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [correoElectronico]
        );

        if (usuarioExistente.length > 0) {
            return respuesta.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
        }

        const numeroSaltos = 10;
        const cotrasenaEncriptada = await bcrypt.hash(contrasena, numeroSaltos);

        const [resultadoInsercion] = await ConexionBaseDatos.query(
            'INSERT INTO usuarios (email, password, rol) VALUES (?, ?, ?)',
            [correoElectronico, cotrasenaEncriptada, rol || 'cliente0']
        );

        respuesta.status(201).json({ 
            mensaje: 'Usuario registrado con éxito',
            idUsuario: resultadoInsercion.insertId
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        respuesta.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

//2. inicio de sesión
export const iniciarSesion = async (peticion, respuesta) => {
    const { correoElectronico, contrasena } = peticion.body;

    if (!correoElectronico || !contrasena) {
        return respuesta.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
        const [usuariosEncontrados] = await ConexionBaseDatos.query(
            'SELECT * FROM usuarios WHERE email = ?',
            [correoElectronico]
        );

        if (usuariosEncontrados.length === 0) {
            return respuesta.status(401).json({ mensaje: 'Credenciales inválidas (usuario no existe)' });
        }

        const usuarioValido = usuariosEncontrados[0];

        // Comparar la contraseña ingresada con el Hash almacenado
        const esContrasenaCorrecta = await bcrypt.compare(contrasena, usuarioValido.password);

        if (!esContrasenaCorrecta) {
            return respuesta.status(401).json({ mensaje: 'Credenciales inválidas (contraseña incorrecta)' });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: usuarioValido.id, rol: usuarioValido.rol },
            process.env.CLAVE_SECRETA_JWT,
            { expiresIn: '2h' } // El token expira en 2 horas
        );

        respuesta.json({
            mensaje: 'Inicio de sesión exitoso',
            tokenAcceso: token,
            usuario: {
                id: usuarioValido.id,
                email: usuarioValido.email,
                rol: usuarioValido.rol
            }
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        respuesta.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};
