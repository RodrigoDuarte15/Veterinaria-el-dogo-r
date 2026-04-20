function ClienteItem({ cliente, onEliminar}) {

  const handleEliminarClick = () => {
    if (window.confirm(`¿Confirma que desea eliminar a ${cliente.nombre}?`)) {
      onEliminar(cliente.id);
    }
  };

  return (
    <li>
      {cliente.nombre} - Tel: {cliente.telefono}
      <button onClick={handleEliminarClick}>🗑️Eliminar</button>
    </li>
  );
}

export default ClienteItem;