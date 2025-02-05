import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const DetailLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="author/[author_id]" options={{ headerShown: false }} />
        <Stack.Screen name="book/[book_id]" options={{ headerShown: false }} />
        <Stack.Screen name="narrator/[narrator_id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default DetailLayout;
