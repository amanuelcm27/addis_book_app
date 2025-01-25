import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "../global.css";
import { setupIcons } from "../utils/icons";
import { SplashScreen, Stack } from "expo-router";
import { useCustomFonts } from "../utils/fonts";

setupIcons();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, error] = useCustomFonts();
  useEffect(() => {
    if (error) {
      throw error;
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(sidebar)" options={{ headerShown: false }} />
        <Stack.Screen name="(details)" options={{ headerShown: false }} />
        <Stack.Screen name="(checkout)" options={{headerShown:false}}/>
        
      </Stack>
    </>
  );
}
