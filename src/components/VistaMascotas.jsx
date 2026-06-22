import { useContext } from 'react';
import { VeterinariaContext } from '../contexto/VeterinariaContext';
import FormularioMascota from './FormularioMascota';
import MascotaItem from './Mascotaitem';
import styles from './VistaMascota.module.css';
import React from 'react';
function VistaMascotas() {

    const { mascotas, agregarMascota, eliminarMascota, actualizarMascota, clientes } = useContext(VeterinariaContext);

    return (
        <div className={styles.contenedorPrincipal}>
            <section>
                <h2 className={styles.titulo}>Gestión de Mascotas</h2>
                <p className={styles.contador}>Total de mascotas: <strong>{mascotas.length}</strong></p>
                <FormularioMascota
                    clientes={clientes}
                    onMascotaAgregada={agregarMascota} />
                <h2>Mascotas Actuales</h2>
                <ul>
                    {mascotas.map((mascota) => (
                        <MascotaItem
                            key={mascota.id}
                            clientes={clientes}
                            mascota={mascota}
                            onEliminar={eliminarMascota}
                            onGuardar={actualizarMascota}
                        />
                    ))}
                </ul>
            </section>
        </div>
    )
}

export default VistaMascotas;