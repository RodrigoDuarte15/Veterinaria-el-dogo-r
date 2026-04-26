import { useState } from "react";
console.log("COMPONENTE MASCOTA CARGADO");
function MascotaItem({ mascota, onEliminar, onGuardar}) {

  const [esEdicion, setEsEdicion] = useState(false);

  const [nombreEditado, setNombreEditado] = useState(mascota.nombre);
  const [especieEditada, setEspecieEditada] = useState(mascota.especie);


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
      especie: especieEditada
    };

    onGuardar(mascotaActualizada);

    setEsEdicion(false);
  };
  return (
    <li>
     {esEdicion?(
  <form onSubmit = { manejadorGuardar } >
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

    <button type="submit">Guardar</button>
    <button type="button" onClick={() => setEsEdicion(false)}>
      Cancelar
    </button>
  </form>
  ): (
    <div>
      {mascota.nombre} - Tel: {mascota.especie}
      <button onClick ={manejadorEliminar}>🗑️Eliminar</button>
      <button onClick={manejadorEditar}>Editar</button>
    </div>
  )}
    </li >
  );
}

export default MascotaItem;