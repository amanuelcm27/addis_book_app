import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import images from "../../constants/images";
import { useAuth } from "../../context/AuthContext";
import apiRequest from "../../utils/apiRequest";
import InfoCard from "../../components/InfoCard"
const profile = () => {
  const [loading , setLoading ] = useState(true);
  const { user } = useAuth();
  const [info , setInfo ] = useState(null);
  return (
    <View className="mx-4 my-4">
      <InfoCard info={info} setInfo={setInfo} />
      <Text className="font-primaryBlack text-2xl">Account details</Text>
      <View>
        <View className="flex flex-row justify-between my-4">
          <Text className="font-primaryRegular">Name</Text>
          <Text className="font-primaryRegular">{user?.username}</Text>
        </View>
        <View className="flex flex-row justify-between my-4">
          <Text className="font-primaryRegular">Email</Text>
          <Text className="font-primaryRegular">{user?.email || "N/A"}</Text>
        </View>
      </View>
      <View className="bg-black rounded-lg p-4 my-4">
        <Text className="font-primaryRegular text-white">Your plan</Text>
        <View className="flex-row items-center">
          <Image source={images.logo} className="w-24 h-24" />
          <View className="">
            <Text className="text-white">{user?.subscription?.type}</Text>
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
