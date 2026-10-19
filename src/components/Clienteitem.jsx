import { useState } from "react";
import { Link } from "react-router-dom";
import styles from './VistaClientes.module.css';
function ClienteItem({ cliente, onEliminar, onGuardar }) {
  const [esEdicion, setEsEdicion] = useState(false);

  const [nombreEditado, setNombreEditado] = useState(cliente.nombre);
  const [telefonoEditado, setTelefonoEditado] = useState(cliente.telefono);

  const manejadorEliminar = async () => {
    if (window.confirm(`¿Confirma que desea eliminar a ${cliente.nombre}?`)) {
      try {
        await onEliminar(cliente.id);
      } catch (error) {
        window.alert(
          error.response?.data?.message ||
          error.response?.data?.mensaje ||
          "No se pudo eliminar el cliente. Inténtelo de nuevo.",
        );
      }
    }
  };

  const manejadorEditar = () => {
    setEsEdicion(true);
  };

  const manejadorGuardar = (e) => {
    e.preventDefault();

    const clienteActualizado = {
      ...cliente,
      nombre: nombreEditado,
      telefono: telefonoEditado,
    };

    onGuardar(clienteActualizado);

    setEsEdicion(false);
  };

  return (
    <li className={styles.cliente}>
      {esEdicion ? (
        <form onSubmit={manejadorGuardar} className={styles.formEdicion}>
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
            Teléfono
          <input
            type="text"
            value={telefonoEditado}
            onChange={(e) => setTelefonoEditado(e.target.value)}
            className="field-control"
          />
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
        <>
          <div className={styles.detalleCliente}>
            <Link to={`/cliente/${cliente.id}`} className={styles.nombreCliente}>
              <strong>{cliente.nombre} {cliente.apellido}</strong>
          </Link>
            <span className={styles.telefonoCliente}>Teléfono: {cliente.telefono}</span>
          </div>
          <div className={styles.accionesCliente}>
            <button className="btn-secondary" onClick={manejadorEditar}>
              Editar
            </button>
            <button className="btn-danger" onClick={manejadorEliminar}>
              Eliminar
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default ClienteItem;
