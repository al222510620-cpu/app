import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { pandoraApi } from "../api/pandoraApi";
import { API_URL } from "../api/apiConfig";
import { FormState } from "./useForm";

export interface RegistroFormulario {
  id_formulario: number;
  username:      string;
  edad:          number;
  estado_civil:  string;
  fecha:         string;
}

const mensajeError = ( error: any ): string => {
  const msg = error?.response?.data?.message;
  if ( Array.isArray(msg) ) return msg.join('\n');
  if ( msg ) return msg;
  return `No hay conexión con la API (${API_URL}).`;
};

export const useFormularios = () => {

  const [ registros, setRegistros ] = useState<RegistroFormulario[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const urlApi = `${API_URL}/formularios`;

  const cargar = async () => {
    setIsLoading(true);
    try {
      const response = await pandoraApi.get<RegistroFormulario[]>( urlApi );
      setRegistros( response.data );
    } catch ( e ) {
      console.log('No se pudieron cargar los registros:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect( () => {
    cargar();
  }, []);

  const guardar = async ( datos: FormState ) => {
    const faltan = [
      !datos.username.trim() && 'Nombre',
      !datos.password && 'Contraseña',
      !datos.age.trim() && 'Edad',
      !datos.stateCivil.trim() && 'Estado civil',
    ].filter(Boolean);
    if ( faltan.length ) {
      Alert.alert('Faltan datos', faltan.join('\n'));
      return false;
    }
    const edad = Number(datos.age);
    if ( !Number.isInteger(edad) ) {
      Alert.alert('Edad no válida', 'Escribe la edad con números, por ejemplo 21.');
      return false;
    }
    try {
      const response = await pandoraApi.post<RegistroFormulario>( urlApi, {
        username: datos.username,
        password: datos.password,
        edad,
        estado_civil: datos.stateCivil,
      });
      setRegistros( prev => [ response.data, ...prev ] );
      return true;
    } catch ( e ) {
      Alert.alert('No se pudo guardar', mensajeError(e));
      return false;
    }
  };

  const eliminar = async ( id_formulario: number ) => {
    try {
      await pandoraApi.delete( `${urlApi}/${id_formulario}` );
      setRegistros( prev => prev.filter( r => r.id_formulario !== id_formulario ) );
    } catch ( e ) {
      Alert.alert('No se pudo eliminar', mensajeError(e));
    }
  };

  return { registros, isLoading, cargar, guardar, eliminar };
};
