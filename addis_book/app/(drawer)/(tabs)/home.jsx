import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import SmallBookCard from "../../../components/SmallBookCard";
import BookCardContainer from "../../../components/BookCardContainer";
import images from "../../../constants/images";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { RefreshControl } from "react-native-gesture-handler";
import { apiRequest } from "../../../utils/apiRequest";
import Skeleton from "../../../components/SkeletonLoader";
import InfoCard from "../../../components/InfoCard";
import { useAuth } from "../../../context/AuthContext";
const Home = () => {
  const navigation = useNavigation();
  const [books, setBooks] = useState([]);
  const [info, setInfo] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const fetchBooks = async () => {
    const response = await apiRequest("get", "/books/");
    if (response.success) {
      setBooks(response.data.results);
      setLoading(false);
    } else {
      setInfo(response.error);
    }
  };
  const fetchActivity = async () => {
    const response = await apiRequest("get", "/all_activity/");
    if (response.success) {
      setRecentActivity(response.data);
    } else {
      setInfo(response.error);
    }
  };
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleRefresh = async () => {
    setLoading(true);
    setRefreshing(true);
    await fetchActivity();
    await fetchBooks();
    setRefreshing(false);
    setLoading(false);
  };
  useEffect(() => {
    fetchBooks();
    fetchActivity();
  }, []);

  return (
    <>
      <InfoCard info={info} setInfo={setInfo} />
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
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    isLoading={true}
                    customStyles={"w-[48%] mb-4"}
                  >
                    <View className="flex-row w-[48%] mb-4 h-[70px] rounded-md bg-white items-center"></View>
                  </Skeleton>
                ))
              : recentActivity
                  .map((book) => (
                    <SmallBookCard
                      imageSource={book.cover}
                      title={book.title}
                      id={book.id}
                    />
                  ))}
          </View>

          <BookCardContainer
            loading={loading}
            books={books}
            contains="Trending"
          />
          <BookCardContainer
            loading={loading}
            books={books.slice().reverse()}
            contains="Latest"
          />
          <BookCardContainer
            loading={loading}
            books={[...books].sort(() => Math.random() - 0.5)}
            contains="Recommended"
          />
        </ScrollView>
        <StatusBar backgroundColor="#FF9100" style="auto" />
      </SafeAreaView>
    </>
  );
};

export default Home;
