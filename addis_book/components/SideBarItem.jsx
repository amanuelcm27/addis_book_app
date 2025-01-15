import { View, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const SideBarItem = () => {
  return (
    <View className="flex-row items-center my-2 p-6 border-2 rounded-full">
      <Text className="px-4 font-primaryBlack text-xl">Account</Text>
    </View>
  );
};

export default SideBarItem;
