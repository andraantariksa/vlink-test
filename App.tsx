import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, UserProvider } from "./app/lib/auth/AuthProvider";
import PokemonDetailsScreen from "./app/screens/details";
import HomeScreen from "./app/screens/home";
import SignInScreen from "./app/screens/signin";

export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  PokemonDetails: { name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen name="PokemonDetails" component={PokemonDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ title: "Sign In" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Router() {
  const auth = useAuth();
  const user = auth.user;
  const isSignedIn = user.type === "success" && user.data !== null;

  if (!isSignedIn) {
    return <AuthRouter />;
  }

  return <MainRouter />;
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <UserProvider>
        <Router />
      </UserProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
