import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Navegacion from './components/Navegacion';
import VistaClientes from './components/VistaClientes';
import VistaDetalleCliente from './components/VistaDetalleCliente';
import VistaMascotas from './components/VistaMascotas';
import VistaConfiguracion from './components/VistaConfiguracion';
import { VeterinariaProvider } from './context/VeterinariaProvider';
import { AutenticacionProvider } from './context/AutenticacionProvicder';

import './App.css';

function App() {
  const nombreApp = "El Dogo - Gestión de Veterinaria";
  const [estaLogeado, setEstaLogeado] = useState(false);
  const manejadorLogin = (estado) => setEstaLogeado(estado);

  return (
    <AutenticacionProvider>
      <h1>{nombreApp}</h1>
      <p>¡Bienvenido! Acá gestionarás a tus Clientes y Mascotas.</p>

      {estaLogeado ? (
        <VeterinariaProvider>
          <Navegacion />

          <Routes>
            <Route path="/" element={<VistaClientes />} />
            <Route path="/clientes/:id" element={<VistaDetalleCliente />} />
            <Route path="/mascotas" element={<VistaMascotas />} />
            <Route path="/config" element={<VistaConfiguracion />} />
            <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
          </Routes>
        </VeterinariaProvider>
      ) : (
        <div>
          <Login onLoginExitoso={manejadorLogin} />
        </div>
      )}

      {estaLogeado && (
        <button onClick={() => setEstaLogeado(false)}>
          Cerrar Sesión
        </button>
      )}
    </AutenticacionProvider>
  );
}

export default App;