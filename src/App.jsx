import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// 1. IMPORTAMOS LOS PROVEEDORES
// El proveedor de autenticación gestiona el Token y el usuario
import { AutenticacionProvider as ProveedorAutenticacion } from './contexto/AutenticacionProvider';
// El proveedor de la veterinaria gestiona los datos de clientes y mascotas
import { VeterinariaProvider } from './contexto/VeterinariaProvider';
// 2. IMPORTAMOS EL COMPONENTE GUARDIA (RUTA PROTEGIDA)
import { RutaProtegida } from './components/RutasProtegida';
// 3. IMPORTAMOS COMPONENTES Y VISTAS
import Navegacion from './components/Navegacion';
import VistaClientes from './components/VistaClientes';
import VistaDetalleCliente from './components/VistaDetalleCliente';
import VistaMascotas from './components/VistaMascotas';
import VistaConfiguracion from './components/VistaConfiguracion';
import Login from './components/Login';
function VeterinariaApp() {
return (
// CAPA 1: Proveedor de Autenticación envolviendo TODA la app
<ProveedorAutenticacion>
<div className="app-shell">
{/* Definición global de Rutas */}
<Routes>
{/* RUTA PÚBLICA: Pantalla de Login */}
<Route
path="/login"
element={
<main className="login-page">
<Login />
</main>
}
/>
{/* RUTAS PROTEGIDAS (Zona VIP del sistema) */}
{/* Todas las rutas dentro de este bloque pasan primero por el guardia 'RutaProtegida' */}
<Route element={<RutaProtegida />}>
  <Route
    path="/*"
    element={
      // CAPA 2: Proveedor de Datos (VeterinariaProvider) solo activo cuando el
      // usuario está autenticado
      <VeterinariaProvider>
        <header className="site-header">
          <Navegacion /> {/* ¡El botón de Salida ya vive aquí adentro! */}
        </header> 
        
        <main className="site-main">
          <Routes>
            <Route path="/" element={<Navigate to="/clientes" replace />} />
            <Route path="/clientes" element={<VistaClientes />} />
            <Route path="/cliente/:id" element={<VistaDetalleCliente />} />
            <Route path="/mascotas" element={<VistaMascotas />} />
            <Route path="/config" element={<VistaConfiguracion />} />
            {/* Ruta 404 para URLs no encontradas dentro del panel */}
            <Route
              path="*"
              element={
                <div className="site-not-found">
                  <h2>
                    404 | Página no encontrada
                  </h2>
                </div>
              }
            />
          </Routes>
        </main>
      </VeterinariaProvider>
    }
  />
</Route>
</Routes>
</div>
</ProveedorAutenticacion>
);
}
export default VeterinariaApp;