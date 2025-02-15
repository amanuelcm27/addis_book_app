import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import images from "../constants/images";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const Index = () => {
  const [isFirstTime, setIsFirstTime] = useState(null); // Use null for proper state handling
  const [loading , setLoading] = useState(true);
  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        const firstTime = await SecureStore.getItemAsync("first_time");
        if (firstTime !== null) {
          router.replace("/home"); // Redirect immediately if not first-time
        } else {
          setIsFirstTime(true); // Show Get Started screen
        }
      } catch (error) {
        console.error("Error reading first-time flag:", error);
      } 
      finally {
        setLoading(false);
      }
    }; 

    checkFirstTime();
  }, []);

  const handleGetStarted = async () => {
    try {
      await SecureStore.setItemAsync("first_time", "false");
      router.replace("/home");
    } catch (error) {
      console.error("Error setting first-time flag:", error);
    }
  };

  if (loading ) {
    return( 
      <View className='h-full bg-primary items-center justify-center'>
        <Image source={images.logo} className='w-28 h-28'>

        </Image>
      </View>
    )
  }

  return (
    <>
      <SafeAreaView className="h-full bg-[#FF9100]">
        <View className="h-[80%] items-center justify-center">
          <View>
            <Image source={images.logo} className="w-68 h-68" />
          </View>
          <View className="items-center">
            <Text className="text-white text-4xl font-primaryExtraBoldItalic">
              Listen, Read, Discover
            </Text>
            <Text className="text-white text-xl text-center font-primaryLightItalic">
              Where every page and every voice comes alive
            </Text>
          </View>
        </View>
        <View className="my-8 mx-4">
          <TouchableOpacity
            onPress={handleGetStarted}
            className="bg-white p-6 rounded-full mt-4 w-full shadow-lg shadow-black"
          >
            <Text className="text-black text-4xl text-center font-primaryBlackItalic">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar style="light" />
    </>
  );
};

export default Index;
