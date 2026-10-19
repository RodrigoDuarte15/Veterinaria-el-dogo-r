import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAutenticacion } from "../hooks/useAutenticacion";

function Login() {
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const { iniciarSesion } = useAutenticacion();
  const navegar = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError("");
    setCargando(true);
    const resultado = await iniciarSesion(correoElectronico, password);
    setCargando(false);
    if (resultado.exito) {
      navegar("/clientes");
    } else {
      setMensajeError(resultado.mensaje);
      setPassword("");
    }
  };

  return (
    <div className="login-card">
      <div className="login-content">
        <h2 className="login-heading">Bienvenido a El Dogo</h2>
        <p className="login-description">
          Ingresa tu correo y contraseña para continuar.
        </p>
        {mensajeError && (
          <p className="login-alert" role="alert">{mensajeError}</p>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="correo" className="field-label">
            Correo electrónico
            <input
              id="correo"
              type="email"
              placeholder="admin@email.com"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
              className="field-control"
              required
            />
          </label>
          <label htmlFor="password" className="field-label">
            Contraseña
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field-control"
              required
            />
          </label>
          <button type="submit" disabled={cargando} className="btn-primary">
            {cargando ? "Verificando..." : "Ingresar"}
          </button>
        </form>
      </div>
      <div className="login-footer">
        ¿Olvidaste tu contraseña? Contacta al administrador.
      </div>
    </div>
  );
}

export default Login;
