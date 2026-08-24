// src/context/VeterinariaProvider.jsx (Migración a API)
import React, { useState, useEffect } from 'react';
import { VeterinariaContext } from './VeterinariaContext';
import api from '../api/axios'; // Importamos la instancia de Axios
export const VeterinariaProvider = ({ children }) => {
// El estado inicial es un array vacío, ya que los datos vienen de la API.
const [clientes, setClientes] = useState([]);
const [mascotas, setMascotas] = useState([]);
const [isLoading, setIsLoading] = useState(true); // Nuevo estado para manejo de carga
// ----------------------------------------------------
// 1. LÓGICA DE CARGA INICIAL (GET - READ)
// ----------------------------------------------------
useEffect(() => {
const fetchData = async () => {
try {
// Peticiones simultáneas: Clientes y Mascotas
const [clientesRes, mascotasRes] = await Promise.all([
api.get('/clientes'),
api.get('/mascotas')

]);
setClientes(clientesRes.data);
setMascotas(mascotasRes.data);
} catch (error) {
console.error("Error al cargar datos de la API:", error);
// Aquí podrías mostrar un error al usuario
} finally {
setIsLoading(false);
}
};
fetchData();
}, []); // El array vacío asegura que se ejecute solo al montar el componente
// ----------------------------------------------------
// 2. FUNCIONES DE CLIENTES (CREATE, UPDATE, DELETE)
// ----------------------------------------------------
const agregarCliente = async (nuevoCliente) => {
try {
// POST: envía el nuevo cliente al backend
const response = await api.post('/clientes', nuevoCliente);
// El backend devuelve el objeto creado con el ID
setClientes([...clientes, response.data]);
} catch (error) {
console.error("Error al agregar cliente:", error);
}
};
const actualizarCliente = async (clienteActualizado) => {
try {
// PUT: envía los datos para actualizar
await api.put(`/clientes/${clienteActualizado.id}`, clienteActualizado);
// Actualiza el estado local de React
setClientes(clientes.map(cl =>
cl.id === clienteActualizado.id ? clienteActualizado : cl
));
} catch (error) {
console.error("Error al actualizar cliente:", error);
}
};
const eliminarCliente = async (id) => {
try {
// DELETE: notifica al backend para eliminar
await api.delete(`/clientes/${id}`);
// Actualiza el estado local de React
setClientes(clientes.filter(cl => cl.id !== id));
} catch (error) {
console.error("Error al eliminar cliente:", error);
}
};
// (Implementar agregar/actualizar/eliminarMascota de forma similar...)
const value = {
clientes,
agregarCliente,
actualizarCliente,
eliminarCliente,
mascotas,
isLoading, // Lo exponemos para que las vistas muestren un mensaje de carga
// ... (resto de funciones de mascotas)
};
if (isLoading) {
return <h1>Cargando datos del servidor...</h1>; // Muestra un mensaje de carga
}
return (
<VeterinariaContext.Provider value={value}>
{children}
</VeterinariaContext.Provider>
);
};