import { View, Text, ScrollView } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { RefreshControl } from "react-native-gesture-handler";
import { apiRequest } from "../../utils/apiRequest";
import LargeBookCard from "../../components/LargeBookCard";
import Skeleton from "../../components/SkeletonLoader";
import InfoCard from "../../components/InfoCard";

const RecentOpened = () => {
  const [recentBooks, setRecentBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [info, setInfo] = useState(null);
  const fetchRecentOpenedBooks = async () => {
    const response = await apiRequest("get", "recently_read/");
    if (response.success) {
      setRecentBooks(response.data);
      setLoading(false);
    } else {
      setInfo(response.error);
    }
  };
  const handleRefresh = async () => {
    setLoading(true);
    setRefreshing(true);
    await fetchRecentOpenedBooks();
    setRefreshing(false);
    setLoading(false);
  };
  useEffect(() => {
    fetchRecentOpenedBooks();
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
            : recentBooks.map((item) => (
                <LargeBookCard
                  key={item.id}
                  styles={"w-[48%] mb-4"}
                  item={item?.book}
                />
              ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RecentOpened;
