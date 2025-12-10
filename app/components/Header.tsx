import { StyleSheet, Text, View } from "react-native";
import { useAuth, useUser } from "../lib/auth/AuthProvider";
import Button from "./Button";

export default function Header() {
  const { signOut } = useAuth();
  const user = useUser();
  return (
    <View style={styles.headerContainer}>
      <Text>{user.email}</Text>
      <Button onPress={() => signOut()} text="Sign Out" />
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
});
