// src/components/VistaDetalleCliente.jsx
import React from "react";
import { useState } from "react";
// Importamos las herramientas clave: useParams para leer la URL
import { useParams, Link } from "react-router-dom";
function VistaDetalleCliente() {
    const [clientes] = useState(() => {
            const datosGuardados = localStorage.getItem('clientesDogo') || [];
            return datosGuardados ? JSON.parse(datosGuardados) : [];
    });

    const [mascotas] = useState(() => {
            const datosGuardados = localStorage.getItem('clientesDogo') || [];
            return datosGuardados ? JSON.parse(datosGuardados) : [];
    });

  const { id: clienteIdString } = useParams();
  const clienteId = Number(clienteIdString);

  const cliente = clientes.find(c => c.id === clienteId);

  const mascotasDelCliente = mascotas.filter((m) => m.clienteId === clienteId);
  if (!cliente) {
    return <h2>Cliente no encontrado (ID: {clienteId})</h2>;
  }

  return (
    <div>
      <Link to="/">← Volver a la Lista de Clientes</Link>
      <section className="info-principal">
        <h2> Cliente: {cliente.nombre}</h2>
        <p>Teléfono: **{cliente.telefono}**</p>
        <hr />
      </section>
      <section className="mascotas-asociadas">
        <h3>
          {" "}
          Mascotas de {cliente.nombre} ({mascotasDelCliente.length})
        </h3>
        {mascotasDelCliente.length === 0 ? (
          <p>Este cliente aún no tiene mascotas registradas.</p>
        ) : (
          <ul>
            {mascotasDelCliente.map((mascota) => (
              <li key={mascota.id}>
                **{mascota.nombre}** - Especie: {mascota.especie}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
export default VistaDetalleCliente;
