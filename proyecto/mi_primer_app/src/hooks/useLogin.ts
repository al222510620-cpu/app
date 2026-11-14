import { useReducer, useState, useContext } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { RequestLogin } from "../interfaces/pandoraApiRest";
import { pandoraApi } from "../api/pandoraApi";
import { API_URL } from "../api/apiConfig";

export interface LoginData {
  email: string;
  password: string;
}

interface UseLogin {
  isLoading:          boolean;
  state:              LoginData;
  handleLogin:        () => Promise<void>;
  handleInputChange:  ( fieldName: keyof LoginData, value: string ) => void;
  request:            RequestLogin;
}

export const useLogin = (): UseLogin => {

  const initialState: LoginData = {
    email: '',
    password: ''
  }

  type Action = { type: 'handleInputChange', payload: { fieldName: keyof LoginData, value: string }  };

  const dataReducer = ( state: LoginData, action: Action ) => {
    switch ( action.type ){
      case 'handleInputChange':{
        return {
          ...state,
          [ action.payload.fieldName ]: action.payload.value
        }
      }
    }
  }

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ state, dispatch ] = useReducer( dataReducer, initialState );
  const [ request, setRequest ] = useState<RequestLogin>({} as RequestLogin);
  const { singIn, changeAvatar, chageUsername } = useContext( AuthContext );

  const apiUrl: string = `${API_URL}/users/login`;

  const handleInputChange = ( fieldName: keyof LoginData, value: string ) => {
    dispatch({ type:'handleInputChange', payload: { fieldName, value } });
  }

  const handleLogin = async () => {
    setIsLoading(true);
    const dataBody = {
      email: state.email,
      password: state.password
    }

    if ( !state.email || !state.password ) {
      Alert.alert('Faltan datos', 'Escribe tu correo y tu contraseña.');
      setIsLoading(false);
      return;
    }

    try{
      const response = await pandoraApi.post<RequestLogin>(apiUrl,dataBody);
      setRequest(response.data);

      if ( response.data ) {
        singIn();
        response.data.username && chageUsername(response.data.username);
        response.data.image && changeAvatar(response.data.image);
      } else {
        Alert.alert('No se pudo entrar', 'Correo o contraseña incorrectos.');
      }

    } catch (error: any){
      console.log('Error,', error)
      setRequest(false);
      const msg = error?.response?.data?.message;
      Alert.alert(
        'No se pudo entrar',
        error?.response
          ? ( Array.isArray(msg) ? msg.join('\n') : ( msg ?? 'Correo o contraseña incorrectos.' ) )
          : `No hay conexión con la API (${API_URL}). Revisa que esté encendida y que el celular esté en la misma red Wi-Fi.`
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, state, handleLogin, handleInputChange, request };

}
