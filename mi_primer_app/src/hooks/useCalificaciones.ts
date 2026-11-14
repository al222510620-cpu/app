import { useEffect, useState } from "react";
import { pandoraApi } from "../api/pandoraApi";
import { API_URL } from "../api/apiConfig";
import { Calificacion, EjerciciosCalificaciones } from "../interfaces/pandoraApiRest";

interface UseCalificaciones {
  isLoading:          boolean;
  error:              string | null;
  calificaciones:     Calificacion[];
  ejercicios:         EjerciciosCalificaciones | null;
  loadCalificaciones: () => void;
}

export const useCalificaciones = (): UseCalificaciones => {

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<string | null>(null);
  const [ calificaciones, setCalificaciones ] = useState<Calificacion[]>([]);
  const [ ejercicios, setEjercicios ] = useState<EjerciciosCalificaciones | null>(null);
  const urlApi = `${API_URL}/calificaciones`;

  const loadCalificaciones = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [ lista, consultas ] = await Promise.all([
        pandoraApi.get<Calificacion[]>( urlApi ),
        pandoraApi.get<EjerciciosCalificaciones>( `${urlApi}/consultas/ejercicios` ),
      ]);
      setCalificaciones( lista.data );
      setEjercicios( consultas.data );
    } catch ( e ) {
      console.log('No se pudieron cargar las calificaciones:', e);
      setError(`No hay conexión con la API (${API_URL}).`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect( () => {
    loadCalificaciones();
  },[]);

  return { isLoading, error, calificaciones, ejercicios, loadCalificaciones };
}
