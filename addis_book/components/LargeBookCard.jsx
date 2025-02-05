import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const LargeBookCard = ({ activeItem, item, styles,hasAudio, animate = false }) => {
  const CardContent = (
    <TouchableOpacity
      onPress={() => router.push(`/book/${item.id}`)}
      activeOpacity={0.85}
      className={`h-[300px] relative rounded-xl bg-white overflow-hidden ${styles}`}
    >
      <Image className=" w-full h-full rounded-xl" source={{ uri:item.cover}} />
      {hasAudio && (
        <TouchableOpacity
          activeOpacity={0.8}
          className="absolute right-0 bottom-0 m-4 bg-white rounded-full"
        >
          <FontAwesomeIcon icon={"fa-play-circle"} size={50} color="#FF9100" />
        </TouchableOpacity>
      )}
      <View className="absolute right-0 top-0 bg-orange-500 w-20 rounded-bl-full h-12 items-center justify-center translate-x-[10px]">
        <Text className="text-white font-primaryBlack text-lg ">Pro</Text>
      </View>
    </TouchableOpacity>
  );

  if (animate) {
    return (
      <Animatable.View
        animation={activeItem === item.id ? zoomIn : zoomOut}
        duration={500}
      >
        {CardContent}
      </Animatable.View>
    );
  }

  return CardContent;
};

export default LargeBookCard;
