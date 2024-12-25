import { View, Text, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import React from "react";
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
const LargeBookCard = ({ activeItem, item }) => {
  return (
    <Animatable.View
      animation={activeItem === item.id ? zoomIn : zoomOut}
      duration={500}
    >
      <View className="h-[300px] w-[200px]  rounded-xl bg-white ">
        <Image className="w-full h-full rounded-xl" source={item.imageSource} />
      </View>
    </Animatable.View>
  );
};

export default LargeBookCard;
