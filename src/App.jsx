// src/App.jsx
import { useState } from 'react';
import FormularioCliente from './components/FormularioCliente'; // Importamos el componente del formulario
import FormularioMascota from './components/FormularioMascota';
import ClienteItem from './components/Clienteitem'; // Importamos el componente para mostrar cada cliente
import MascotaItem from './components/Mascotaitem';
import './App.css'; // Asume que tienes un archivo CSS para estilos
// 1. Definimos nuestro componente principal
// Es una función que, por convención, empieza con Mayúscula.
function App() {
  // 2. Aquí dentro va la lógica de JavaScript (aún simple)
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Juan Pérez', telefono: '1123456789' },
    { id: 2, nombre: 'Ana Gómez', telefono: '11987654321' }
  ]);
  const [mascotas, setMascotas] = useState([
    { id: 1, nombre: 'Tobi', especie: 'Perro' },
    { id: 2, nombre: 'Oliver', especie: 'Gato' }
  ]); // Estado para clientes
  const nombreApp = "El Dogo - Gestión de Pacientes";
  // 3. El componente DEBE devolver el JSX (lo que se va a ver en pantalla) }

  const agregarCliente = (nuevoCliente) => {
    setClientes([...clientes, nuevoCliente]);

  const eliminarCliente = (clienteId) => {
    const listaActualizada = clientes.filter(cliente => 
      cliente.id !== clienteId);

    setClientes(listaActualizada);
  };

  
  const agregarMascota = (nuevaMascota) => {
    setMascotas([...mascotas, nuevaMascota]);

  };
  
  return (
    <div>
      {/* Esto es JSX. Parece HTML, ¡pero nos permite meter variables de JS!
Para ello, usamos llaves { }
*/}
      <h1>{nombreApp}</h1>
      <p>¡Bienvenido! Acá gestionarás a tus Clientes y Mascotas.</p>

      <p>Total de clientes registrados: ** {clientes.length} **</p>
      <p>Total de mascotas registrados: ** {mascotas.length} **</p>

      <section>
        {/* Placeholder para Clientes y Mascotas */}
        <h2>Gestión de Clientes</h2>
        <h2>Gestión de Mascotas</h2>
      </section>
      <hr />
      <h2>Clientes Actuales</h2>
      <FormularioCliente onClienteAgregado={agregarCliente} />
      <ul>
        {clientes.map((cliente) => (
          <ClienteItem key={cliente.id} 
          cliente={cliente}
          onEliminar={eliminarCliente}/>
        ))}
      </ul>
      <hr />
      <h2>Mascotas Actuales</h2>
      <FormularioMascota onMascotaAgregada={agregarMascota} />
      <ul>
        {mascotas.map((mascota) => (
          <MascotaItem key={mascota.id} mascota={mascota} />
        ))
        }
      </ul>
    </div>
  );
}
// 4. Exportamos el componente para poder usarlo en otro lugar (generalmente index.js)
export default App;