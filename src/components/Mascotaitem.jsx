import { useState } from "react";
console.log("COMPONENTE MASCOTA CARGADO");
function MascotaItem({ clientes, mascota, onEliminar, onGuardar }) {

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
  }

  const manejadorGuardar = (e) => {
    e.preventDefault();

    const mascotaActualizada = {
      ...mascota,
      nombre: nombreEditado,
      especie: especieEditada,
      raza: razaEditada,
      clienteId: Number(clienteIdEditado)
    };

    onGuardar(mascotaActualizada);

    setEsEdicion(false);
  };
  return (
    <li key={mascota.id}>
      {esEdicion ? (
        <form onSubmit={manejadorGuardar} >
          <input
            type="text"
            value={nombreEditado}
            onChange={(e) => setNombreEditado(e.target.value)}
          />

          <input
            type="text"
            value={especieEditada}
            onChange={(e) => setEspecieEditada(e.target.value)}
          />

          <input
            type="text"
            value={razaEditada}
            onChange={(e) => setRazaEditada(e.target.value)}
          />
          <select
            value={clienteIdEditado}
            onChange={(e) => setClienteIdEditado(e.target.value)}

          >
            <option>-- Seleccione un dueño --</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>

          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setEsEdicion(false)}>
            Cancelar
          </button>
        </form>
      ) : (
        <div>
          ** {mascota.nombre} ** 
          - Especie: {mascota.especie}
          - Raza: {mascota.raza}
          - Dueño: {getDuenio(mascota.clienteId)}
          <button onClick={manejadorEliminar}>🗑️Eliminar</button>
          <button onClick={manejadorEditar}>Editar</button>
        </div>
      )}
    </li >
  );
}

export default MascotaItem;