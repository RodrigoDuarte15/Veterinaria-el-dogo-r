import { useContext } from "react";
import { ContextoAutenticacion } from "../context/AutenticacionContexto";
export const useAutenticacion = () => {
  const contexto = useContext(ContextoAutenticacion);
  if (!contexto) {
    throw new Error(
      "useAutenticacion debe usarse dentro de un ProveedorAutenticacion",
    );
  }
  return contexto;
};
