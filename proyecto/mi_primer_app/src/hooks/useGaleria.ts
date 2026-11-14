import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { pandoraApi } from "../api/pandoraApi";
import { API_URL } from "../api/apiConfig";

export interface ImagenGaleria {
  id_imagen:   number;
  imagen:      string;
  descripcion: string | null;
  fecha:       string;
}

const mensajeError = ( error: any ): string => {
  const msg = error?.response?.data?.message;
  if ( Array.isArray(msg) ) return msg.join('\n');
  if ( msg ) return msg;
  return `No hay conexión con la API (${API_URL}).`;
};

export const useGaleria = () => {

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ imagenes, setImagenes ] = useState<ImagenGaleria[]>([]);
  const [ error, setError ] = useState<string | null>(null);
  const urlApi = `${API_URL}/galeria`;

  const cargar = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await pandoraApi.get<ImagenGaleria[]>( urlApi );
      setImagenes( response.data );
    } catch ( e ) {
      setError( mensajeError(e) );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect( () => {
    cargar();
  }, []);

  const guardar = async ( imagen: string, descripcion: string ) => {
    try {
      const response = await pandoraApi.post<ImagenGaleria>( urlApi, { imagen, descripcion } );
      setImagenes( prev => [ response.data, ...prev ] );
      return true;
    } catch ( e ) {
      Alert.alert('No se pudo guardar la imagen', mensajeError(e));
      return false;
    }
  };

  const eliminar = async ( id_imagen: number ) => {
    try {
      await pandoraApi.delete( `${urlApi}/${id_imagen}` );
      setImagenes( prev => prev.filter( i => i.id_imagen !== id_imagen ) );
    } catch ( e ) {
      Alert.alert('No se pudo eliminar la imagen', mensajeError(e));
    }
  };

  return { isLoading, imagenes, error, cargar, guardar, eliminar };
};
