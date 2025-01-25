import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const CheckoutLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="checkout" options={{ headerShown: false }} />
        <Stack.Screen name="subscription" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default CheckoutLayout;
