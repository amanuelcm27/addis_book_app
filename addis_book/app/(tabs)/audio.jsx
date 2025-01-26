import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StatusBar } from "expo-status-bar";
import LargeBookCard from "../../components/LargeBookCard";
import images from "../../constants/images";
import ContentHeader from "../../components/ContentHeader"
const audiobook = () => {
  const trendingBooks = [
    { id: "1", imageSource: images.animal, title: "Animal Farm"  , type:'audio' },
    { id: "2", imageSource: images.atlas, title: "Atlas"  },
    { id: "3", imageSource: images.got, title: "Game of Thrones"  , type:'audio' },
    { id: "4", imageSource: images.htw, title: "How to Win Friends" },
    { id: "5", imageSource: images.unscripted, title: "Unscripted"  , type:'audio' },
  ];
  return (
    <SafeAreaView className="h-full">
      <ScrollView >
        <ContentHeader text={'Browse Audio Books'} icon={'fa-headphones'} />
        <View className="flex-row items-center justify-center mx-4  p-2">
          <TouchableOpacity activeOpacity={0.35}>
            <View className="  items-center mx-6 p-4">
              <Text className="font-primaryBold text-xl">All</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.35}>
            <View className="border-b-2 border-[#FF9100] items-center mx-4 mr-8 p-4">
              <Text className="font-primaryBold text-xl">Recently opened</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex-row flex-wrap justify-between mx-4 my-6">
          {trendingBooks.map((book, index) => (
            <LargeBookCard
              key={book.id}
              styles={"w-[48%] mb-4"} // Adjusted width and added spacing
              item={book}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default audiobook;
