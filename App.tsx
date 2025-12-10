import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth, UserProvider } from "./app/lib/auth/AuthProvider";
import HomeScreen from "./app/screens/home";
import SignInScreen from "./app/screens/signin";

export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AuthRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
    <UserProvider>
      <Router />
    </UserProvider>
  );
}
