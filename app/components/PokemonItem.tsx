import { Image, Text, TouchableOpacity } from "react-native";
import { getPokemonImageUrl, NamedApiResource } from "../lib/pokemon";

type PokemonItemProps = {
  pokemon: NamedApiResource;
  onPress: (pokemon: NamedApiResource) => void;
};

export default function PokemonItem({ pokemon, onPress }: PokemonItemProps) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        paddingVertical: 16,
      }}
      onPress={() => onPress(pokemon)}
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
