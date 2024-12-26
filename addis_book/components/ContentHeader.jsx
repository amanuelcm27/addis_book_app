import { View, Text } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const ContentHeader = ({text , icon}) => {
  return (
    <View className="flex-row items-center p-4 my-4">
      <Text className="flex-1 text-2xl font-black">{text}</Text>
      <View>
        <FontAwesomeIcon icon={icon} size={32} />
      </View>
    </View>
  );
};

export default ContentHeader;
