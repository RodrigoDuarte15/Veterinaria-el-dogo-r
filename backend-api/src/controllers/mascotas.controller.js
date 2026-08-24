import pool from '../db.js';

// Obtener todas las mascotas
export const getMascotas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, nombre, especie, raza, cliente_id FROM mascotas ORDER BY nombre ASC');
        // Mapear cliente_id -> clienteId para mantener la forma esperada por el frontend
        const mapped = rows.map(r => ({
            id: r.id,
            nombre: r.nombre,
            especie: r.especie,
            raza: r.raza,
            clienteId: r.cliente_id
        }));
        res.json(mapped);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor (GET mascotas).' });
    }
};

// Crear una mascota
export const createMascotas = async (req, res) => {
    const { nombre, especie, raza, clienteId } = req.body;
    if (!nombre || !especie || !raza || !clienteId) {
        return res.status(400).json({ message: 'Faltan datos requeridos.' });
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO mascotas (nombre, especie, raza, cliente_id) VALUES (?, ?, ?, ?)',
            [nombre, especie, raza, clienteId]
        );
        res.status(201).json({ id: result.insertId, nombre, especie, raza, clienteId });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor (POST mascotas).' });
    }
};

// Actualizar una mascota
export const updateMascotas = async (req, res) => {
    const { id } = req.params;
    const { nombre, especie, raza, clienteId } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE mascotas SET nombre = ?, especie = ?, raza = ?, cliente_id = ? WHERE id = ?',
            [nombre, especie, raza, clienteId, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Mascota no encontrada.' });
        }
        res.json({ id: Number(id), nombre, especie, raza, clienteId, message: 'Mascota actualizada.' });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor (PUT mascotas).' });
    }
};

// Obtener mascota por ID
export const getMascotaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT id, nombre, especie, raza, cliente_id FROM mascotas WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Mascota no encontrada.' });
        }
        const r = rows[0];
        res.json({ id: r.id, nombre: r.nombre, especie: r.especie, raza: r.raza, clienteId: r.cliente_id });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor (GET mascota por ID).' });
    }
};

// Eliminar mascota
export const deleteMascota = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM mascotas WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Mascota no encontrada.' });
        }
        res.json({ id: Number(id), message: 'Mascota eliminada.' });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor (DELETE mascota).' });
    }
};

export default null;
