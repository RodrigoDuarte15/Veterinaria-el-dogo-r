import jwt from "jsonwebtoken";

export const verificarTokenAcceso = (peticion, respuesta, siguientePaso) => {
  // El token se suele enviar en la cabecera: "Authorization: Bearer <TOKEN>"
  const cabeceraAutorizacion = peticion.headers["authorization"];
  const tokenExtraido =
    cabeceraAutorizacion && cabeceraAutorizacion.split(" ")[1];
  if (!tokenExtraido) {
    return respuesta.status(401).json({
      mensaje: "Acceso denegado. No se proporcionó un token de autenticación.",
    });
  }
  try {
    // Validar el token usando nuestra clave secreta
    const datosDecodificados = jwt.verify(
      tokenExtraido,
      process.env.CLAVE_SECRETA_JWT,
    );
    // Adjuntamos la información del usuario a la petición para usarla más adelante
    peticion.usuarioAutenticado = datosDecodificados;
    // Le permitimos avanzar al siguiente controlador
    siguientePaso();
  } catch (error) {
    return respuesta
      .status(403)
      .json({ mensaje: "Token no válido o expirado." });
  }
};
