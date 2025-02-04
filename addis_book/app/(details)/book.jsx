import React, { memo, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CustomButton from "../../components/CustomButton";
import { router, usePathname } from "expo-router";
import images from "../../constants/images";
import { StatusBar } from "expo-status-bar";
import Checkout from "../(checkout)/checkout";
import { useAuth } from "../../context/AuthContext";

const BookDetail = memo(() => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showCheckoutBox, setShowCheckoutBox] = useState(false);
  const { user, loading } = useAuth();
  const pathname = usePathname();
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
  const handleBuying = () => {
    if (!loading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else {
      setShowCheckoutBox(true);
    }
  };
  return (
    <>
      <SafeAreaView className="bg-white h-full relative">
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
              source={images.unscripted}
              blurRadius={2}
              className="w-full h-full"
            >
              <View className="w-full h-full bg-[rgba(0,0,0,0.3)]">
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => router.back()}
                  className="p-4"
                >
                  <FontAwesomeIcon
                    icon="fa-angle-left"
                    color="white"
                    size={30}
                  />
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
              source={images.unscripted}
              className="w-36 h-36 rounded-lg"
            />
          </Animated.View>
        </Animated.View>
        {/* ScrollView with onScroll */}
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <View className="mx-6 my-4 flex-row">
            <View className="flex-1">
              <Text className="text-2xl font-primaryBlackItalic">
                Unscripted
              </Text>
              <Text className="text-lg font-primaryItalic text-gray-500">
                by MJ DeMarco
              </Text>
            </View>

            <View className="ml-auto flex-row gap-2">
              <TouchableOpacity activeOpacity={0.5}>
                <FontAwesomeIcon
                  icon="fa-play-circle"
                  color="#FF9100"
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5}>
                <FontAwesomeIcon
                  icon="fa-book-open"
                  color="#FF9100"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="mx-6">
            <Text className="font-primaryRegular py-4">Summary</Text>
            <Text className="font-primaryRegular">
              Lorem ipsum dolor sit, Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Quibusdam explicabo eaque inventore vel
              exercitationem ab corrupti error quis, alias voluptate officiis
              nemo voluptatibus earum accusamus! Pariatur architecto enim eaque
              inventore!Lorem Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Quaerat lacitationem ab corrupti error quis,
              alias voluptate officiis nemo voluptatibus earum accusamus!
              Pariatur architecto enim eaque inventore!Lorem Lorem ipsum dolor
              sit, amet consectetur adipisicing elit. Quaerat laboriosam quidem
              omnis eos! Quos ducimus, consequuntur recusandae sequi pariatur
              sed reprehenderit maiores quisquam temmodi? amet conboriosam
              quidem omnis eos! Quos ducimus, consequuntur recusandae sequi
              pariatur sed reprehenderit maiores quisquam temmodi? amet
              consectetur adipisicing elit...
            </Text>
          </View>
          <View className="mx-6">
            <Text className="font-primaryRegular py-4">Details</Text>
            <View className="flex-row flex-wrap">
              {/* Details */}
              <View className="w-1/2 py-2">
                <Text className="font-primaryBold">Author</Text>
                <Text
                  onPress={() => router.push("/author")}
                  className="text-[#FF9100]"
                >
                  John Doe
                </Text>
              </View>
              <View className="w-1/2 py-2">
                <Text className="font-primaryBold">Narrator</Text>
                <Text
                  onPress={() => router.push("/narrator")}
                  className="text-[#FF9100]"
                >
                  Jane Smith
                </Text>
              </View>
              <View className="w-1/2 py-2">
                <Text className="font-primaryBold">Genre</Text>
                <Text className="text-gray-600">Fiction</Text>
              </View>
              <View className="w-1/2 py-2">
                <Text className="font-primaryBold">Language</Text>
                <Text className="text-gray-600">English</Text>
              </View>
            </View>
          </View>
        </Animated.ScrollView>

        <CustomButton
          text="Buy ($20)"
          background="bg-[#FF9100]"
          textColor="text-white"
          onClick={handleBuying}
        />

        <Checkout
          showCheckoutBox={showCheckoutBox}
          setShowCheckoutBox={setShowCheckoutBox}
        />
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
});

export default BookDetail;
