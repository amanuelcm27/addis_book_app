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
const AuthorDetail = () => {
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
  const [author , setAuthor] = useState({});
  
  const  { author_id } = useLocalSearchParams();
  const fetchAuthor = async () => { 
    const response = await apiRequest("get", `/author/${author_id}`);
    if (response.success) {
      setAuthor(response.data);
      console.log(response.data);
    } else {
      console.log(response.error);
    }
  }
  useEffect(() => {
    fetchAuthor();
    console.log(author)
  }, [author_id]);
  return (
    <>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="h-[150px] relative">
            <View className="bg-[#EF0FA0] h-[100px] flex justify-end items-end">
              <Text className="text-2xl p-4 text-white font-primaryExtraBoldItalic">
                {author?.name}
              </Text>
            </View>

            <Image
              className="absolute w-28 h-28 mx-4 bottom-0 rounded-full"
              source={{
                uri:author?.photo
              }}
            />
            <View className="ml-auto mr-8 my-4">
              <FontAwesomeIcon icon="fa-user-pen" size={32} />
            </View>
          </View>
          <View className="my-4 mx-4">
            <Text className="text-xl font-primaryItalic">About Author</Text>
            <View className="border-l-2 border-gray-300 my-2 p-4">
              <Text className="text-base font-primaryRegular">
                {author?.about}
              </Text>
            </View>
          </View>
          <View className="my-4 mx-4">
            <Text className="text-xl font-primaryItalic">
              Books by {author?.name}
            </Text>
            <BookCardContainer books={author?.books || []} />
          </View>
        </ScrollView>
        <BackButton />
      </SafeAreaView>
      <StatusBar backgroundColor="#EF0FA0" style="light" />
    </>
  );
};

export default AuthorDetail;
