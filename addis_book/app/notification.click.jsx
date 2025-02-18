import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";

const notification = () => {
  useEffect(() => {
    router.back();
  }, []);

  return null;
};

export default notification;
