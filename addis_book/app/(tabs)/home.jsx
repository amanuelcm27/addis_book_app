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

const Home = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const trendingBooks = [
    { id: "1", imageSource: images.animal, title: "Animal Farm" },
    { id: "2", imageSource: images.atlas, title: "Atlas" },
    { id: "3", imageSource: images.got, title: "Game of Thrones" },
    { id: "4", imageSource: images.htw, title: "How to Win Friends" },
    { id: "5", imageSource: images.unscripted, title: "Unscripted" },
  ];

  return (
    <SafeAreaView className="h-full">
      <ScrollView >
        <View
          className="bg-primary flex-row h-[100px] items-center p-4"
          style={{
            shadowOffset: { width: 5, height: 5 },
            shadowColor: "black",
            shadowOpacity: 1,
            shadowRadius: 5,
            elevation: 6,
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

        <View className="flex-row w-full flex-wrap my-6 justify-between gap-2 p-2">
          <SmallBookCard imageSource={images.animal} title="Animal Farm" />
          <SmallBookCard imageSource={images.atlas} title="Atlas" width="45%" />
          <SmallBookCard imageSource={images.got} title="Game of Thrones" />
          <SmallBookCard
            imageSource={images.htw}
            title="How to Win Friends and Influence People"
            width="45%"
          />
          <SmallBookCard imageSource={images.unscripted} title="Unscripted" />
          <SmallBookCard imageSource={images.atlas} title="Atlas" width="45%" />
        </View>

        <View className="mx-2">
          <Text className="font-primaryBlack text-4xl mb-4">Trending</Text>
          <FlatList
            data={trendingBooks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <LargeBookCard source={item.imageSource} />
            )}
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{
              gap: 16, 
            }}
          />
        </View>
        <View className="mx-2 my-4">
          <Text className="font-primaryBlack text-4xl mb-4">Latest</Text>
          <FlatList
            data={trendingBooks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <LargeBookCard source={item.imageSource} />
            )}
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{
              gap: 4, 
            }}
          />
        </View>
        <View className="mx-2 my-4">
          <Text className="font-primaryBlack text-4xl mb-4">Recommended</Text>
          <FlatList
            data={trendingBooks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <LargeBookCard source={item.imageSource} />
            )}
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{
              gap: 4, 
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
