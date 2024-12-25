import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StatusBar } from "expo-status-bar";
import LargeBookCard from "../../components/LargeBookCard";
import images from "../../constants/images";

const ebook = () => {
    const trendingBooks = [
      { id: "1", imageSource: images.animal, title: "Animal Farm" },
      { id: "2", imageSource: images.atlas, title: "Atlas" },
      { id: "3", imageSource: images.got, title: "Game of Thrones" },
      { id: "4", imageSource: images.htw, title: "How to Win Friends" },
      { id: "5", imageSource: images.unscripted, title: "Unscripted" },
    ];
  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="flex-row items-center p-4 my-4">
          <Text className="flex-1 text-2xl font-black">Browse Ebooks</Text>
          <View>
            <FontAwesomeIcon icon={"fa-book-open"} size={32} />
          </View>
        </View>
        <LargeBookCard item={trendingBooks[0]}/>
        <LargeBookCard item={trendingBooks[1]}/>
        <LargeBookCard item={trendingBooks[2]}/>
        <LargeBookCard item={trendingBooks[3]}/>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ebook;
