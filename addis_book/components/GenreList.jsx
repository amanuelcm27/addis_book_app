import { View, Text  , TouchableOpacity ,FlatList } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import GenreItem from "./GenreItem";

const GenreList = ({genres , selectedGenres , toggleGenreSelection , setSelectedGenres}) => {
  return (
    <View className="mx-4  my-4">
      <FlatList
        data={genres}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = selectedGenres.includes(item.id);
          return (
            <GenreItem
              item={item}
              isSelected={isSelected}
              toggleGenreSelection={toggleGenreSelection}
            />
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 4 }}
      />
      {selectedGenres.length > 0 && (
        <View className="flex-row items-center">
          <Text>{selectedGenres.length} filter applied</Text>
          <TouchableOpacity
            className="ml-auto flex-row items-center rounded-full bg-[#f7f7f7] p-2 "
            onPress={() => setSelectedGenres([])}
          >
            <Text className="font-primaryRegular">clear filters </Text>
            <FontAwesomeIcon icon="fa-close" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default GenreList;
