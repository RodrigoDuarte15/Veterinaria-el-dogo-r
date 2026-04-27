import React, { useState } from "react"; // 1. Agregado useState

function Login({ onLoginExitoso }) {
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