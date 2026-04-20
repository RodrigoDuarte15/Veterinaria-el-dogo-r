import { useState } from "react";

function FormularioCliente({onClienteAgregado}) {

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");

    const manejadorNombre = (e) => {
        setNombre(e.target.value);
    }

    const manejadorTelefono = (e) => {
        setTelefono(e.target.value);
    }

    const manejadorEnvio = (e) => {
        e.preventDefault();

        if (nombre.trim() === "" || telefono.trim() === "") {
            alert("Por favor, complete los datos.");
            return;
        }

        const nuevoCliente = {
            id: Date.now(),
            nombre: nombre,
            telefono: telefono,
        };

        console.log("Nuevo cliente registrado:", nuevoCliente);

        onClienteAgregado(nuevoCliente);

        setNombre("");
        setTelefono("");
    }

    return (
        <form onSubmit={manejadorEnvio}>
            <h3>Nuevo Cliente:</h3>
            <label htmlFor="">Nombre Completo</label>
            <input
                type="text"
                value={nombre}
                onChange={manejadorNombre}
                required 
            />
            <label htmlFor="">Teléfono</label>
            <input
                type="tel"
                value={telefono}
                onChange={manejadorTelefono}
                required 
            />
            <button type="submit">Registrar Cliente</button>
        </form>
    );    
}

export default FormularioCliente;
