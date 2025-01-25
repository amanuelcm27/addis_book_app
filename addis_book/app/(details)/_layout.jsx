import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const DetailLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="author" options={{ headerShown: false }} />
        <Stack.Screen name="book" options={{ headerShown: false }} />
        <Stack.Screen name="narrator" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default DetailLayout;
