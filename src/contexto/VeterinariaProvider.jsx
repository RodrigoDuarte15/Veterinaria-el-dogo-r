import { useState, useEffect } from 'react';
import { VeterinariaContext } from './VeterinariaContext';
import { useApi } from '../hooks/useApi'; // Importamos el nuevo hook
export const VeterinariaProvider = ({ children }) => {
const [clientes, setClientes] = useState([]);
const [mascotas, setMascotas] = useState([]);
const [isLoading, setIsLoading] = useState(true);
// Instanciamos los hooks de API para cada endpoint
const clientesApi = useApi('/clientes');
const mascotasApi = useApi('/mascotas');
const obtenerClientes = clientesApi.get;
const obtenerMascotas = mascotasApi.get;
// LÓGICA DE CARGA INICIAL (Más limpia)
useEffect(() => {
const fetchData = async () => {
try {
// Usamos el método get del hook para cargar datos
const [clientesData, mascotasData] = await Promise.all([
obtenerClientes(),
obtenerMascotas()

]);
setClientes(clientesData);
setMascotas(mascotasData);
} catch {
// El error ya fue logueado en useApi
} finally {
setIsLoading(false);
}
};
fetchData();
}, [obtenerClientes, obtenerMascotas]);
// FUNCIONES CRUD DE CLIENTES (Delegando la lógica HTTP al hook)
const agregarCliente = async (nuevoCliente) => {
try {
// Usamos el método create del hook
const data = await clientesApi.create(nuevoCliente);
setClientes([...clientes, data]);
} catch { /* El error ya fue logueado en useApi */ }
};
const actualizarCliente = async (clienteActualizado) => {
try {
// Usamos el método update
await clientesApi.update(clienteActualizado.id, clienteActualizado);
setClientes(clientes.map(cl =>
cl.id === clienteActualizado.id ? clienteActualizado : cl
));
} catch { /* El error ya fue logueado en useApi */ }
};
const eliminarCliente = async (id) => {
try {
// Usamos el método remove
await clientesApi.remove(id);
setClientes(clientes.filter(cl => cl.id !== id));
} catch { /* El error ya fue logueado en useApi */ }
};

// FUNCIONES CRUD DE MASCOTAS (Delegando la lógica HTTP al hook)
const agregarMascota = async (nuevaMascota) => {
const data = await mascotasApi.create(nuevaMascota);
setMascotas([...mascotas, data]);
return data;
};
const actualizarMascota = async (mascotaActualizada) => {
try {
await mascotasApi.update(mascotaActualizada.id, mascotaActualizada);
setMascotas(mascotas.map(mascota =>
mascota.id === mascotaActualizada.id ? mascotaActualizada : mascota
));
} catch { /* El error ya fue logueado en useApi */ }
};
const eliminarMascota = async (id) => {
try {
await mascotasApi.remove(id);
setMascotas(mascotas.filter(mascota => mascota.id !== id));
} catch { /* El error ya fue logueado en useApi */ }
};

const value = {
clientes,
agregarCliente,
actualizarCliente,
eliminarCliente,
mascotas,
agregarMascota,
actualizarMascota,
eliminarMascota,
isLoading
};

return (
<VeterinariaContext.Provider value={value}>
{children}
</VeterinariaContext.Provider>
);
};