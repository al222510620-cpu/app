import { useState, useEffect } from "react";
import { PokemonDetailResponse } from "../interfaces/pokemonResponse";
import { pokeGet } from "../api/pokeApi";

interface UseDetailPokemon {
  isLoading: boolean;
  detailPokemon: PokemonDetailResponse;
}

export const useDetailPokemon = ( id: string | number ): UseDetailPokemon => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ detailPokemon, setDetailPokemon ] = useState<PokemonDetailResponse>({} as PokemonDetailResponse);

  const loadPokemon = async () => {
    setIsLoading(true);
    try {
      const data = await pokeGet<PokemonDetailResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setDetailPokemon(data);
    } catch (e) {
      console.log(`No se pudo cargar el detalle del Pokémon ${id}:`, e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect( () => {
    loadPokemon();
  },[]);

  return { isLoading, detailPokemon };
}