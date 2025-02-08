import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import images from "../../constants/images";

const Checkout = ({ showCheckoutBox, setShowCheckoutBox }) => {
  const [heightAnim] = useState(new Animated.Value(0)); // Animated value for height
  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: showCheckoutBox ? 1 : 0,
      duration: 650, // Duration for smooth animation
      useNativeDriver: false, // Use native driver for height animations
    }).start();
  }, [showCheckoutBox]);

  const animatedHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "90%"], // Height goes from 0% to 100% when visible
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
        paddingTop: 0,
        elevation: 5,
        height: animatedHeight, 
        overflow: "hidden", 
        zIndex: 1000,
      }}
    >
      <View className="m-2">
        <TouchableOpacity
          onPress={() => setShowCheckoutBox(false)}
          className="my-4"
        >
          <FontAwesomeIcon icon="fa-close" size={24} />
        </TouchableOpacity>
        <Text className="font-primaryBlack text-xl">Checkout</Text>
        <View className="items-end my-8 shadow-lg shadow-black bg-white p-4 rounded-xl">
          <Text className="font-primaryBlack text-lg">Order total</Text>
          <Text className="font-primaryRegular text-lg">
            Basic Subscription
          </Text>
          <Text className="font-primaryRegular text-lg">Monthly</Text>
          <Text className="font-primaryRegular text-lg">Total: $5.00</Text>

        </View>
        <Text className="text-center font-primaryBlack text-2xl">Pay with</Text>
        <TouchableOpacity className="flex-row items-center justify-center my-4 shadow-lg shadow-black bg-white p-4 rounded-xl">
          <Image source={images.chapa} className="" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center justify-center my-4 shadow-lg shadow-black bg-white p-4 rounded-xl">
          <Image source={images.stripe} className="p-4  " />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Checkout;
