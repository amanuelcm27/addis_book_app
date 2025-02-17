import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const ReaderHeader = ({ title , setMenuVisible }) => {
  return (
    <View className="flex-row items-center p-4 bg-[#FF9100]">
      <TouchableOpacity onPress={() => router.back()}>
        <FontAwesomeIcon icon="fa-angle-left" color="white" size={26} />
      </TouchableOpacity>
      <Text
        className="flex-1 text-center text-white text-lg font-primaryLight"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Ionicons name="ellipsis-vertical" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ReaderHeader;
