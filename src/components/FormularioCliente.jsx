import { useState } from "react";

function FormularioCliente({onClienteAgregado}) {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [errorEnvio, setErrorEnvio] = useState("");

    const manejadorNombre = (e) => {
        setNombre(e.target.value);
    }

    const manejadorTelefono = (e) => {
        setTelefono(e.target.value);
    }

    const manejadorEnvio = async (e) => {
        e.preventDefault();

        if (nombre.trim() === "" || apellido.trim() === "" || telefono.trim() === "") {
            alert("Por favor, complete los datos.");
            return;
        }

        const nuevoCliente = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            telefono: telefono.trim(),
        };

        setErrorEnvio("");
        try {
            await onClienteAgregado(nuevoCliente);
            setNombre("");
            setApellido("");
            setTelefono("");
        } catch (error) {
            setErrorEnvio(
                error.response?.data?.message ||
                error.response?.data?.mensaje ||
                "No se pudo registrar el cliente. Verifique la conexión e inténtelo de nuevo."
            );
        }
    }

    return (
        <form onSubmit={manejadorEnvio} className="form-layout">
            <label className="field-label">
                Nombre
            <input
                type="text"
                value={nombre}
                onChange={manejadorNombre}
                className="field-control"
                required 
            />
            </label>
            <label className="field-label">
                Apellido
            <input
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="field-control"
                required
            />
            </label>
            <label className="field-label">
                Teléfono
            <input
                type="tel"
                value={telefono}
                onChange={manejadorTelefono}
                className="field-control"
                required 
            />
            </label>
            {errorEnvio && <p role="alert">{errorEnvio}</p>}
            <button type="submit" className="btn-primary self-end">
                Registrar Cliente
            </button>
        </form>
    );    
}

export default FormularioCliente;
