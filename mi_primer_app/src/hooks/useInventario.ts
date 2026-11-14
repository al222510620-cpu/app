import { useState } from "react";
import { Alert } from "react-native";
import { pandoraApi } from "../api/pandoraApi";
import { API_URL } from "../api/apiConfig";
import { Equipo } from "../interfaces/pandoraApiRest";

export type EquipoForm = Omit<Equipo, 'id_inventario'>;

interface UseInventario {
  isLoading:      boolean;
  error:          string | null;
  equipos:        Equipo[];
  loadInventario: () => Promise<void>;
  crear:          ( data: EquipoForm ) => Promise<boolean>;
  actualizar:     ( id: number, data: EquipoForm ) => Promise<boolean>;
  eliminar:       ( id: number ) => Promise<boolean>;
}

const mensajeError = ( error: any ): string => {
  const msg = error?.response?.data?.message;
  if ( Array.isArray(msg) ) return msg.join('\n');
  if ( msg ) return msg;
  return `No hay conexión con la API (${API_URL}).`;
};

export const useInventario = (): UseInventario => {

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string | null>(null);
  const [ equipos, setEquipos ] = useState<Equipo[]>([]);
  const urlApi = `${API_URL}/inventario`;

  const loadInventario = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await pandoraApi.get<Equipo[]>( urlApi );
      setEquipos( response.data );
    } catch ( e ) {
      console.log('No se pudo cargar el inventario:', e);
      setError( mensajeError(e) );
    } finally {
      setIsLoading(false);
    }
  }

  const crear = async ( data: EquipoForm ) => {
    try {
      await pandoraApi.post( urlApi, data );
      return true;
    } catch ( e ) {
      Alert.alert('No se pudo registrar el equipo', mensajeError(e));
      return false;
    }
  }

  const actualizar = async ( id: number, data: EquipoForm ) => {
    try {
      await pandoraApi.patch( `${urlApi}/${id}`, data );
      return true;
    } catch ( e ) {
      Alert.alert('No se pudo actualizar el equipo', mensajeError(e));
      return false;
    }
  }

  const eliminar = async ( id: number ) => {
    try {
      await pandoraApi.delete( `${urlApi}/${id}` );
      return true;
    } catch ( e ) {
      Alert.alert('No se pudo eliminar el equipo', mensajeError(e));
      return false;
    }
  }

  return { isLoading, error, equipos, loadInventario, crear, actualizar, eliminar };
}
