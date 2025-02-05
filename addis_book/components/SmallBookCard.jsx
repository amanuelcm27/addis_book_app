import React from "react";
import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import shadowStyles from "../constants/shadowStyles";
import { router } from "expo-router";

const SmallBookCard = ({ imageSource, title , id }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(`/book/${id}`)}
      className={`flex-row w-[48%] mb-4  h-[70px] rounded-md bg-white items-center`}
      style={shadowStyles.shadow}
    >
      <Image
        className="w-[40%] h-full rounded-tl-md rounded-bl-md "
        source={{
          uri: imageSource,
        }}
        resizeMode="cover"
      />
      <View className="pr-2 flex-1">
        <Text
          className="font-primarySemiBold mx-2"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SmallBookCard;
