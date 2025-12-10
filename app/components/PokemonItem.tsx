import { Image, Text, TouchableOpacity } from "react-native";
import { getPokemonImageUrl, PokemonResponse } from "../lib/pokemon";

type PokemonItemProps = {
  pokemon: PokemonResponse;
};

export default function PokemonItem({ pokemon }: PokemonItemProps) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingVertical: 16,
      }}
    >
      <Image
        source={{
          uri: getPokemonImageUrl(pokemon),
        }}
        style={{ width: 100, height: 100 }}
      />
      <Text>{pokemon.name}</Text>
    </TouchableOpacity>
  );
}
