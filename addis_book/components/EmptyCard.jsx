import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";

const EmptyCard = ({ text, buttonText , goto}) => {
  return (
    <View className=" items-center justify-center p-4 h-full">
      <FontAwesomeIcon icon="fa-magnifying-glass" size={46} color="#FF9100" />
      <Text className="font-primaryBoldItalic my-4"> {text} </Text>
      <TouchableOpacity
        onPress={() => router.push(goto)}
        activeOpacity={0.5}
        className="p-4 border w-full rounded-lg items-center"
      >
        <Text className='font-primaryBold'> {buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyCard;
