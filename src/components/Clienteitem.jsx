function ClienteItem({ cliente }) {
  return (
    <li>
      {cliente.nombre} - Tel: {cliente.telefono}
    </li>
  );
}

export default ClienteItem;