import { useState } from "react";

function FormularioMascota({clientes, onMascotaAgregada}) {

    const [nombre, setNombre] = useState("");
    const [especie, setEspecie] = useState("");
    const [raza, setRaza] = useState("");
    const [clienteId, setClienteId] = useState("");
    const [foto, setFoto] = useState(null);

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
            alert("No se pudo guardar la mascota. Inténtelo de nuevo.");
        }
    }

    return (
        <form onSubmit={manejadorEnvio}>
            <h3>Nueva Mascota:</h3>
            <label>
                Dueño: 
                <select
                value={clienteId}
                    onChange={(e) => setClienteId(e.target.value)}
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
            <label>
                Nombre:
                <input type="text"
                 value={nombre} 
                 onChange={manejadorNombre}
                 required
                />
            </label>
            <label>
                Especie:
                <input type="text"
                 value={especie} 
                 onChange={manejadorEspecie}
                 required
                />
            </label>
            <label>
                Raza:
                <input type="text"
                 value={raza} 
                 onChange={(e) => setRaza(e.target.value)}
                 required
                />
            </label>
            <label>
                Foto:
                <input
                    type="file"
                    accept="image/*"
                    onChange={manejarCambioImagen}
                />
            </label>
            <button type="submit">Registrar Mascota</button>
        </form>
    );    
}

export default FormularioMascota;
