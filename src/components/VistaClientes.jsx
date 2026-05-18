import { useState, useEffect } from 'react';
import FormularioCliente from './FormularioCliente';
import ClienteItem from './Clienteitem';
function VistaClientes() {

    const [clientes, setClientes] = useState(() => {
        const datosGuardados = localStorage.getItem('clientesDogo') | [];
        return datosGuardados ? JSON.parse(datosGuardados) : [];
    });

    // --- Funciones de Lógica ---
    const agregarCliente = (nuevoCliente) => setClientes([...clientes, nuevoCliente]);

    const eliminarCliente = (clienteId) => {
        setClientes(clientes.filter(cliente => cliente.id !== clienteId));
    };

    const actualizarCliente = (clienteActualizado) => {
        setClientes(clientes.map(c => c.id === clienteActualizado.id ? clienteActualizado : c));
    };

    useEffect(() => {
        console.log("Detectando cambios en la lista de clientes. !Guardando!");
        localStorage.setItem('clientesDogo', JSON.stringify(clientes));
    }, [clientes]);


    return (
        <div>
            <section>
                <h2>Gestión de Clientes</h2>
                <p>Total de clientes: <strong>{clientes.length}</strong></p>
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