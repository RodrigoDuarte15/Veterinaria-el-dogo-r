import { useState, useEffect } from "react";
import { VeterinariaContext } from "./VeterinariaContext";

export const VeterinariaProvider = ({ children }) => {

  // Clientes
  const [clientes, setClientes] = useState(() => {
    const datosGuardados = localStorage.getItem('clientesDogo') || [];
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
    console.log("Detectando cambios en la lista de clientes. guardando...");
    localStorage.setItem('clientesDogo', JSON.stringify(clientes));
  }, [clientes]);


  // Mascotas
  const [mascotas, setMascotas] = useState(() => {
        const datosMascotaGuardados = localStorage.getItem('mascotasDogo') | [];
        return datosMascotaGuardados ? JSON.parse(datosMascotaGuardados) : [];
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

    const value = {
      // clientes
      clientes,
      agregarCliente,
      eliminarCliente,
      actualizarCliente,

      // mascotas
      mascotas,
      agregarMascota,
      eliminarMascota,
      actualizarMascota

    }

    return (
      <VeterinariaContext.Provider value={value}>
        {children}
      </VeterinariaContext.Provider>
    );
}