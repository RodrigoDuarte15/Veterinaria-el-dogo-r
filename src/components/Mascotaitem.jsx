
import { useState } from "react";
import Tarjeta from "./Tarjeta";
import styles from "./VistaMascota.module.css";
import api from "../api/axios";
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
      <li className={styles.mascota}>
        {esEdicion ? (
          <form onSubmit={manejadorGuardar} className={`form-layout ${styles.formEdicion}`}>
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
              required
            >
              <option value="">-- Seleccione un dueño --</option>
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
            <div className={styles.tarjetaMascota}>
              {mascota.foto && (
                <img
                  className={styles.fotoMascota}
                  src={new URL(mascota.foto, api.defaults.baseURL).href}
                  alt={`Foto de ${mascota.nombre}`}
                  loading="lazy"
                />
              )}
              <div className={styles.detallesMascota}>
                <span className={styles.nombreMascota}>{mascota.nombre}</span>
                <span>Especie: {mascota.especie} · Raza: {mascota.raza}</span>
                <span>Responsable: {getDuenio(mascota.clienteId)}</span>
              </div>
            </div>
            <div className={styles.accionesMascota}>
              <button type="button" className="btn-secondary" onClick={manejadorEditar}>
                Editar
              </button>
              <button type="button" className="btn-danger" onClick={manejadorEliminar}>
                Eliminar
              </button>
            </div>
          </Tarjeta>
        )}
      </li>  
  );
}

export default MascotaItem;
