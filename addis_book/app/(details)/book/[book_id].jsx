import React, { memo, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import CustomButton from "../../../components/CustomButton";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import images from "../../../constants/images";
import { StatusBar } from "expo-status-bar";
import Checkout from "../../(checkout)/checkout";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../utils/api";
import DetailScreenHeader from "../../../components/DetailScreenHeader";
import { apiRequest } from "../../../utils/apiRequest";
const BookDetail = memo(() => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showCheckoutBox, setShowCheckoutBox] = useState(false);
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const { book_id } = useLocalSearchParams();
  const handleBuying = () => {
    if (!loading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else {
      setShowCheckoutBox(true);
    }
  };
  const [book, setBook] = useState({});
  const [loadingBook, setLoadingBook] = useState(true);
  const fetchBook = async () => {
    const response = await apiRequest("get", `/book/${book_id}`);
    if (response.success) {
      setBook(response.data);
      setLoadingBook(false);
      console.log(response.data);
    } else {
      console.log(" error log from book detail  ", response.error);
    }
  };
  useEffect(() => {
    fetchBook();
  }, [book_id]);

  return (
    <>
      {loadingBook ? (
        <SafeAreaView className="bg-white h-full justify-center items-center">
          <ActivityIndicator size="large" color="#FF9100" />
        </SafeAreaView>
      ) : (
        <SafeAreaView className="bg-white h-full relative">
          <DetailScreenHeader book={book} scrollY={scrollY} />
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
                  {book.title}
                </Text>
                <Text className="text-lg font-primaryItalic text-gray-500">
                  by {book.author?.name}
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
                    {book.genre?.map((item) => `${item.name},`)}
                  </Text>
                </View>
                <View className="w-1/2 py-2">
                  <Text className="font-primaryBold">Language</Text>
                  <Text className="text-gray-600">{book.language}</Text>
                </View>
              </View>
            </View>
          </Animated.ScrollView>

          <CustomButton
            text={`Buy ${book.price}`}
            background="bg-[#FF9100]"
            textColor="text-white"
            onClick={handleBuying}
          />

          <Checkout
            showCheckoutBox={showCheckoutBox}
            setShowCheckoutBox={setShowCheckoutBox}
          />
        </SafeAreaView>
      )}
      <StatusBar style="dark" />
    </>
  );
});

export default BookDetail;
