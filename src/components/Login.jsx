import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// CAMBIO 1: Importamos nuestro Hook personalizado de Autenticacion
import { useAutenticacion } from '../hooks/useAutenticacion';
function Login() {
    // CAMBIO 2: Ahora manejamos correo electrónico y contraseña
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [password, setPassword] = useState('');
    const PASSWORD_SECRETA = "elDogo2024";

    const manejadorLogin = (e) => {
        e.preventDefault();

        // 2. Simplificación de la lógica (eliminado el if duplicado)
        if (password === PASSWORD_SECRETA) {
            onLoginExitoso(true);
        } else {   
            alert("Contraseña incorrecta. ¡Acceso denegado!");
            setPassword('');
        }
    }; // 3. Cerrada correctamente la función manejador

    return (
        <div className="login-container">
            <h2>Verificación de Usuario</h2>
            <p>Ingresa tu clave para acceder a la gestión de Clientes y Mascotas.</p>

            <form onSubmit={manejadorLogin}>
                <input
                    type="password"
                    placeholder="contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
} // 4. Cerrado correctamente el componente

export default Login; // 5. Corregido: Capitalización (Login con L mayúscula)