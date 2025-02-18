import { View, FlatList, Dimensions, ActivityIndicator } from "react-native";
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
import { usePlayback } from "../../../context/PlayBackContext";

const AllAudio = () => {
  const [books, setBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 10; // Number of books per request
  const { setIsVisible , currentTrack , loadTrack} = usePlayback();
  const fetchBooks = async (newOffset = 0, append = false) => {
    if (!hasMore) return;
    if (newOffset > 0) setLoadingMore(true);
    else setLoading(true);
    const response = await apiRequest(
      "get",
      `/audiobooks/?limit=${LIMIT}&offset=${newOffset}`
    );
    if (response.success) {
      setHasMore(response.data.next !== null);
      setBooks((prevBooks) =>
        append
          ? [...prevBooks, ...response.data.results]
          : response.data.results
      );
      setOffset(newOffset); // Update offset
      setLoading(false);
      setLoadingMore(false);
    } else {
      setInfo(response.error);
    }

  };
  const handleLoadMore = () => {
    if (!loadingMore && !refreshing && hasMore) {
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
  const playAudio = (book) => {
    if (currentTrack && currentTrack.id === book.id) {
      setIsVisible(true);
    } else {
      loadTrack({
        id: book.id,
        audioUri: book.audio_book,
        title: book.title,
        cover: book.cover,
        author: book.author.name,
      });
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <>
      <InfoCard info={info} setInfo={setInfo} />
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
              <LargeBookCard
                key={item.id}
                styles="w-[48%] mb-4"
                hasAudio={true}
                item={item}
                playAudio={playAudio}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore} // Load more when reaching bottom
            onEndReachedThreshold={0.4} // Trigger when halfway to the bottom
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
