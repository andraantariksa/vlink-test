import Header from "@/app/components/Header";
import { usePokemonDetails } from "@/app/lib/pokemon";
import { colors } from "@/app/theme/colors";
import type { RootStackScreenProps } from "@/app/types/navigation";
import { getErrorMessage } from "@/app/utils/state";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = RootStackScreenProps<"PokemonDetails">;

export default function PokemonDetailsScreen({ route }: Props) {
  const insets = useSafeAreaInsets();

  const { result } = usePokemonDetails(route.params.name);

  if (result.type === "loading") {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (result.type === "error") {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorMessage}>{getErrorMessage(result.error)}</Text>
      </View>
    );
  }

  const pokemon = result.data;
  const abilities = pokemon.abilities
    .map((ability) => ability.ability.name)
    .join(", ");
  const moves = pokemon.moves.map((move) => move.move.name).join(", ");

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        style={styles.contentContainer}
      >
        <View style={styles.sectionCard}>
          <Image
            source={{ uri: pokemon.sprites.front_default ?? undefined }}
            style={styles.image}
          />
          <Text style={styles.title}>{`#${pokemon.id}`}</Text>
          <Text style={styles.title}>{pokemon.name}</Text>
        </View>
        <View style={styles.sectionCard}>
          <Text style={styles.label}>Stats</Text>
          {pokemon.stats.map((stat) => {
            return (
              <Text
                style={styles.value}
              >{`${stat.stat.name}: ${stat.base_stat}`}</Text>
            );
          })}
        </View>
        <View style={styles.sectionCard}>
          <Text style={styles.label}>Abilities</Text>
          <Text style={styles.value}>{abilities}</Text>
        </View>
        <View style={styles.sectionCard}>
          <Text style={styles.label}>Moves: </Text>
          <Text style={styles.value}>{moves}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 300, height: 300 },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "700",
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    fontWeight: "400",
  },
  sectionCard: {
    marginHorizontal: 16,
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.background,
  },
  errorMessage: {
    color: colors.error,
    fontSize: 16,
  },
});
