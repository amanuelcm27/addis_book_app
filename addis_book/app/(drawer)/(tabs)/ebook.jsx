import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
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
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 10; // Number of books per request

  const fetchBooks = async (newOffset = 0, append = false) => {
    if (!hasMore) return;
    if (newOffset > 0) setLoadingMore(true);
    else setLoading(true);

    const response = await apiRequest(
      "get",
      `/ebooks/?limit=${LIMIT}&offset=${newOffset}`
    );
    if (response.success) {
      setHasMore(response.data.next !== null);
      setBooks((prevBooks) =>
        append
          ? [...prevBooks, ...response.data.results]
          : response.data.results
      );
      setOffset(newOffset); 
    } else {
      setInfo(response.error);
    }
    setLoading(false);
    setLoadingMore(false);
  };
  const handleLoadMore = () => {
    if (!loadingMore) {
      fetchBooks(offset + LIMIT, true);
    }
  };
  const handleRefresh = async () => {
    setHasMore(true);
    setLoading(true);
    setRefreshing(true);
    await fetchBooks(0, false);
    setRefreshing(false);
    setLoading(false);
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <>
      <InfoCard setInfo={setInfo} info={info} />
      <View className="flex-row flex-wrap justify-between mx-4 my-6 ">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} isLoading={true} customStyles={"w-[48%]"}>
              <View className="h-[300px] w-[170px] m-2 relative rounded-xl bg-white overflow-hidden"></View>
            </Skeleton>
          ))
        ) : (
          <FlatList
            data={books}
            numColumns={2}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
              <LargeBookCard key={item.id} styles="w-[48%] mb-4" item={item} />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore} // Load more when reaching bottom
            onEndReachedThreshold={0.4} 
            ListFooterComponent={
              loadingMore ? (
                <ActivityIndicator size="large" color="#FF9100" />
              ) : null
            }
          />
        )}
      </View>
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
