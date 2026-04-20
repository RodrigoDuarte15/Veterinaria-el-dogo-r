function MascotaItem({ mascota }) {
  return (
    <li>
      {mascota.nombre} - Especie: {mascota.especie}
    </li>
  );
}

export default MascotaItem;