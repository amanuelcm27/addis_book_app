import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import images from "../../../constants/images";
import { StatusBar } from "expo-status-bar";
import BookCardContainer from "../../../components/BookCardContainer";
import BackButton from "../../../components/BackButton";
import { useLocalSearchParams } from "expo-router";
import { apiRequest } from "../../../utils/apiRequest";
import { set } from "react-native-reanimated";
const NarratorDetail = () => {
  const trendingBooks = [
    {
      id: "1",
      imageSource: images.animal,
      title: "Animal Farm",
      type: "audio",
    },
    {
      id: "3",
      imageSource: images.got,
      title: "Game of Thrones",
      type: "audio",
    },
    {
      id: "5",
      imageSource: images.unscripted,
      title: "Unscripted",
      type: "audio",
    },
  ];
  const { narrator_id , currentColor } = useLocalSearchParams();
  const [narrator, setNarrator] = useState({});
  const fetchNarrator = async () => {
    const response = await apiRequest("get", `/narrator/${narrator_id}`);
    if (response.success) {
      setNarrator(response.data);
    } else {
      console.log(response.error);
    }
  };
  useEffect(() => {
    fetchNarrator();

  }, [narrator_id]);
  console.log(narrator);
  
  return (
    <>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="h-[150px] relative">
            <View style={{backgroundColor:currentColor ? currentColor : "black"  }} className=" h-[100px] flex justify-end items-end">
              <Text className="text-2xl p-4 text-white font-primaryExtraBoldItalic">
                {narrator?.name}
              </Text>
            </View>

            <Image
              className="absolute w-28 h-28 mx-4 bottom-0 rounded-full"
              source={{
                uri: narrator?.photo,
              }}
            />
            <View className="ml-auto mr-8 my-4">
              <FontAwesomeIcon icon={"fa-wave-square"} size={32} />
            </View>
          </View>
          <View className="my-4 mx-4">
            <Text className="text-xl font-primaryItalic">About Narrator</Text>
            <View className="border-l-2 border-gray-300 my-2 p-4">
              <Text className="text-base font-primaryRegular">
                {narrator?.about}
              </Text>
            </View>
          </View>
          <View className="my-4 mx-4">
            <Text className="text-xl font-primaryItalic">
              Narrations by {narrator?.name}
            </Text>
            <BookCardContainer books={narrator?.narrated_books || []} />
          </View>
        </ScrollView>
        <BackButton />
      </SafeAreaView>
      <StatusBar backgroundColor={`${currentColor ? currentColor : "black"}`} style="light" />
    </>
  );
};

export default NarratorDetail;
