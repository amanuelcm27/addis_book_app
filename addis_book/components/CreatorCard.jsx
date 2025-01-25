import { View, Text , Image, TouchableOpacity } from "react-native";
import React from "react";
import images from "../constants/images";
import { router } from "expo-router";

const CreatorCard = ({item, index , colors , route}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={()=>router.push(`/${route}`)}
      key={item.id}
      className="w-[48%] h-[120px]"
      style={{
        borderRadius: 10,
        backgroundColor: colors[index % colors.length],
      }}
      
    >
      <View className="flex-1 h-1/2">
        <Text
          className="p-4 text-white text-lg font-primaryBoldItalic"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.filter}
        </Text>
      </View>
      <View className="mb-4 mx-4 h-1/2 ml-auto">
        <Image className="w-16 h-16 rounded-full" source={images.orwel} />
      </View>
    </TouchableOpacity>
  );
};

export default CreatorCard;
