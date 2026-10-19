import { useState } from "react";

function FormularioMascota({clientes, onMascotaAgregada}) {

    const [nombre, setNombre] = useState("");
    const [especie, setEspecie] = useState("");
    const [raza, setRaza] = useState("");
    const [clienteId, setClienteId] = useState("");
    const [foto, setFoto] = useState(null);
    const [errorEnvio, setErrorEnvio] = useState("");

    const manejadorNombre = (e) => {
        setNombre(e.target.value);
    }

    const manejadorEspecie = (e) => {
        setEspecie(e.target.value);
    }

    const manejarCambioImagen = (evento) => {
        setFoto(evento.target.files?.[0] ?? null);
    };

    const manejadorEnvio = async (e) => {
        e.preventDefault();

        if (nombre.trim() === "" || especie.trim() === "" || raza.trim() === "" || clienteId.trim() === "") {
            alert("Por favor, complete los datos.");
            return;
        }

        const formulario = e.currentTarget;
        setErrorEnvio("");
        const datosFormulario = new FormData();
        datosFormulario.append("nombre", nombre.trim());
        datosFormulario.append("especie", especie.trim());
        datosFormulario.append("raza", raza.trim());
        datosFormulario.append("clienteId", clienteId);
        if (foto) {
            datosFormulario.append("imagen", foto);
        }

        try {
            await onMascotaAgregada(datosFormulario);
            alert("¡Mascota guardada con éxito!");
            setNombre("");
            setEspecie("");
            setRaza("");
            setClienteId("");
            setFoto(null);
            formulario.reset();
        } catch (error) {
            console.error("Error al subir la mascota:", error);
            setErrorEnvio(
                error.response?.data?.message ||
                error.response?.data?.mensaje ||
                "No se pudo guardar la mascota. Verifique los datos e inténtelo de nuevo."
            );
        }
    }

    return (
        <form onSubmit={manejadorEnvio} className="form-layout">
            <h3 className="form-title">Registrar mascota</h3>
            <label className="field-label">
                Dueño: 
                <select
                value={clienteId}
                    onChange={(e) => setClienteId(e.target.value)}
                    className="field-control"
                    required
                    
                
                >
                    <option value="">-- Seleccione un dueño --</option>
                    {clientes.map((cliente) => (
                        <option 
                        key={cliente.id} 
                        value={cliente.id}
                        >
                            {cliente.nombre}
                        </option>
                    ))}

                </select>
            </label>
            <label className="field-label">
                Nombre:
                <input type="text"
                 value={nombre} 
                 onChange={manejadorNombre}
                 className="field-control"
                 required
                />
            </label>
            <label className="field-label">
                Especie:
                <input type="text"
                 value={especie} 
                 onChange={manejadorEspecie}
                 className="field-control"
                 required
                />
            </label>
            <label className="field-label">
                Raza:
                <input type="text"
                 value={raza} 
                 onChange={(e) => setRaza(e.target.value)}
                 className="field-control"
                 required
                />
            </label>
            <label className="field-label">
                Foto (opcional)
                <input
                    type="file"
                    accept="image/*"
                    onChange={manejarCambioImagen}
                    className="field-control"
                />
            </label>
            {errorEnvio && <p role="alert">{errorEnvio}</p>}
            <button type="submit" className="btn-primary">
                Guardar mascota
            </button>
        </form>
    );    
}

export default FormularioMascota;
