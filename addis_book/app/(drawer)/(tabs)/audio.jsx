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
import ContentHeader from "../../../components/ContentHeader";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { RefreshControl } from "react-native-gesture-handler";
import { apiRequest } from "../../../utils/apiRequest";
import Skeleton from "../../../components/SkeletonLoader";
import InfoCard from "../../../components/InfoCard";
import RecentPlayed from "../../activity/RecentPlayed";

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
                <Skeleton key={index} isLoading={true} customStyles={"w-[48%]"}>
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
