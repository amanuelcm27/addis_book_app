import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "../global.css";
import { setupIcons } from "../constants/icons";
import { SplashScreen, Stack } from "expo-router";
import { useCustomFonts } from "../constants/fonts";
import { AuthProvider, useAuth } from "../context/AuthContext";
import TrackPlayer from "react-native-track-player";
import { PlaybackProvider } from "../context/PlayBackContext";
import MiniPlayer from "./MiniPlayer";

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
    <AuthProvider>
      <PlaybackProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(sidebar)" options={{ headerShown: false }} />
          <Stack.Screen name="(details)" options={{ headerShown: false }} />
          <Stack.Screen name="(players)" options={{ headerShown: false }} />
          <Stack.Screen name="(checkout)" options={{ headerShown: false }} />
        </Stack>
      </PlaybackProvider>
    </AuthProvider>
  );
}
