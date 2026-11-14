import { useEffect, useState } from "react";
import { pandoraApi } from "../api/pandoraApi";
import { API_URL } from "../api/apiConfig";
import { UserRespose } from "../interfaces/pandoraApiRest";
import { FormUserData } from "./useFormUser";

interface UseUserApi{
  isLoading:  boolean;
  listUser:   UserRespose[];
  loadUsers:  () => void;
  createUser: ( data: FormUserData ) => Promise<void>;
  updateUser: ( data: FormUserData ) => Promise<void>;
  deleteUser: ( data: FormUserData ) => Promise<void>;
}

export const useUserApi = (): UseUserApi => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ listUser, setListUser ] = useState<UserRespose[]>([]);
  const urlApi = `${API_URL}/users`;

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const response = await pandoraApi.get<UserRespose[]>( urlApi );
      setListUser( response.data );
    } catch ( error ) {
      console.log('No se pudo cargar la lista de usuarios:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect( () => {
    loadUsers();
  },[]);

  const createUser = async ( data: FormUserData ) => {
    const dataBody = {
      username: data.username,
      password: data.password,
      email: data.email,
      image: data.image,
      location: data.location || 'Sin ubicación'
    }

    await pandoraApi.post( urlApi, dataBody );

  }

  const updateUser = async ( data: FormUserData ) => {
    if ( data.password ){
      const dataBody = {
        username: data.username,
        password: data.password,
        email: data.email,
        image: data.image,
        location: data.location
      }

      await pandoraApi.patch( `${urlApi}/${data.id_user}`, dataBody );
    }else {
      const dataBody = {
        username: data.username,
        email: data.email,
        image: data.image,
        location: data.location
      }
      await pandoraApi.patch( `${urlApi}/${data.id_user}`, dataBody );
    }

  }

  const deleteUser = async ( data: FormUserData ) => {

    await pandoraApi.delete( `${urlApi}/${data.id_user}`);

  }

  return { isLoading, listUser, loadUsers, createUser, updateUser, deleteUser };
   
}
