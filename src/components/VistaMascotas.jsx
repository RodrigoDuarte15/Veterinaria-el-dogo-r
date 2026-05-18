import { useState, useEffect } from 'react';
import FormularioMascota from './FormularioMascota';
import MascotaItem from './Mascotaitem';
function VistaMascotas() {

    const [mascotas, setMascotas] = useState(() => {
        const datosMascotaGuardados = localStorage.getItem('mascotasDogo') | [];
        return datosMascotaGuardados ? JSON.parse(datosMascotaGuardados) : [];
    });

    const [clientes] = useState(() => {
        const clientesGuardados = localStorage.getItem('clientesDogo') | [];
        return clientesGuardados ? JSON.parse(clientesGuardados) : [];
    });


    const agregarMascota = (nuevaMascota) => setMascotas([...mascotas, nuevaMascota]);

    const eliminarMascota = (mascotaId) => {
        setMascotas(mascotas.filter(m => m.id !== mascotaId));
    };

    const actualizarMascota = (mascotaActualizada) => {
        setMascotas(mascotas.map(m => m.id === mascotaActualizada.id ? mascotaActualizada : m));
    };
    useEffect(() => {
        console.log("Detectando cambios en la lista de mascotas. !Guardando!");
        localStorage.setItem('mascotasDogo', JSON.stringify(mascotas));
    }, [mascotas]);

    return (
        <div>
            <section>
                <h2>Gestión de Mascotas</h2>
                <p>Total de clientes: <strong>{mascotas.length}</strong></p>
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