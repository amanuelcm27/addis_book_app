import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import "../global.css";
import { setupIcons } from "../utils/icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { SplashScreen } from "expo-router";
import { useCustomFonts } from "../utils/fonts"

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
    <View className="items-center  justify-center h-full bg-orange-400">
      <Text className="text-white text-6xl font-primaryBlackItalic text-center ">
        Open 
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
