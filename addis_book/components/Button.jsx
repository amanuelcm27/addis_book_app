import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const Button = ({ onClick, text, isLoading }) => {
  return (
    <View className="my-8 mx-4">
      <TouchableOpacity
        onPress={!isLoading && onClick}
        disabled={isLoading}
        className={`${
       "bg-white"
        } p-6 rounded-full mt-4 w-full shadow-lg shadow-black `}
      >
        {isLoading ? (
          <Text className="text-black text-4xl text-center font-primaryBlackItalic">
            <ActivityIndicator size="large" color="#FF9100" />
          </Text>
        ) : (
          <Text className="text-black text-4xl text-center font-primaryBlackItalic">
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Button;
