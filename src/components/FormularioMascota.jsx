import { useState } from "react";

function FormularioMascota({onMascotaAgregada}) {

    const [nombre, setNombre] = useState("");
    const [especie, setEspecie] = useState("");

    const manejadorNombre = (e) => {
        setNombre(e.target.value);
    }

    const manejadorEspecie = (e) => {
        setEspecie(e.target.value);
    }

    const manejadorEnvio = (e) => {
        e.preventDefault();

        if (nombre.trim() === "" || especie.trim() === "") {
            alert("Por favor, complete los datos.");
            return;
        }

        const nuevaMascota = {
            id: Date.now(),
            nombre: nombre,
            especie: especie,
        };

        console.log("Nueva mascota registrada:", nuevaMascota);

        onMascotaAgregada(nuevaMascota);

        setNombre("");
        setEspecie("");
    }

    return (
        <form onSubmit={manejadorEnvio}>
            <h3>Nueva Mascota:</h3>
            <label htmlFor="">Nombre de la Mascota</label>
            <input
                type="text"
                value={nombre}
                onChange={manejadorNombre}
                required 
            />
            <label htmlFor="">Especie</label>
            <input
                type="text"
                value={especie}
                onChange={manejadorEspecie}
                required 
            />
            <button type="submit">Registrar Mascota</button>
        </form>
    );    
}

export default FormularioMascota;
