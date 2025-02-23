import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { usePlayback } from "../context/PlayBackContext";
const notification = () => {
  const { setIsVisible   } = usePlayback()
   useEffect(() => {
    setIsVisible(true)
    router.back();
  }, []);

  return null;
};

export default notification;
