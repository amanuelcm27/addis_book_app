import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const CustomButton = ({
  onClick,
  text,
  isLoading,
  textColor = "text-black",
  background = "bg-white",
}) => {
  return (
    <View className="my-8 mx-4">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={!isLoading && onClick}
        disabled={isLoading}
        className={`${background} p-4 rounded-full mt-4 w-full shadow-lg shadow-black `}
      >
        {isLoading ? (
          <Text className="text-black text-2xl text-center font-primaryBlackItalic">
            <ActivityIndicator size="large" color="#FF9100" />
          </Text>
        ) : (
          <Text className={` ${textColor} text-2xl text-center font-primaryBlackItalic `}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
