import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import shadowStyles from "../../constants/shadowStyles";
import * as FileSystem from "expo-file-system";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { router } from "expo-router";
import EmptyCard from "../../components/EmptyCard";

const DOWNLOAD_DIR = FileSystem.documentDirectory + "downloads/";
const downloads = () => {
  const [downloadedBooks, setDownloadedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
    setLoading(true);
    setRefreshing(true);
    await listDownloads();
    setRefreshing(false);
    setLoading(false);
  };
  const deleteDownload = async (fileUri, coverUri, id) => {
    const metadataUri = DOWNLOAD_DIR + "metadata.json";
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) await FileSystem.deleteAsync(fileUri);
      const coverInfo = await FileSystem.getInfoAsync(coverUri);
      if (coverInfo.exists) await FileSystem.deleteAsync(coverUri);
      const metadata = await FileSystem.readAsStringAsync(metadataUri);
      const data = JSON.parse(metadata);
      const updatedData = data.filter((item) => item.id !== id);
      await FileSystem.writeAsStringAsync(
        metadataUri,
        JSON.stringify(updatedData)
      );
      listDownloads();
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const listDownloads = async () => {
    const jsonpath = DOWNLOAD_DIR + "metadata.json";
    if ((await FileSystem.getInfoAsync(jsonpath)).exists) {
      const books = await FileSystem.readAsStringAsync(jsonpath);
      const parsedBookList = JSON.parse(books);
      setDownloadedBooks(parsedBookList);
    }
    setLoading(false);
  };
  useEffect(() => {
    listDownloads();
  }, []);
  return (
    <>
      {loading ? (
        <View  className="h-full items-center justify-center">
          <ActivityIndicator color={"#FF9100"} size={30} />
        </View>
      ) : (
        <View className="mx-4 my-2">
          <Text className="font-primaryBlack text-2xl">Downloads</Text>
          <FlatList
            data={downloadedBooks}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View key={item.id} className="bg-white rounded-lg my-2">
                <View
                  className="flex-row items-center h-[80px] rounded-lg overflow-hidden"
                  style={shadowStyles.shadow}
                >
                  <Image
                    source={{ uri: item?.cover }}
                    className="w-[25%] h-full"
                  />
                  <TouchableOpacity
                    onPress={() => router.push(`/book/${item?.id}`)}
                    className="p-4 flex-1"
                  >
                    <Text
                      className="text-xl font-primaryBold"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.title}
                    </Text>
                    <Text className="text-sm font-primaryRegular">
                      by <Text className="text-gray-500">{item.author}</Text>
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      deleteDownload(item.fileUri, item.cover, item.id)
                    }
                    className="p-4 mt-auto"
                  >
                    <FontAwesomeIcon icon="fa-trash" size={16} />
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
                goto={'/setting?initialTab=2'}
                text={"Your have no downloads"}
                buttonText={"Download here"}
              />
            }
          />
        </View>
      )}
    </>
  );
};

export default downloads;
