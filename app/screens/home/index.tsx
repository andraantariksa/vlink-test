import Button from "@/app/components/Button";
import PokemonItem from "@/app/components/PokemonItem";
import { useAuth, useUser } from "@/app/lib/auth/AuthProvider";
import { usePokemonList as usePokemons } from "@/app/lib/pokemon";
import { getErrorMessage } from "@/app/utils/state";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const user = useUser();
  const { result, refresh } = usePokemons();

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text>{user.email}</Text>
        <Button onPress={() => signOut()} text="Sign Out" />
      </View>
      {result.type === "error" && <Text>{getErrorMessage(result.error)}</Text>}
      <FlatList
        numColumns={2}
        style={styles.flatList}
        refreshing={result.type === "loading"}
        onRefresh={refresh}
        data={result.data?.results ?? []}
        keyExtractor={(item) => item.name}
        columnWrapperStyle={styles.flatListItemStyle}
        contentContainerStyle={styles.flatListItemStyle}
        renderItem={({ item }) => <PokemonItem pokemon={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 16,
  },
  flatListItemStyle: {
    gap: 8,
  },
  flatList: {
    marginHorizontal: 16,
  },
});
