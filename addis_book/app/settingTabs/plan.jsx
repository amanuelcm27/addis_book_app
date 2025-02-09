import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import images from "../../constants/images";
import shadowStyles from "../../constants/shadowStyles";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";

const plan = () => {
  const { user } = useAuth();

  return (
    <View className="mx-4 my-4">
      <Text className="font-primaryBlack text-2xl">Your Current Plan</Text>

      <View className="bg-primary rounded-lg p-4 my-4">
        <View className="flex-row items-center">
          <View className="flex-1">
            <Text className="text-white font-primaryRegular">
              {user?.subscription?.type} plan
            </Text>
            <Text className="text-white font-primaryBlack text-2xl">
              {user?.subscription?.price}
              {user?.subscription?.category === "Int" ? "USD" : "ETB"}/ month
            </Text>
            <Text className="text-white font-primaryThin  text-lg">
              {user?.subscription?.category === "Int"
                ? "International"
                : "Ethiopia"}
            </Text>
          </View>
          <Image source={images.logo} className="w-24 h-24" />
        </View>
      </View>
      {user?.subscription?.type === "Premium" ? (
        <View className="my-6">
          <Text className="font-primaryBlack">This plan provides:</Text>
          <Text>{"\u2022"} Unlimited book access</Text>
          <Text>
            {"\u2022"} Completely ad-free reading and listening experience
          </Text>
          <Text>
            {"\u2022"} Full access to all audiobooks with high-quality audio
          </Text>
        </View>
      ) : (
        <View className="my-6">
          <Text className="font-primaryBlack">This plan provides </Text>
          <Text>{"\u2022"} Unlimited access to 20 books per month</Text>
          <Text>{"\u2022"} Includes occasional ads</Text>
          <Text>{"\u2022"} Limited access to audiobooks </Text>
        </View> 
      )}

      <TouchableOpacity
        activeOpacity={0.5}
        className="bg-white border-2 border-black rounded-lg p-4 w-1/2 "
        style={shadowStyles.shadow}
        onPress={() => router.push("subscription")}
      >
        <Text className="text-center font-primaryBold">Update Plan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default plan;
