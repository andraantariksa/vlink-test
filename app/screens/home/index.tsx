import Header from "@/app/components/Header";
import PokemonItem from "@/app/components/PokemonItem";
import { usePokemonList as usePokemons } from "@/app/lib/pokemon";
import { colors } from "@/app/theme/colors";
import type { RootStackScreenProps } from "@/app/types/navigation";
import { getErrorMessage } from "@/app/utils/state";
import { useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = RootStackScreenProps<"Home">;

export default function HomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { result, refresh } = usePokemons();

  const onPress = useCallback(
    (pokemon: { name: string }) => {
      navigation.navigate("PokemonDetails", { name: pokemon.name });
    },
    [navigation],
  );

  return (
    <View style={[{ paddingBottom: insets.bottom }, styles.container]}>
      <Header />
      {result.type === "error" && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>
            {getErrorMessage(result.error)}
          </Text>
        </View>
      )}
      <FlatList
        numColumns={2}
        style={styles.flatList}
        refreshing={result.type === "loading"}
        onRefresh={refresh}
        data={result.data?.results ?? []}
        keyExtractor={(item) => item.name}
        columnWrapperStyle={styles.flatListColumnWrapper}
        contentContainerStyle={styles.flatListContentContainer}
        renderItem={({ item }) => (
          <PokemonItem pokemon={item} onPress={onPress} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatListColumnWrapper: {
    gap: 8,
  },
  flatListContentContainer: {
    gap: 8,
    paddingBottom: 8,
  },
  flatList: {
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
  },
  errorMessage: {
    color: colors.error,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
