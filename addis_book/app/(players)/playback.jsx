import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
// import TrackPlayer, { State } from "react-native-track-player";
import images from "../../constants/images"; // assuming images are in this folder

const Playback = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [dragState, setDragState] = useState(undefined);
  const [isMuted, setIsMuted] = useState(false);
  const totalDuration = 10 * 60 * 60 + 33 * 60;

  // useEffect(() => {
  //   // Initialize Track Player when the component mounts
  //   async function setupPlayer() {
  //     await TrackPlayer.setupPlayer();
  //     await TrackPlayer.updateOptions({
  //       capabilities: [
  //         Capability.Play,
  //         Capability.Pause,
  //         Capability.SkipToNext,
  //         Capability.SkipToPrevious
  //       ],
  //     });
  //     await TrackPlayer.add({
  //       id: "trackId",
  //       url: require("../../assets/audio/ghost.mp3"), // Local audio file
  //       title: "Atlas Shrugged",
  //       artist: "Ayn Rand",
  //       artwork: images.atlas,
  //     });
  //   }
  //   setupPlayer();
  // }, []);

  // useEffect(() => {
  //   // Update the playback position during slider changes
  //   if (isSliding) {
  //     if (TrackPlayer != null) {
  //       // Check if TrackPlayer is initialized before calling methods
  //       TrackPlayer.seekTo(dragState);
  //     }
  //   } else {
  //     if (TrackPlayer != null) {
  //       TrackPlayer.seekTo(currentTime);
  //     }
  //   }
  // }, [currentTime, dragState, isSliding]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // const togglePlayback = async () => {
  //   const currentState = await TrackPlayer.getState();
  //   if (currentState === State.Playing) {
  //     await TrackPlayer.pause();
  //   } else {
  //     await TrackPlayer.play();
  //   }
  // };

  // const skipBackward = async () => {
  //   const position = await TrackPlayer.getPosition();
  //   TrackPlayer.seekTo(position - 10); // Go back 10 seconds
  // };

  // const skipForward = async () => {
  //   const position = await TrackPlayer.getPosition();
  //   TrackPlayer.seekTo(position + 10); // Skip forward 10 seconds
  // };

  // const toggleMute = async () => {
  //   const currentVolume = await TrackPlayer.getVolume();
  //   await TrackPlayer.setVolume(currentVolume === 0 ? 1 : 0); // Toggle between mute and unmute
  //   setIsMuted(currentVolume === 0);
  // };

  return (
    <View className="h-full bg-black">
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
            <Slider
              style={{ width: "100%", height: 20 }}
              minimumValue={0}
              maximumValue={totalDuration}
              value={isSliding ? dragState : currentTime}
              onValueChange={(value) => {
                if (isSliding) {
                  setCurrentTime(value);
                }
              }}
              onSlidingStart={(value) => {
                setDragState(value);
                setIsSliding(true);
              }}
              onSlidingComplete={(value) => {
                setIsSliding(false);
                setCurrentTime(value);
              }}
              step={1}
              minimumTrackTintColor="#FF9100"
              maximumTrackTintColor="#FFFFFF"
              thumbTintColor="white"
            />
            <View className="flex-row justify-between items-center mx-4">
              <Text className="font-primaryRegular text-white">
                {formatTime(currentTime)}
              </Text>
              <Text className="font-primaryRegular text-white">
                {formatTime(totalDuration)}
              </Text>
            </View>
            <View className="flex-row items-center mx-4 justify-between">
              <TouchableOpacity 
              // onPress={toggleMute}
               activeOpacity={0.5}>
                <FontAwesomeIcon
                  icon={isMuted ? "fa-volume-off" : "fa-volume-up"}
                  color="white"
                  size={30}
                />
              </TouchableOpacity>
              <View className="flex-row gap-4 items-center">
                <TouchableOpacity 
                // onPress={skipBackward} 
                activeOpacity={0.5}>
                  <FontAwesomeIcon icon="fa-backward" color="white" size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={togglePlayback}
                  activeOpacity={0.5}
                  className="bg-white rounded-full"
                >
                  <FontAwesomeIcon
                    icon="fa-circle-play"
                    color="#FF9100"
                    size={48}
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                // onPress={skipForward} 
                activeOpacity={0.5}>
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
