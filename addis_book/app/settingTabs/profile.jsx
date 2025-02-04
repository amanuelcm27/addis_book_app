import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import images from "../../constants/images";


const profile = () => {
  return (
    <View className="mx-4 my-4">
      <Text className="font-primaryBlack text-2xl">Account details</Text>
      <View>
        <View className="flex flex-row justify-between my-4">
          <Text className="font-primaryRegular">Name</Text>
          <Text className="font-primaryRegular">John Doe</Text>
        </View>
        <View className="flex flex-row justify-between my-4">
          <Text className="font-primaryRegular">Email</Text>
          <Text className="font-primaryRegular">john@gmail.com</Text>
        </View>
      </View>
      <View className="bg-black rounded-lg p-4 my-4">
        <Text className="font-primaryRegular text-white">Your plan</Text>
        <View className="flex-row items-center">
          <Image source={images.logo} className="w-24 h-24" />
          <View className="">
            <Text className="text-white">Free plan</Text>
            <TouchableOpacity>
              <Text className="text-white font-primaryBlack text-2xl">
                Change plan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default profile;
