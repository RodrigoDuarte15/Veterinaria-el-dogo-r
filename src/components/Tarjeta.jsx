// src/components/Tarjeta.jsx
import styles from "./Tarjeta.module.css";
function Tarjeta({ children }) {
  // El componente solo se encarga de aplicar el estilo base
  return <div className={styles.baseTarjeta}>{children}</div>;
}
export default Tarjeta;
