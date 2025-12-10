import { useAuth } from "@/app/lib/auth/AuthProvider";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
