import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const PlayerLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="playback" options={{ headerShown: false }} />
      <Stack.Screen name="reader" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PlayerLayout;
