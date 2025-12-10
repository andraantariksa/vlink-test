import useSplashScreen from "@/app/hooks/useSplashScreen";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { State } from "../../utils/state";
import * as firebase from "./firebase";

interface Auth {
  user: State<firebase.StoredAuth | null>;
  signInWithEmail(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
}

export const AuthContext = createContext<Auth>({
  user: {
    type: "loading",
  },
  signInWithEmail: async (email, password) => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const useUser = () => {
  const auth = useContext(AuthContext);

  const user = auth.user;
  if (user.type !== "success") throw new Error("User not loaded yet");
  if (user.data === null) throw new Error("No user logged in");
  return user.data;
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<State<firebase.StoredAuth | null>>({
    type: "loading",
  });

  const checkAuth = useCallback(async () => {
    try {
      const auth = await firebase.getValidAuth();
      setUser({ type: "success", data: auth });
    } catch (error) {
      setUser({ type: "success", data: null });
    }
  }, []);

  const signOut = useCallback(async () => {
    await firebase.signOut();
    setUser({ type: "success", data: null });
  }, []);

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      setUser({ type: "loading" });
      try {
        const data = await firebase.signInWithEmail(email, password);
        setUser({ type: "success", data });
      } catch (error) {
        setUser({ type: "success", data: null });
      }
    },
    [],
  );

  useEffect(() => {
    checkAuth();

    const interval = setInterval(checkAuth, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [checkAuth]);

  useSplashScreen(user.type === "loading");

  return (
    <AuthContext.Provider value={{ user, signInWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
