import React from "react";
import { View, Text, Image } from "react-native";

const SmallBookCard = ({ imageSource, title, width = "0%" }) => {
  return (
    <View
      className={`flex-row w-[190px] h-[100px] rounded-xl bg-white items-center`}
      style={{
        shadowOffset: { width: 5, height: 0 },
        shadowColor: "black",
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
        zIndex: 1,
      }}
    >
      <Image
        className="w-1/2 h-full rounded-tl-xl rounded-bl-xl"
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
