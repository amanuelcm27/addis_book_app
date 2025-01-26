import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Slider from "@react-native-community/slider";
import images from "../../constants/images";
import { router } from "expo-router";

const Playback = () => {
  const [currentTime, setCurrentTime] = useState(0); 
  const totalDuration = 10 * 60 * 60 + 33 * 60; // Total duration in seconds (10:33:00)
  const [draggedValue , setDraggedValue] = useState(0);
  const [isSliding, setIsSliding] = useState(false); 
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  console.log("currentTime", currentTime);
  return (
    <View className="h-full">
      <ImageBackground
        source={images.atlas}
        blurRadius={20}
        style={StyleSheet.absoluteFillObject}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View className="flex-row justify-center items-center bg-[rgba(0,0,0,0.1)] h-[70px] p-4">
            <TouchableOpacity onPress={() => router.back()}>
              <FontAwesomeIcon icon="fa-angle-down" color="white" size={25} />
            </TouchableOpacity>
            <View className="flex-1 items-center mx-12 ">
              <Text
                className="text-white text-xl font-primaryExtraBoldItalic"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Atlas Shrugged
              </Text>
            </View>
          </View>
          <View className="flex-1 p-8">
            <Image className="w-full h-full rounded-xl" source={images.atlas} />
          </View>
          <View className="h-[150px] p-2">
            <View>
              <Slider
                style={{ width: "100%", height: 20 }}
                minimumValue={0}
                maximumValue={totalDuration}
                value={isSliding ? draggedValue : currentTime}
                onValueChange={(value) => setDraggedValue(value) }
                onSlidingStart={() => setIsSliding(true)}
                onSlidingComplete={(value) => {
                  setIsSliding(false);
                  setCurrentTime(value);
                }}
                step={1}
                minimumTrackTintColor="#FF9100"
                maximumTrackTintColor="#FFFFFF"
                thumbTintColor="white"
              />
            </View>
            <View className="flex-row justify-between items-center mx-4">
              <Text className="font-primaryRegular text-white">
                {formatTime(currentTime)}
              </Text>
              <Text className="font-primaryRegular text-white">
                {formatTime(totalDuration)}
              </Text>
            </View>
            <View className="flex-row items-center mx-4 justify-between">
              <TouchableOpacity activeOpacity={0.5}>
                <FontAwesomeIcon icon="fa-volume-up" color="white" size={30} />
              </TouchableOpacity>
              <View className="flex-row gap-4 items-center">
                <TouchableOpacity activeOpacity={0.5}>
                  <FontAwesomeIcon icon="fa-backward" color="white" size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  className="bg-white rounded-full"
                >
                  <FontAwesomeIcon
                    icon="fa-circle-play"
                    color="#FF9100"
                    size={48}
                  />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5}>
                  <FontAwesomeIcon icon="fa-forward" color="white" size={30} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity activeOpacity={0.5}>
                  <FontAwesomeIcon icon="fa-bars" color="white" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default Playback;
