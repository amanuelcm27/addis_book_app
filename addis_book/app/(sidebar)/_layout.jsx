import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RootSideBar = () => {
  return (
    <Stack >
      <Stack.Screen name="authors" options={{ headerShown: false }} />
      <Stack.Screen name="aboutus" options={{ headerShown: false }} />
      <Stack.Screen name="narrators" options={{ headerShown: false }} />
      <Stack.Screen name="faq" options={{ headerShown: false }} />
      <Stack.Screen name="contact" options={{ headerShown: false }} />
      <Stack.Screen name="terms" options={{ headerShown: false }} />
      <Stack.Screen name="support" options={{ headerShown: false }} />

    </Stack>
  );
};

export default RootSideBar;
