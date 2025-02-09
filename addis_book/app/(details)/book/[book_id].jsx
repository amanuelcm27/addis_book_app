import React, { memo, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CustomButton from "../../../components/CustomButton";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Checkout from "../../(checkout)/checkout";
import { useAuth } from "../../../context/AuthContext";
import DetailScreenHeader from "../../../components/DetailScreenHeader";
import { apiRequest } from "../../../utils/apiRequest";
import InfoCard from "../../../components/InfoCard";
const BookDetail = memo(() => {
  const [showCheckoutBox, setShowCheckoutBox] = useState(false);
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const { book_id } = useLocalSearchParams();
  const [info, setInfo] = useState(null);
  const [ownsBook, setOwnsBook] = useState(false);
  const handleBuying = () => {
    if (!loading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else {
      setShowCheckoutBox(true);
    }
  };
  const [scrollY] = useState(new Animated.Value(0)); 
  const opacityInterpolate = scrollY.interpolate({
    inputRange: [0, 100], 
    outputRange: [0, 1], 
    extrapolate: "clamp",
  });
  const [book, setBook] = useState({});
  const [loadingBook, setLoadingBook] = useState(true);
  const fetchBook = async () => {
    const response = await apiRequest("get", `/book/${book_id}`);
    if (response.success) {
      setBook(response.data);
      setLoadingBook(false);
    } else {
      setInfo(response.error);
    }
  };
  const checkOwnership = async () => { 
    const response = await apiRequest('post' , '/check-ownership/' , {book_id : book_id});
    if(response.success){
      data = response.data;
      setOwnsBook(response.data.owns_book); 
    }  
  }
  
  useEffect(() => {
    fetchBook(); 
    checkOwnership(); 
  }, [book_id]);  

  return (
    <>
      <InfoCard info={info} setInfo={setInfo} />
      {loadingBook ? (
        <SafeAreaView className="bg-white h-full justify-center items-center">
          <ActivityIndicator size="large" color="#FF9100" />
        </SafeAreaView>
      ) : (
        <SafeAreaView className="bg-white h-full">
          <View className="relative">
            <Animated.View
              style={{
                position: "absolute",
                width: "100%",
                height: 65,
                zIndex: 20,
                opacity: opacityInterpolate,
              }}
            >
                <ImageBackground
                  source={{ uri: book.cover }}
                  blurRadius={10}
                  className="flex-row h-full  items-center  gap-2 p-4"
                >
                  <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesomeIcon
                      icon="fa-angle-left"
                      color="white"
                      size={30}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.6} className="flex-1">
                    <Text
                      className="text-white text-lg font-primaryBold"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {book.title}
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
            </Animated.View>
          </View>

          <ScrollView
            style={{ position: "relative", zIndex: 10 }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            <DetailScreenHeader book={book} scrollY={scrollY} />
            <View className="mx-4 my-4 flex-row ">
              <View className="flex-1">
                <Text className="text-2xl font-primaryBlackItalic ">
                  {book.title}
                </Text>
                <Text className="text-lg font-primaryItalic text-gray-500">
                  by {book.author?.name}
                </Text>
              </View>
            </View>
            <View className=" mx-4 flex-row gap-2">
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
            <View className="mx-6">
              <Text className="font-primaryRegular py-4">Summary</Text>
              <Text className="font-primaryRegular">{book.summary}</Text>
            </View>
            <View className="mx-6">
              <Text className="font-primaryRegular py-4">Details</Text>
              <View className="flex-row flex-wrap">
                <View className="w-1/2 py-2">
                  <Text className="font-primaryBold">Author</Text>
                  <Text
                    onPress={() => {
                      router.push(`/author/${book?.author?.id}`);
                    }}
                    className="text-[#FF9100]"
                    disabled={!book.author?.id}
                  >
                    {book.author?.name || "N/A"}
                  </Text>
                </View>
                <View className="w-1/2 py-2">
                  <Text className="font-primaryBold">Narrator</Text>
                  <Text
                    onPress={() =>
                      router.push(`/narrator/${book?.narrator?.id}`)
                    }
                    className="text-[#FF9100]"
                    disabled={!book.narrator?.id}
                  >
                    {book.narrator?.name || "N/A"}
                  </Text>
                </View>
                <View className="w-1/2 py-2">
                  <Text className="font-primaryBold">Genre</Text>
                  <Text className="text-gray-600 pr-2">
                    {book.genres?.map((item) => `${item.name},`)}
                  </Text>
                </View>
                <View className="w-1/2 py-2">
                  <Text className="font-primaryBold">Language</Text>
                  <Text className="text-gray-600">{book.language}</Text>
                </View>
                <View className="w-1/2 py-2">
                  <Text className="font-primaryBold">Published</Text>
                  <Text className="text-gray-600">
                    {book.published || "N/A"}
                  </Text>
                </View>
                <View className="w-1/2 py-2">
                  <Text className="font-primaryBold">Pages</Text>
                  <Text className="text-gray-600">
                    {book.page_count || "N/A"}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <CustomButton
            text={ownsBook ? `In Library` :`Buy ${book.price} ${book.currency}`}
            background={ownsBook ? 'bg-[#545353]':"bg-[#FF9100]"}
            textColor="text-white"
            onClick={ownsBook ? () => router.push('/setting') : handleBuying}
              
          />

          <Checkout
            checkOwnership={checkOwnership}
            book={book}
            showCheckoutBox={showCheckoutBox}
            setShowCheckoutBox={setShowCheckoutBox}
          />
        </SafeAreaView>
      )}
      <StatusBar style="light" backgroundColor="black" />
    </>
  );
});

export default BookDetail;
