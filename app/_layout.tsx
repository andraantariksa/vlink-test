import { Stack } from "expo-router";
import { useAuth, UserProvider } from "./lib/auth/AuthProvider";

function Routes() {
  const auth = useAuth();
  const user = auth.user;
  const isSignedIn = user.type === "success" && user.data !== null;

  return (
    <Stack>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen
          name="screens/signin/index"
          options={{ title: "Sign In" }}
        />
      </Stack.Protected>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="screens/home/index" options={{ title: "Home" }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}
