import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { usePlayback } from "../context/PlayBackContext";

const MiniPlayer = () => {
  const { currentTrack, togglePlayback, isPlaying } = usePlayback();

  if (!currentTrack) return null;

  return (
    <View className="p-2 bg-primary  flex-row  rounded-t-lg items-center">
      <Image
        source={{ uri: currentTrack.cover }}
        className="w-16 h-16 rounded-md"
      />
      <View className='flex-1 justify-center mx-4'>
        <Text className='text-white font-primaryBold'>Now playing</Text>
        <Text className="text-white  flex-1">{currentTrack.title}</Text>
      </View>
      <TouchableOpacity onPress={togglePlayback}>
        <FontAwesomeIcon
          icon={isPlaying ? "fa-circle-pause" : "fa-circle-play"}
          color="white"
          size={22}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MiniPlayer;
