import { useContext } from 'react';
import { VeterinariaContext } from '../contexto/VeterinariaContext';
import FormularioCliente from './FormularioCliente';
import ClienteItem from './Clienteitem';
import styles from './VistaClientes.module.css';

function VistaClientes() {
    const { clientes, agregarCliente, eliminarCliente, actualizarCliente } = useContext(VeterinariaContext);

    return (
        <div className={styles.contenedorPrincipal}>
            <header className={styles.encabezado}>
                <div>
                    <p className={styles.etiqueta}>DIRECTORIO</p>
                    <h2 className={styles.titulo}>Gestión de clientes</h2>
                </div>
                <p className={styles.contador}>
                    <strong>{clientes.length}</strong>
                    <span>{clientes.length === 1 ? 'cliente' : 'clientes'}</span>
                </p>
            </header>

            <div className={styles.contenido}>
                <section className={styles.seccionFormulario} aria-labelledby="nuevo-cliente">
                    <h3 className={styles.tituloSeccion} id="nuevo-cliente">Nuevo cliente</h3>
                    <FormularioCliente onClienteAgregado={agregarCliente} />
                </section>

                <section className={styles.seccionListado} aria-labelledby="lista-clientes">
                    <div className={styles.encabezadoListado}>
                        <h3 className={styles.tituloSeccion} id="lista-clientes">Clientes registrados</h3>
                        <span className={styles.totalListado}>{clientes.length} en total</span>
                    </div>
                    {clientes.length > 0 ? (
                        <ul className={styles.listaClientes}>
                            {clientes.map((cliente) => (
                                <ClienteItem
                                    key={cliente.id}
                                    cliente={cliente}
                                    onEliminar={eliminarCliente}
                                    onGuardar={actualizarCliente}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.estadoVacio}>Todavía no hay clientes registrados.</p>
                    )}
                </section>
            </div>
        </div>
    )
}

export default VistaClientes;