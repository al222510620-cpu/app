import { useEffect, useState } from "react";
import { pandoraApi } from "../api/pandoraApi";
import { API_URL } from "../api/apiConfig";
import { DataResponse } from "../interfaces/pandoraApiRest";

interface UseDataResponse{
  data: DataResponse | undefined;
  isLoading: boolean;
  loadData: () => void;
}

export const useDataResponse = (): UseDataResponse => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ data, setData ] = useState<DataResponse>();
  const urlApi = `${API_URL}/sensors/consultas/data`;

  const loadData = async () => {
    setIsLoading(true);
    const response = await pandoraApi.get<DataResponse>( urlApi );
    setData( response.data );
    setIsLoading(false);
  }

  useEffect( () => {
    loadData();
  },[]);

  return { isLoading, data, loadData };
   
}
