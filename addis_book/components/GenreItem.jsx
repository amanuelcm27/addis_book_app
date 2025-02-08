import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const GenreItem = React.memo(({ item, isSelected, toggleGenreSelection }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => toggleGenreSelection(item.id)}
    >
      <View
        className={`rounded-full my-2 p-4 shadow-sm shadow-black ${
          isSelected ? "bg-[#FF9100]" : "bg-white"
        }`}
      >
        <Text className={isSelected ? "text-white" : "text-black"}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export default GenreItem;
