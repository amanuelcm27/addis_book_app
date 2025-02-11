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
import InfoCard from "../../../components/InfoCard";
import Skeleton from "../../../components/SkeletonLoader";
import RecentOpened from "../../activity/RecentRead";



const AllEbook = () => {
  const [books, setBooks] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBooks = async () => {
    const response = await apiRequest("get", "/ebooks/");
    if (response.success) {
      setBooks(response.data);
      setLoading(false);
    } else {
      setInfo(response.error);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    setRefreshing(true);
    await fetchBooks();
    setRefreshing(false);
    setLoading(false);
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <>
      <InfoCard setInfo={setInfo} info={info} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View className="flex-row flex-wrap justify-between mx-4 my-6">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} isLoading={true} customStyles={"w-[48%]"}>
                  <View className="h-[300px] w-[170px] m-2 relative rounded-xl bg-white overflow-hidden"></View>
                </Skeleton>
              ))
            : books.map((book) => (
                <LargeBookCard
                  key={book.id}
                  styles={"w-[48%] mb-4"}
                  item={book}
                />
              ))}
        </View>
      </ScrollView>
    </>
  );
};

const ebook = () => {
  const [index, setIndex] = useState(0); // State to control active tab
  const [routes] = useState([
    { key: "all", title: "All" },
    { key: "recent", title: "Recently Read" },
  ]);

  const renderScene = SceneMap({
    all: AllEbook,
    recent: RecentOpened,
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
