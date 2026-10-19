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
                <h2 className={styles.titulo}>Mascotas</h2>
                <p className={styles.contador}>
                    {mascotas.length} {mascotas.length === 1 ? 'mascota registrada' : 'mascotas registradas'}
                </p>
                <div className={styles.seccionFormulario}>
                    <FormularioMascota
                        clientes={clientes}
                        onMascotaAgregada={agregarMascota}
                    />
                </div>
                <h3 className={styles.tituloListado}>Mascotas registradas</h3>
                {mascotas.length ? (
                    <ul className={styles.listaMascotas}>
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
                ) : (
                    <p className={styles.estadoVacio}>Todavía no hay mascotas registradas.</p>
                )}
            </section>
        </div>
    )
}

export default VistaMascotas;