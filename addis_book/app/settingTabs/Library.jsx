import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import EmptyCard from "../../components/EmptyCard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { apiRequest } from "../../utils/apiRequest";
import InfoCard from "../../components/InfoCard";
import { router } from "expo-router";
import { RefreshControl } from "react-native-gesture-handler";
import shadowStyles from "../../constants/shadowStyles";
import { downloadFile } from "../../utils/downloader";
import * as FileSystem from "expo-file-system";

const DOWNLOAD_DIR = FileSystem.documentDirectory + "downloads/";
const Library = () => {
  const [library, setLibrary] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setLoading(true);
    setRefreshing(true);
    fetchLibrary();
    setRefreshing(false);
    setLoading(false);
  };
  const fetchLibrary = async () => {
    const response = await apiRequest("get", "/library/");
    if (response.success) {
      setLibrary(response.data);
    } else {
      setInfo(response.error);
    }
    setLoading(false);
  };

  const downloadContent = (content) => {
    const { book } = content;
    downloadFile(
      book.id,
      book.ebook,
      book.cover,
      book.title,
      book.author.name
    ).then((data) => {
      console.log("File downloaded to (log from library.jsx):", data);
    });
  };
  useEffect(() => {
    fetchLibrary();
  }, []);
  return (
    <>
      {loading ? (
        <View className="h-full items-center justify-center">
          <ActivityIndicator color={"#FF9100"} size={30} />
        </View>
      ) : (
        <View className="flex-1">
          <InfoCard info={info} setInfo={setInfo} />
          <View className="mx-4 my-4">
            <FlatList
              data={library}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View className="rounded-lg my-2" style={shadowStyles.shadow}>
                  <View className="flex-row items-center h-[80px] rounded-lg overflow-hidden">
                    <Image
                      source={{ uri: item?.book?.cover }}
                      className="w-[25%] h-full"
                    />
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => router.push(`/book/${item?.book?.id}`)}
                      className="p-4 flex-1"
                    >
                      <Text
                        className="text-xl font-primaryBold"
                        numberOfLines={1}
                      >
                        {item?.book.title}
                      </Text>
                      <Text className="text-sm font-primaryRegular">
                        by{" "}
                        <Text className="text-gray-500">
                          {item?.book?.author.name}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => downloadContent(item)}
                      className="p-4 mt-auto"
                    >
                      <FontAwesomeIcon icon="fa-download" size={24} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={["#FF9100"]}
                  tintColor={"#FF9100"}
                />
              }
              contentContainerStyle={{ paddingBottom: 20 }}
              ListEmptyComponent={
                <EmptyCard
                  goto={"/ebook"}
                  text={"Your Library is empty"}
                  buttonText={"Buy here"}
                />
              }
            />
          </View>
        </View>
      )}
    </>
  );
};

export default Library;
