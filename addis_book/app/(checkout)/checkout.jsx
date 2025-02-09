import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import images from "../../constants/images";
import { apiRequest } from "../../utils/apiRequest";
import InfoCard from "../../components/InfoCard";

const Checkout = ({ showCheckoutBox, setShowCheckoutBox, book , checkOwnership }) => {
  const [heightAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: showCheckoutBox ? 1 : 0,
      duration: 650,
      useNativeDriver: false,
    }).start();
  }, [showCheckoutBox]);
  const [info, setInfo] = useState(null);
  const [bookid , setBookId] = useState(null);  
  const animatedHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "90%"],
  });

  const OrderBook = async () => {
    const response = await apiRequest("post", "/order/", { book_id: bookid });
    if (response.success) {
      setInfo("Order successful");
      checkOwnership();
      setShowCheckoutBox(false);
      console.log(response.data);
    }
    else {
      setInfo(response.error);
    }
  };
  useEffect(() => {
    setBookId(book.id);
  },[book])
  return (
    <>
    <InfoCard info={info} setInfo={setInfo} />
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
            <Text
              className="font-primaryRegular text-lg"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {book.title}
            </Text>
            <Text className="font-primaryRegular text-lg">
              Total: ${book.price}
            </Text>
          </View>
          <Text className="text-center font-primaryBlack text-2xl">
            Pay with
          </Text>
          <TouchableOpacity onPress={OrderBook} className="flex-row items-center justify-center my-4 shadow-lg shadow-black bg-white p-4 rounded-xl">
            <Image source={images.chapa} className="" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-center my-4 shadow-lg shadow-black bg-white p-4 rounded-xl">
            <Image source={images.stripe} className="p-4  " />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

export default Checkout;
