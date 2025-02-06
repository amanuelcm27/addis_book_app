import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import SmallBookCard from "../../../components/SmallBookCard";
import BookCardContainer from "../../../components/BookCardContainer";
import images from "../../../constants/images";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import api from "../../../utils/api";
import { RefreshControl } from "react-native-gesture-handler";
import { apiRequest } from "../../../utils/apiRequest";

const Home = () => {
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    const response = await apiRequest("get", "/books");
    if (response.success) {
      setBooks(response.data);
      console.log(response.data);
    } else {
      console.log(response.error);
    }
  };
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchBooks();
    setRefreshing(false);
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <SafeAreaView className="h-full">
      <View
        className="bg-primary flex-row h-[50px] items-center p-4"
        style={{
          shadowOffset: { width: 5, height: 5 },
          shadowColor: "black",
          shadowOpacity: 1,
          shadowRadius: 5,
          elevation: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          activeOpacity={0.6}
        >
          <FontAwesomeIcon icon="fa-bars" color="white" size={24} />
        </TouchableOpacity>
        <View className="ml-auto">
          <Image source={images.logo} className="w-16 h-16" />
        </View>
      </View>
      <ScrollView
        className="w-full"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#FF9100"]}
            tintColor={"#FF9100"}
          />
        }
      >
        <View className="flex-row flex-wrap justify-between my-6 mx-4">
          {books.length > 0 &&
            books.slice(0,6).map((book) => (
              <SmallBookCard
                key={book.id}
                imageSource={book.cover}
                title={book.title}
                id={book.id}
              />
            ))}
        </View>
        <BookCardContainer books={books} contains="Trending" />
        <BookCardContainer books={books.slice().reverse()} contains="Latest" />
        <BookCardContainer
          books={[...books].sort(() => Math.random() - 0.5)}
          contains="Recommended"
        />
      </ScrollView>
      <StatusBar backgroundColor="#FF9100" style="auto" />
    </SafeAreaView>
  );
};

export default Home;
