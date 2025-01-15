import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as Animatable from "react-native-animatable";
import SmallBookCard from "../../components/SmallBookCard";
import BookCardContainer from "../../components/BookCardContainer";
import images from "../../constants/images";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";

const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigation }) => {
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
        }}
      >
        <Animatable.View
          animation={isPressed ? "rotate" : "swing"}
          duration={500}
          delay={0}
        >
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => navigation.toggleDrawer()}
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
const SidebarContent = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        position: "absolute",  // Make sidebar overlay
        top: 0,
        left: 0,
        width: "100%",  
        height: "100%", 
        padding: 10,
        backgroundColor: "white",
        borderTopRightRadius: 50,
        borderBottomRightRadius: 25,
        shadowColor: "orange",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 20,
        zIndex: 999,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        activeOpacity={0.6}
      >
        <FontAwesomeIcon icon="fa-close" color="black" size={32} />
      </TouchableOpacity>
      <View style={{ marginTop: 20 }}>
        {[
          { label: "Account", icon: "fa-user" },
          { label: "Genre", icon: "fa-meteor" },
          { label: "Authors", icon: "fa-user-pen" },
          { label: "Narrators", icon: "fa-wave-square" },
          { label: "About us", icon: "fa-users" },
          { label: "FAQ", icon: "fa-question" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center my-2 p-4 border-2 rounded-full"
          >
            <FontAwesomeIcon icon={item.icon} size={22} />
            <Text className="px-4 font-primaryBlack">{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const Home = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,

        drawerStyle: {
          width: 300,
          backgroundColor: "c",
        },
        sceneContainerStyle: {
          backgroundColor: "white",
        },
      }}
      drawerContent={(props) => <SidebarContent {...props} />}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default Home;
