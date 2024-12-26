import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StatusBar } from "expo-status-bar";
import FormField from "../../components/FormField";
import LargeBookCard from "../../components/LargeBookCard";
import images from "../../constants/images";
import ContentHeader from "../../components/ContentHeader";
const search = () => {
  const filters = [
    {
      id: "1",
      filter: "Adventure",
    },
    {
      id: "2",
      filter: "Biography",
    },
    {
      id: "3",
      filter: "Science",
    },
    {
      id: "4",
      filter: "Romance",
    },
    {
      id: "5",
      filter: "Non-Fiction",
    },
  ];

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
      <ScrollView>
        <ContentHeader text={"search for books"} icon={"fa-search"} />
        <View className="">
          <FormField
            containerStyle={"mx-4"}
            inputContainerStyle={"rounded-[50] "}
            inputStyle={"text-black font-primaryRegular"}
            placeholder={"search by title"}
          />
        </View>
        <View className="mx-4 items-center  my-4">
          <FlatList
            data={filters}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.85}>
                <View className="rounded-full my-2 p-4 shadow-sm shadow-black  bg-white">
                  <Text>{item.filter}</Text>
                </View>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 4 }}
          />
        </View>
        <View className="flex-row flex-wrap justify-between mx-4 my-6">
          {trendingBooks.map((book, index) => (
            <LargeBookCard key={book.id} styles={"w-[48%] mb-4"} item={book} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default search;
