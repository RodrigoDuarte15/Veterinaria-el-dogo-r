import axios from "axios";
const clienteApi = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
// Interceptor: Antes de enviar cualquier petición, adjunta el Token si existe
clienteApi.interceptors.request.use(
  (configuracion) => {
    const tokenGuardado = localStorage.getItem("tokenAcceso");
    if (tokenGuardado) {
      configuracion.headers.Authorization = `Bearer ${tokenGuardado}`;
    }
    return configuracion;
  },
  (error) => Promise.reject(error),
);
export default clienteApi;
