import React, { useEffect } from "react";
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
import { router, useLocalSearchParams } from "expo-router";
import { usePlayback } from "../../context/PlayBackContext";

const Playback = () => {
  const {
    isPlaying,
    isMuted,
    currentTime,
    totalDuration,
    togglePlayback,
    skipBackward,
    skipForward,
    toggleMute,
    loadTrack,
    setCurrentTime,
    setIsSliding,
  } = usePlayback();
  const { audioUri, title, cover, author } = useLocalSearchParams();

  useEffect(() => {
    loadTrack({ id: "trackId", audioUri, title, cover, author });
  }, [audioUri]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View className="h-full bg-black">
      <ImageBackground
        source={{ uri: cover }}
        blurRadius={20}
        style={StyleSheet.absoluteFillObject}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View className="flex-row justify-center items-center bg-[rgba(0,0,0,0.1)] h-[70px] p-4">
            <TouchableOpacity onPress={() => router.back()}>
              <FontAwesomeIcon icon="fa-angle-down" color="white" size={25} />
            </TouchableOpacity>
            <View className="flex-1 items-center mx-12">
              <Text numberOfLines={1} ellipsizeMode="tail" className="text-white text-xl font-bold">{title}</Text>
            </View>
          </View>
          <View className="flex-1 p-8">
            <Image className="w-full h-full rounded-xl" source={{ uri: cover }} />
          </View>
          <View className="h-[150px] p-2 bg-[rgba(0,0,0,0.2)]">
            <Slider
              style={{ width: "100%", height: 20 }}
              minimumValue={0}
              maximumValue={totalDuration}
              value={currentTime}
              onValueChange={(value) => setCurrentTime(value)}
              onSlidingStart={() => setIsSliding(true)}
              onSlidingComplete={(value) => {
                TrackPlayer.seekTo(value);
                setIsSliding(false);
              }}
              step={1}
              minimumTrackTintColor="#FF9100"
              maximumTrackTintColor="#FFFFFF"
              thumbTintColor="white"
            />
            <View className="flex-row justify-between mx-4">
              <Text className="text-white">{formatTime(currentTime)}</Text>
              <Text className="text-white">{formatTime(totalDuration)}</Text>
            </View>
            <View className="flex-row items-center justify-between mx-4">
              <TouchableOpacity onPress={toggleMute}>
                <FontAwesomeIcon icon={`${isMuted ? "fa-volume-xmark" : "fa-volume-up"}`} color="white" size={22} />
              </TouchableOpacity>
              <View className="flex-row  gap-4 items-center">
                <TouchableOpacity onPress={skipBackward}>
                  <FontAwesomeIcon icon="fa-backward" color="white" size={22} />
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePlayback} className="bg-white rounded-full">
                  <FontAwesomeIcon
                    icon={isPlaying ? "fa-circle-pause" : "fa-circle-play"}
                    color="#FF9100"
                    size={48}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={skipForward}>
                  <FontAwesomeIcon icon="fa-forward" color="white" size={22} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <FontAwesomeIcon icon="fa-repeat" color="white" size={22} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default Playback;
