import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import images from "../constants/images";
import { router } from "expo-router";

const CreatorCard = ({ item, index, colors, route }) => {
  const currentColor = colors[index % colors.length];  // Get current color

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        router.push({
          pathname: `${route}`, 
          params: {  currentColor }
        })
      }
      key={item.id}
      className="w-[48%] h-[120px]"
      style={{
        borderRadius: 10,
        backgroundColor: currentColor,  // Use current color for background
      }}
    >
      <View className="flex-1 h-1/2">
        <Text
          className="p-4 text-white text-lg font-primaryBoldItalic"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
      </View>
      <View className="mb-4 mx-4 h-1/2 ml-auto">
        <Image className="w-16 h-16 rounded-full" source={{ uri: item.photo }} />
      </View>
    </TouchableOpacity>
  );
};

export default CreatorCard;
