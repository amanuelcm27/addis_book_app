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
const trendingBooks = [
  { id: "3", imageSource: images.got, title: "Game of Thrones", type: "audio" },

  { id: "1", imageSource: images.animal, title: "Animal Farm", type: "audio" },
  { id: "2", imageSource: images.atlas, title: "Atlas" },
  {
    id: "5",
    imageSource: images.unscripted,
    title: "Unscripted",
    type: "audio",
  },
  { id: "4", imageSource: images.htw, title: "How to Win Friends" },
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

const AllEbook = () => {
  const [books, setBooks] = useState([]);
  const fetchBooks = async () => {
    const response = await apiRequest('get', '/ebooks');
    if (response.success) {
      setBooks(response.data);
      console.log(response.data);
    }
    else {
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
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
      <View className="flex-row flex-wrap justify-between mx-4 my-6">
        {books.map((book) => (
          <LargeBookCard key={book.id} styles={"w-[48%] mb-4"} item={book} />
        ))}
      </View>
    </ScrollView>
  );
};

const ebook = () => {
  const [index, setIndex] = useState(0); // State to control active tab
  const [routes] = useState([
    { key: "all", title: "All" },
    { key: "recent", title: "Recently Played" },
  ]);

  const renderScene = SceneMap({
    all: AllEbook,
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
      <ContentHeader text={"Browse Ebooks"} icon={"fa-headphones"} />
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

export default ebook;
