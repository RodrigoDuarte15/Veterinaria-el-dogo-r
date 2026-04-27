// src/App.jsx
import { useState } from 'react';
import FormularioCliente from './components/FormularioCliente';
import FormularioMascota from './components/FormularioMascota';
import ClienteItem from './components/Clienteitem';
import MascotaItem from './components/Mascotaitem';
import Login from './components/login'; // Asegúrate que el archivo se llame login.js o login.jsx
import './App.css';

function App() {
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Juan Pérez', telefono: '1123456789' },
    { id: 2, nombre: 'Ana Gómez', telefono: '11987654321' }
  ]);
  const [mascotas, setMascotas] = useState([
    { id: 1, nombre: 'Tobi', especie: 'Perro' },
    { id: 2, nombre: 'Oliver', especie: 'Gato' }
  ]);

  const [estaLogeado, setEstaLogeado] = useState(false);
  const nombreApp = "El Dogo - Gestión de Pacientes";

  // --- Funciones de Lógica ---
  const agregarCliente = (nuevoCliente) => setClientes([...clientes, nuevoCliente]);
  
  const eliminarCliente = (clienteId) => {
    setClientes(clientes.filter(cliente => cliente.id !== clienteId));
  };

  const actualizarCliente = (clienteActualizado) => {
    setClientes(clientes.map(c => c.id === clienteActualizado.id ? clienteActualizado : c));
  };

  const agregarMascota = (nuevaMascota) => setMascotas([...mascotas, nuevaMascota]);

  const eliminarMascota = (mascotaId) => {
    setMascotas(mascotas.filter(m => m.id !== mascotaId));
  };

  const actualizarMascota = (mascotaActualizada) => {
    setMascotas(mascotas.map(m => m.id === mascotaActualizada.id ? mascotaActualizada : m));
  };

  const manejadorLogin = (estado) => setEstaLogeado(estado);

  return (
    <div className='app-container'>
      <h1>{nombreApp}</h1>
      
      {!estaLogeado ? (
        /* Si NO está logueado, mostramos SOLOS el login */
        <Login onLoginExitoso={manejadorLogin} />
      ) : (
        /* Si ESTÁ logueado, mostramos todo el dashboard */
        <>
          <p>¡Bienvenido! Acá gestionarás a tus Clientes y Mascotas.</p>
          <div className="stats">
            <p>Total de clientes: <strong>{clientes.length}</strong></p>
            <p>Total de mascotas: <strong>{mascotas.length}</strong></p>
          </div>

          <button className="desloguearse" onClick={() => setEstaLogeado(false)}>
            Cerrar Sesión
          </button>

          <hr />

          <section className="gestion-seccion">
            <h2>Gestión de Clientes</h2>
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

          <hr />

          <section className="gestion-seccion">
            <h2>Gestión de Mascotas</h2>
            <FormularioMascota onMascotaAgregada={agregarMascota} />
            <ul>
              {mascotas.map((mascota) => (
                <MascotaItem 
                  key={mascota.id} 
                  mascota={mascota} 
                  onEliminar={eliminarMascota}
                  onGuardar={actualizarMascota}
                />
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}

export default App;