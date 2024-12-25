import { View, Text  , FlatList} from "react-native";
import React, { useState } from "react";
import LargeBookCard from "./LargeBookCard";

const BookCardContainer = ({ trendingBooks , contains }) => {
  const [activeItem, setActiveItem] = useState(trendingBooks[0]?.id);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0]?.key);
    }
  };
  return (
    <View className="mx-2 my-4">
      <Text className="font-primaryBlack text-4xl mb-4">{contains}</Text>
      <FlatList
        data={trendingBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LargeBookCard
            activeItem={activeItem}
            item={item}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        contentContainerStyle={{ gap: 4 }}
      />
    </View>
  );
};

export default BookCardContainer;
