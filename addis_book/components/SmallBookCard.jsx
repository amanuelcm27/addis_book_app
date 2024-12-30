import React from "react";
import { View, Text, Image } from "react-native";
import shadowStyles from "../utils/shadowStyles";

const SmallBookCard = ({ imageSource, title}) => {
  return (
    <View
      className={`flex-row w-[48%] mb-4  h-[80px] rounded-xl bg-white items-center`}
      style={shadowStyles.shadow}
    >
      <Image
        className="w-1/2 h-full rounded-tl-xl rounded-bl-xl "
        source={imageSource}
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
    
    </View>
  );
};

export default SmallBookCard;
