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
import { SafeAreaView } from "react-native-safe-area-context";
import shadowStyles from "../../constants/shadowStyles";
import * as FileSystem from "expo-file-system";
import { RefreshControl } from "react-native-gesture-handler";
import { router } from "expo-router";

const DOWNLOAD_DIR = FileSystem.documentDirectory + "downloads/";
const downloads = () => {
  const [downloadedBooks, setDownloadedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setLoading(true);
    setRefreshing(true);
    listDownloads();
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
    setLoading(true);
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
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {loading ? (
        <View>
          <ActivityIndicator color={"#FF9100"} size={30} />
        </View>
      ) : (
        <View className="mx-4 my-2">
          <Text className="font-primaryBlack text-2xl">Downloads</Text>

          {downloadedBooks.map((book) => (
            <View key={book.id} className="bg-white rounded-lg my-2">
              <View
                className="flex-row items-center h-[80px] rounded-lg overflow-hidden"
                style={shadowStyles.shadow}
              >
                <Image
                  source={{ uri: book.cover }}
                  className="w-[25%] h-full"
                />
                <TouchableOpacity
                  onPress={() => router.push(`/book/${book?.id}`)}
                  className="p-4 flex-1"
                >
                  <Text
                    className="text-xl font-primaryBold"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {book.title}
                  </Text>
                  <Text className="text-sm font-primaryRegular">
                    by <Text className="text-gray-500">{book.author}</Text>
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    deleteDownload(book.fileUri, book.cover, book.id)
                  }
                  className="p-4 mt-auto"
                >
                  <FontAwesomeIcon icon="fa-trash" size={16} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default downloads;
