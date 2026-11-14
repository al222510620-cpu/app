import { useState, useRef, useEffect } from "react";
import { pokeGet, spriteUrl } from "../api/pokeApi";
import { PokedexReponse, Result, NewPokemon } from "../interfaces/pokemonResponse";

export const usePokemonPaginated = () => {

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ pokemonList, setPokemonList ] = useState<NewPokemon[]>([]);
  const [ error, setError ] = useState<string | null>(null);

  const nextUrl = useRef< string|null >("https://pokeapi.co/api/v2/pokemon");
  const loading = useRef<boolean>(false);

  const loadPokemon = async () => {

    if (loading.current || !nextUrl.current) return;

    loading.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const data = await pokeGet<PokedexReponse>(nextUrl.current);

      nextUrl.current = data.next;

      newPokemonList( data.results );
    } catch (e) {
      console.log('No se pudo cargar la Pokédex:', e);
      setError('No se pudo cargar la Pokédex. Revisa que la API esté encendida.');
    } finally {
      loading.current = false;
      setIsLoading(false);
    }

  }

  const newPokemonList = ( data: Result[] ) => {
  
    const newList = data.map( ({ name, url }) =>{
      // https://pokeapi.co/api/v2/pokemon/1/ asasss
      const urlParts = url.split('/');
      const id = urlParts[ urlParts.length - 2 ];
      const image = spriteUrl(`sprites/pokemon/other/official-artwork/${id}.png`);
      return { id, name, url, image };
    });

    setPokemonList( (prev) =>  (prev?.length == 0) ? [...newList] : [...prev, ...newList]);

  }

  useEffect(() => {
    loadPokemon();
  },[]);

  return { isLoading, pokemonList, loadPokemon, error };

}


