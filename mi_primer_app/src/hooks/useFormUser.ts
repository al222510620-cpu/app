import { useReducer } from "react";
import { Alert } from "react-native";
import { useUserApi } from "./useUserApi";

export interface FormUserData {
  id_user:    number;
  username:   string;
  email:      string;
  password:   string;
  image:      string;
  location:   string;
}

interface UseFormUser {
  state: FormUserData;
  handleInputChange: ( fieldName: keyof FormUserData, value: string | number ) => void;
  handleSubmit: () => Promise<boolean>;
  handleDelete: () => Promise<boolean>;
}

export const useFormUser = (): UseFormUser => {

  const initialForm: FormUserData = {
    id_user:    0,
    username:   '',
    email:      '',
    password:   '',
    image:      '',
    location:   ''
  }
  
  type Action = { type: 'handleInputChange', payload: { fieldName: keyof FormUserData, value: string | number } };

  const formReducer = (state: FormUserData, action: Action) => {
    switch( action.type ){
      case 'handleInputChange':
        return {
          ...state,
          [ action.payload.fieldName ] : action.payload.value
      }
    }
  }

  const [ state, dispatch ] = useReducer( formReducer, initialForm);
  const { createUser, updateUser, deleteUser } = useUserApi();

  const handleInputChange = ( fieldName: keyof FormUserData, value: string | number ) => {
    dispatch({ type: 'handleInputChange', payload:{ fieldName, value } });
  }

  const mostrarError = ( titulo: string, error: any ) => {
    const msg = error?.response?.data?.message;
    Alert.alert(
      titulo,
      Array.isArray(msg) ? msg.join('\n') : ( msg ?? 'Revisa que la API esté encendida.' )
    );
  }

  const handleSubmit = async () => {
    try {
      if( state.id_user == 0 ){
        await createUser( state );
        Alert.alert('Listo', 'Entrenadora registrada. Ya puedes iniciar sesión.');
      }else {
        await updateUser( state );
        Alert.alert('Listo', 'Datos actualizados.');
      }
      return true;
    } catch ( error: any ) {
      mostrarError('No se pudo guardar', error);
      return false;
    }
  }

  const handleDelete = async () => {
    try {
      await deleteUser(state);
      return true;
    } catch ( error: any ) {
      mostrarError('No se pudo eliminar', error);
      return false;
    }
  }

  return { state, handleInputChange, handleSubmit, handleDelete };

}
