
import { useState } from "react";
import Tarjeta from "./Tarjeta";
function MascotaItem({ clientes, mascota, onEliminar, onGuardar }) {
  console.log("Clientes:", clientes);
const getDuenio = (id) => {
    const cliente = clientes.find((cliente) => cliente.id === id);
    return cliente ? cliente.nombre : "Dueño desconocido";
  };

  const [esEdicion, setEsEdicion] = useState(false);

  const [nombreEditado, setNombreEditado] = useState(mascota.nombre);
  const [especieEditada, setEspecieEditada] = useState(mascota.especie);
  const [razaEditada, setRazaEditada] = useState(mascota.raza);
  const [clienteIdEditado, setClienteIdEditado] = useState(mascota.clienteId);

  const manejadorEliminar = () => {
    if (window.confirm(`¿Confirma que desea eliminar a ${mascota.nombre}?`)) {
      onEliminar(mascota.id);
    }
  };

  const manejadorEditar = () => {
    setEsEdicion(true);
  };

  const manejadorGuardar = (e) => {
    e.preventDefault();

    const mascotaActualizada = {
      ...mascota,
      nombre: nombreEditado,
      especie: especieEditada,
      raza: razaEditada,
      clienteId: Number(clienteIdEditado),
    };

    onGuardar(mascotaActualizada);

    setEsEdicion(false);
  };
  return (
      <li key={mascota.id}>
        {esEdicion ? (
          <form onSubmit={manejadorGuardar} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <label className="field-label">
              Nombre
            <input
              type="text"
              value={nombreEditado}
              onChange={(e) => setNombreEditado(e.target.value)}
              className="field-control"
            />
            </label>
            <label className="field-label">
              Especie
            <input
              type="text"
              value={especieEditada}
              onChange={(e) => setEspecieEditada(e.target.value)}
              className="field-control"
            />
            </label>
            <label className="field-label">
              Raza
            <input
              type="text"
              value={razaEditada}
              onChange={(e) => setRazaEditada(e.target.value)}
              className="field-control"
            />
            </label>
            <label className="field-label">
              Dueño
            <select
              value={clienteIdEditado}
              onChange={(e) => setClienteIdEditado(e.target.value)}
              className="field-control"
            >
              <option>-- Seleccione un dueño --</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
            </label>

            <button type="submit" className="btn-primary">
              Guardar
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setEsEdicion(false)}
            >
              Cancelar
            </button>
          </form>
        ) : (
          <Tarjeta>
            ** {mascota.nombre} ** - Especie: {mascota.especie}- Raza:{" "}
            {mascota.raza}- Dueño: {getDuenio(mascota.clienteId)}
            <button className="btn-danger" onClick={manejadorEliminar}>
              🗑️Eliminar
            </button>
            <button className="btn-secondary" onClick={manejadorEditar}>
              Editar
            </button>
          </Tarjeta>
        )}
      </li>  
  );
}

export default MascotaItem;
