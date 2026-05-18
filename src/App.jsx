// src/App.jsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

/* components */
import Login from './components/login'; // Asegúrate que el archivo se llame login.js o login.jsx
import Navegacion from './components/Navegacion';
import VistaClientes from './components/VistaClientes';
import VistaMascotas from './components/VistaMascotas';
import VistaConfiguracion from './components/VistaConfiguracion';
import './App.css';

function App() {
  const [estaLogeado, setEstaLogeado] = useState(false);
  const nombreApp = "El Dogo - Gestión de Veterinaria";


  const manejadorLogin = (estado) => setEstaLogeado(estado);

  return (
    <>
      <h1>{nombreApp}</h1>
      <p>¡Bienvenido! Acá gestionarás a tus Clientes y Mascotas.</p>

      {estaLogeado ? (
        /* Si NO está logueado, mostramos SOLOS el login */
        <>
          <Navegacion />

          <Routes>
            <Route path="/" element={<VistaClientes />} />
            <Route path="/mascotas" element={<VistaMascotas />} />
            <Route path="/config" element={<VistaConfiguracion />} />
            <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
          </Routes>
        </>
      ) : (
        <div>
          <Login onLoginExitoso={manejadorLogin} />
        </div>
      )

      }

      {estaLogeado && (
        <button onClick={() => setEstaLogeado(false)}>
          Cerrar Sesión
        </button>
      )}
    </>
  )
}


export default App;