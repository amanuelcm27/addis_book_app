import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const BackButton = () => {
  return (
    <View className="flex-row flex-wrap  my-4 mx-4">
      <TouchableOpacity
        className="p-4 w-full items-center justify-center"
        style={{
          borderRadius: 50,
          backgroundColor: "white",
          shadowColor: "black",
          shadowOffset: { width: 5, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 5,
        }}
        onPress={() => router.back()}
      >
        <Text className="font-primaryBlack text-xl text-center">Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
