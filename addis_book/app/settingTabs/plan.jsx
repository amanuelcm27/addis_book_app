import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import images from "../../constants/images";
import shadowStyles from "../../utils/shadowStyles";

const plan = () => {
  return (
    <View className="mx-4 my-4">
      <Text className="font-primaryBlack text-2xl">Your Current Plan</Text>

      <View className="bg-primary rounded-lg p-4 my-4">
        <Text className="font-primaryRegular text-white">Your plan</Text>
        <View className="flex-row items-center">
          <Image source={images.logo} className="w-24 h-24" />
          <View className="">
            <Text className="text-white">Premium plan</Text>
            <TouchableOpacity>
              <Text className="text-white font-primaryBlack text-2xl">
                Change plan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        className="bg-white border-2 border-black rounded-lg p-4 w-1/2 "
        style={shadowStyles.shadow}
      >
        <Text className="text-center font-primaryBold">Update Plan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default plan;
