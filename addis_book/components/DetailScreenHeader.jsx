import {   View,
    Text,
    Image,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Animated,
    ActivityIndicator,} from "react-native";
import React from "react";
import { router } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const DetailScreenHeader = ({ book, scrollY }) => {
  const imageScale = scrollY.interpolate({
    inputRange: [0, 150], // Scale until 150px of scroll
    outputRange: [1, 0.2], // Shrink to 50% of original size
    extrapolate: "clamp",
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 20], // Move upwards
    extrapolate: "clamp",
  });

  const imageTranslateX = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -20], // Move towards the back button
    extrapolate: "clamp",
  });
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [200, 60],
    extrapolate: "clamp",
  });

  const imageBackgroundHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [150, 50],
    extrapolate: "clamp",
  });
  return (
    <Animated.View
      style={{
        height: headerHeight,
      }}
      className=" relative flex-row"
    >
      <Animated.View
        className="w-full"
        style={{ height: imageBackgroundHeight }}
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
      </Animated.View>
      <Animated.View
        style={{
          transform: [
            { scale: imageScale },
            { translateY: imageTranslateY },
            { translateX: imageTranslateX },
          ],
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
    </Animated.View>
  );
};

export default DetailScreenHeader;
