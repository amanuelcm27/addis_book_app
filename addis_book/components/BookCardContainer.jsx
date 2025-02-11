import { View, Text, FlatList } from "react-native";
import React, { memo, useState } from "react";
import LargeBookCard from "./LargeBookCard";
import Skeleton from "./SkeletonLoader";

const BookCardContainer = memo(({ books, contains, loading }) => {
  const [activeItem, setActiveItem] = useState(books[0]?.id);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0]?.key);
    }
  };

  return (
    <View className="mx-2 my-4">
      <Text className="font-primaryBlack text-2xl mb-4">{contains}</Text>
      <FlatList
        data={loading ? Array.from({ length: 4 }) : books} // When loading, show 6 skeletons
        keyExtractor={(item, index) => (item?.id ? item.id : index.toString())} // Key for skeletons if no id
        renderItem={({ item }) =>
          loading ? (
            <Skeleton isLoading={true}>
              <View className="h-[300px] w-[170px] relative rounded-xl bg-white overflow-hidden"></View>
            </Skeleton>
          ) : (
            <LargeBookCard
              activeItem={activeItem}
              item={item}
              styles={"w-[170px]"}
              animate={true}
            /> 
          )
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        contentContainerStyle={{ gap: 4 }}
      />
    </View>
  );
});

export default BookCardContainer;
