import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../hooks/useAutenticacion';

function Navegacion() {
  const navegar = useNavigate();
  const { usuarioActual, cerrarSesion } = useAutenticacion();

  const manejarCierreSesion = () => {
    cerrarSesion();
    navegar('/login');
  };

  return (
    <nav aria-label="Navegación principal" className="site-nav">
      <Link to="/clientes" className="brand">El Dogo</Link>
      <div className="nav-links">
        <NavLink
          to="/clientes"
          className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
        >
          Clientes
        </NavLink>
        <NavLink
          to="/mascotas"
          className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
        >
          Mascotas
        </NavLink>
        <NavLink
          to="/config"
          className={({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`}
        >
          Configuración
        </NavLink>
      </div>
      <div className="nav-user">
        <span>{usuarioActual?.correoElectronico || usuarioActual?.email || 'Sesión iniciada'}</span>
        <button type="button" onClick={manejarCierreSesion} className="btn-secondary">
          Salir
        </button>
      </div>
    </nav>
  );
}

export default Navegacion;
