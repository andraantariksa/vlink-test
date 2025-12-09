import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="screens/signin/index"
        options={{ title: "Sign In" }}
      />
      <Stack.Screen name="screens/home/index" options={{ title: "Home" }} />
    </Stack>
  );
}
