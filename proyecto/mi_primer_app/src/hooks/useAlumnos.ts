import { useEffect, useState } from "react";
import { pandoraApi } from "../api/pandoraApi";
import { API_URL } from "../api/apiConfig";
import { Alumno } from "../interfaces/pandoraApiRest";

interface UseAlumnos {
  isLoading:    boolean;
  error:        string | null;
  alumnos:      Alumno[];
  loadAlumnos:  () => void;
}

export const useAlumnos = (): UseAlumnos => {

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string | null>(null);
  const [ alumnos, setAlumnos ] = useState<Alumno[]>([]);
  const urlApi = `${API_URL}/alumnos`;

  const loadAlumnos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await pandoraApi.get<Alumno[]>( urlApi, { timeout: 30000 } );
      setAlumnos( response.data );
    } catch ( e ) {
      console.log('No se pudieron cargar los alumnos:', e);
      setError(`No hay conexión con la API (${API_URL}).`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect( () => {
    loadAlumnos();
  },[]);

  return { isLoading, error, alumnos, loadAlumnos };
}
