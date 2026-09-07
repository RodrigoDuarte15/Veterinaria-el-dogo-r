import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rutasClientes from "./src/routes/clientes.routes.js";
import rutasMascotas from "./src/routes/mascotas.routes.js";
import enrutadorAutenticacion from "./src/routes/autenticacion.routes.js";

dotenv.config();

const aplicacion = express();
const puertoServidor = process.env.PORT || 4000;
aplicacion.use(cors());
aplicacion.use(express.json());
// Registro de rutas en la API
aplicacion.use("/api/autenticacion", enrutadorAutenticacion);
aplicacion.use("/api/clientes", rutasClientes);
aplicacion.use("/api/mascotas", rutasMascotas);
aplicacion.listen(puertoServidor, () => {
  console.log(
    `Servidor de "El Dogo" escuchando en http://localhost:${puertoServidor}`,
  );
});
