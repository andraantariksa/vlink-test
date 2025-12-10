import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function useSplashScreen(cond: boolean) {
  useEffect(() => {
    if (cond) return;
    SplashScreen.hide();
  }, [cond]);

  return undefined;
}
