import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import images from "../../constants/images";
import * as Animatable from "react-native-animatable";
import SmallBookCard from "../../components/SmallBookCard";
import LargeBookCard from "../../components/LargeBookCard";
import BookCardContainer from "../../components/BookCardContainer";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const trendingBooks = [
    {
      id: "1",
      imageSource: images.animal,
      title: "Animal Farm",
      type: "audio",
    },
    { id: "2", imageSource: images.atlas, title: "Atlas" },
    {
      id: "3",
      imageSource: images.got,
      title: "Game of Thrones",
      type: "audio",
    },
    { id: "4", imageSource: images.htw, title: "How to Win Friends" },
    {
      id: "5",
      imageSource: images.unscripted,
      title: "Unscripted",
      type: "audio",
    },
  ];

  return (
    <SafeAreaView className="h-full">
      <View
        className="bg-primary flex-row h-[70px] items-center p-4"
        style={{
          shadowOffset: { width: 5, height: 5 },
          shadowColor: "black",
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 10,
          zIndex: 1,
        }}
      >
        <Animatable.View
          animation={isPressed ? "rotate" : "swing"}
          duration={500}
        >
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.6}
          >
            <FontAwesomeIcon icon="fa-bars" color="white" size={32} />
          </TouchableOpacity>
        </Animatable.View>
        <View className="ml-auto">
          <Image source={images.logo} className="w-24 h-24" />
        </View>
      </View>
      <ScrollView className="w-full">
        <View className="flex-row flex-wrap justify-between my-6 mx-4">
          <SmallBookCard imageSource={images.animal} title="Animal Farm" />
          <SmallBookCard imageSource={images.atlas} title="Atlas" />
          <SmallBookCard imageSource={images.got} title="Game of Thrones" />
          <SmallBookCard
            imageSource={images.htw}
            title="How to Win Friends and Influence People"
          />
          <SmallBookCard imageSource={images.unscripted} title="Unscripted" />
          <SmallBookCard imageSource={images.atlas} title="Atlas" />
        </View>

        <BookCardContainer trendingBooks={trendingBooks} contains="Trending" />
        <BookCardContainer trendingBooks={trendingBooks} contains="Latest" />
        <BookCardContainer
          trendingBooks={trendingBooks}
          contains="Recommended"
        />
      </ScrollView>
      <StatusBar backgroundColor="#FF9100" style="auto" />
    </SafeAreaView>
  );
};

export default Home;
