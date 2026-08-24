import axios from 'axios';
// Creamos una instancia de Axios con la Base URL de nuestro backend
const api = axios.create({
baseURL: 'http://localhost:4000/api', // Asegúrate de que el puerto coincida con tu Express
headers: {
'Content-Type': 'application/json',
},
// Opcional: para manejar credenciales/cookies si fuera necesario
// withCredentials: true,
});
export default api;