import { useContext } from 'react';
import { VeterinariaContext } from '../contexto/VeterinariaContext';
import FormularioCliente from './FormularioCliente';
import ClienteItem from './Clienteitem';
import React from 'react';
import styles from './VistaClientes.module.css';
 

function VistaClientes() {

    const { clientes, agregarCliente, eliminarCliente, actualizarCliente } = useContext(VeterinariaContext);


    return (
        <div className={styles.contenedorPrincipal}>
            <section>
                <h2 className={styles.titulo}>Gestión de Clientes</h2>
                <p className={styles.contador}>Total de clientes: <strong>{clientes.length}</strong></p>
                <hr />
                <FormularioCliente onClienteAgregado={agregarCliente} />
                <ul>
                    {clientes.map((cliente) => (
                        <ClienteItem
                            key={cliente.id}
                            cliente={cliente}
                            onEliminar={eliminarCliente}
                            onGuardar={actualizarCliente}
                        />
                    ))}
                </ul>
            </section>
        </div>
    )
}     
    


export default VistaClientes;