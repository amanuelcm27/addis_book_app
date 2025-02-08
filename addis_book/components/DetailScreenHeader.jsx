import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const DetailScreenHeader = ({ book, scrollY }) => {

  const imageScale = scrollY.interpolate({
    inputRange: [0, 150], // When scrolled down 150 pixels
    outputRange: [1, 0], // Image shrinks from full size to half
    extrapolate: "clamp",
  });
  return (
    <View
      style={{
        height: 200,
      }}
      className=" relative justify-center flex-row  overflow-hidden"
    >
      <View
        className="w-full items-center justify-center"
        style={{ height: 150 }}
      >
        <ImageBackground
          source={{
            uri: book.cover,
          }}
          blurRadius={2}
          className="w-full h-full"
        >
          <View className="w-full h-full bg-[rgba(0,0,0,0.3)]">
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => router.back()}
              className="p-4"
            >
              <FontAwesomeIcon icon="fa-angle-left" color="white" size={30} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <Animated.View
        style={{
          transform: [{ scale: imageScale }], // Shrink the image based on scroll
        }}
        className="absolute bottom-0 left-0 mx-8"
      >
        <Image
          source={{
            uri: book.cover,
          }}
          className="w-36 h-36 rounded-lg"
        />
      </Animated.View>
    </View>
  );
};

export default DetailScreenHeader;
