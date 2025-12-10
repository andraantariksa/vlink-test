import axios from "axios";
import { useFetch } from "../hooks/useFetch";

export const usePokemonList = () =>
  useFetch<PokemonListResponse>(async () => {
    const response = await axios("https://pokeapi.co/api/v2/pokemon");
    return response.data;
  });

export const getPokemonImageUrl = (pokemon: PokemonResponse) => {
  const urlSegments = pokemon.url.split("/");
  const slug = urlSegments[Math.max(urlSegments.length - 2, 0)];
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${slug}.png`;
};

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<PokemonResponse>;
}

export interface PokemonResponse {
  name: string;
  url: string;
}
