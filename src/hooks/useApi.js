// src/hooks/useApi.js
import { useCallback } from "react";
import api from "../api/axios";
// Hook personalizado para envolver las llamadas a la API
export const useApi = (endpoint) => {
  // Función genérica GET
  const get = useCallback(async (id = "") => {
    try {
      const url = id ? `${endpoint}/${id}` : endpoint;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener ${endpoint}:`, error);
      throw error; // Lanzamos el error para que el Provider lo maneje
    }
  }, [endpoint]);
  // Función genérica POST
  const create = useCallback(async (data) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Error al crear ${endpoint}:`, error);
      throw error;
    }
  }, [endpoint]);
  // Función genérica PUT
  const update = useCallback(async (id, data) => {
    try {
      const response = await api.put(`${endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar ${endpoint}:`, error);
      throw error;
    }
  }, [endpoint]);
  // Función genérica DELETE
  const remove = useCallback(async (id) => {
    try {
      await api.delete(`${endpoint}/${id}`);
    } catch (error) {
      console.error(`Error al eliminar ${endpoint}:`, error);
      throw error;
    }
  }, [endpoint]);
  return { get, create, update, remove };
};
