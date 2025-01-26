import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import images from "../constants/images";
import { router } from "expo-router";
const index = () => {
  return (
    <>
      <SafeAreaView className='h-full bg-[#FF9100]'>
        <View className=" h-[80%] items-center justify-center ">
          <View>
            <Image source={images.logo} className='w-68 h-68'/>
          </View>
          <View className="items-center">
            <Text className="text-white text-4xl font-primaryExtraBoldItalic">
              Listen , Read , Discover
            </Text>
            <Text className="text-white text-xl text-center font-primaryLightItalic">
              Where every page and every voice comes alive
            </Text>
          </View>
        </View>
        <View className="my-8 mx-4">
          <TouchableOpacity onPress={()=>router.push('/playback')} className=" bg-white p-6 rounded-full mt-4 w-full shadow-lg shadow-black ">
            <Text  className="text-black text-4xl  text-center font-primaryBlackItalic">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar  style="light" />
    </>
  );
};

export default index;
