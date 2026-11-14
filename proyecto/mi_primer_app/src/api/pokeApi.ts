import { pandoraApi } from "./pandoraApi";
import { API_URL } from "./apiConfig";

const SPRITES_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/';

let usarPuente = false;

export const pokeGet = async <T>( url: string ): Promise<T> => {
  if ( !usarPuente ) {
    try {
      const { data } = await pandoraApi.get<T>( url, { timeout: 6000 } );
      return data;
    } catch ( e: any ) {
      if ( e?.response ) throw e;
      usarPuente = true;
      console.log('Sin acceso directo a PokeAPI, usando la API local como puente.');
    }
  }
  const { data } = await pandoraApi.get<T>( `${API_URL}/pokeapi`, { params: { url } } );
  return data;
}

export const spriteUrl = ( path: string ): string =>
  usarPuente
    ? `${API_URL}/pokeapi/sprite?path=${encodeURIComponent(path)}`
    : `${SPRITES_BASE}${path}`;
