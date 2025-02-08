import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LargeBookCard from "../../../components/LargeBookCard";
import images from "../../../constants/images";
import ContentHeader from "../../../components/ContentHeader";
import { TabView, SceneMap, TabBar } from "react-native-tab-view"; // Keep TabView for transitions
import api from "../../../utils/api";
import { RefreshControl } from "react-native-gesture-handler";
import { apiRequest } from "../../../utils/apiRequest";
import Skeleton from "../../../components/SkeletonLoader";
import InfoCard from "../../../components/InfoCard";

const trendingBooks = [
  { id: "1", imageSource: images.animal, title: "Animal Farm", type: "audio" },
  { id: "2", imageSource: images.atlas, title: "Atlas" },
  { id: "3", imageSource: images.got, title: "Game of Thrones", type: "audio" },
  { id: "4", imageSource: images.htw, title: "How to Win Friends" },
  {
    id: "5",
    imageSource: images.unscripted,
    title: "Unscripted",
    type: "audio",
  },
];

const RecentPlayed = () => {
  return (
    <ScrollView>
      <View className="flex-row flex-wrap justify-between mx-4 my-6">
        {trendingBooks.map((book) => (
          <LargeBookCard key={book.id} styles={"w-[48%] mb-4"} item={book} />
        ))}
      </View>
    </ScrollView>
  );
};

const AllAudio = () => {
  const [books, setBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const handleRefresh = async () => {
    setLoading(true);
    setRefreshing(true);
    await fetchBooks();
    setRefreshing(false);
    setLoading(false);
  };
  const fetchBooks = async () => {
    const response = await apiRequest("get", "/audiobooks");
    if (response.success) {
      setBooks(response.data);
      setLoading(false);
    } else {
      setInfo(response.error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <>
      <InfoCard info={info} setInfo={setInfo} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View className="flex-row flex-wrap justify-between mx-4 my-6">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} isLoading={true} customStyles={'w-[48%]'}>
                  <View className="h-[300px] m-2 relative rounded-xl bg-white overflow-hidden"></View>
                </Skeleton>
              ))
            : books.map((book) => (
                <LargeBookCard
                  key={book.id}
                  styles={"w-[48%] mb-4"}
                  hasAudio={true}
                  item={book}
                />
              ))}
        </View>
      </ScrollView>
    </>
  );
};

const audiobook = () => {
  const [index, setIndex] = useState(0); // State to control active tab
  const [routes] = useState([
    { key: "all", title: "All" },
    { key: "recent", title: "Recently Played" },
  ]);

  const renderScene = SceneMap({
    all: AllAudio,
    recent: RecentPlayed,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor="#FF9100"
      inactiveColor="black"
      indicatorStyle={{ backgroundColor: "#FF9100" }}
      style={{ backgroundColor: "white", elevation: 0, marginHorizontal: 10 }}
    />
  );
  return (
    <SafeAreaView className="h-full bg-white">
      <ContentHeader text={"Browse Audio Books"} icon={"fa-headphones"} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

export default audiobook;
