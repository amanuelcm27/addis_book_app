import React from "react";
import { View, Text, TouchableOpacity, Image, BackHandler } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { usePlayback } from "../context/PlayBackContext";

const MiniPlayer = () => {
  const { currentTrack, setIsVisible, togglePlayback, isPlaying } =
    usePlayback();

  if (!currentTrack) return null;

  return (
    <View className="p-2  flex-row  rounded-t-xl justify-center items-center">
      <Image
        source={{ uri: currentTrack.cover }}
        className="w-16 h-16 rounded-md"
      />
      <TouchableOpacity onPress={() => setIsVisible(true)} className="flex-1 justify-center mx-4">
        <Text className="font-primaryBold">Now playing</Text>
        <Text className="font-primaryRegular" numberOfLines={1}>{currentTrack.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={togglePlayback}>
        <FontAwesomeIcon
          icon={isPlaying ? "fa-circle-pause" : "fa-circle-play"}
          color="black"
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MiniPlayer;
