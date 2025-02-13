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
import { faDownload, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { apiRequest } from "../../utils/apiRequest";
import InfoCard from "../../components/InfoCard";
import { router } from "expo-router";
import { RefreshControl } from "react-native-gesture-handler";
import shadowStyles from "../../constants/shadowStyles";
import { downloadFile } from "../../utils/downloader";
import * as FileSystem from "expo-file-system";
import * as Progress from "react-native-progress"; // Import circular progress

const DOWNLOAD_DIR = FileSystem.documentDirectory + "downloads/";

const Library = () => {
  const [library, setLibrary] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({});

  const handleRefresh =async () => {
    setLoading(true);
    setRefreshing(true);
    await fetchLibrary();
    setRefreshing(false);
    setLoading(false);
  };

  const checkDownloadStatus = async (id) => {
    const metadataUri = DOWNLOAD_DIR + "metadata.json";
    if ((await FileSystem.getInfoAsync(metadataUri)).exists) {
      const metadata = await FileSystem.readAsStringAsync(metadataUri);
      const data = JSON.parse(metadata);
      return data.some((item) => item.id === id);
    }
    return false;
  }; 

  const fetchLibrary = async () => {
    const response = await apiRequest("get", "/library/");
    if (response.success) {
      const updatedLibrary = await Promise.all(
        response.data.map(async (item) => {
          const isDownloaded = await checkDownloadStatus(item.book.id);
          return { ...item, downloaded: isDownloaded };
        })
      );
      setLibrary(updatedLibrary);
    } else {
      setInfo(response.error);
    }
    setLoading(false);
  };
  

  const downloadContent = (content) => {
    const { book } = content;
    setDownloadProgress((prev) => ({ ...prev, [book.id]: 0 })); // initial progress

    downloadFile(
      book.id,
      book.ebook,
      book.cover,
      book.title,
      book.author.name,
      (progress) => {
        setDownloadProgress((prev) => ({ ...prev, [book.id]: progress }));
      }
    ).then((data) => {
      console.log("File downloaded to (log from library.jsx):", data);
      setDownloadProgress((prev) => ({ ...prev, [book.id]: null })); 
      setLibrary((prevLibrary) => 
        prevLibrary.map((item) =>
          item.book.id === book.id ? { ...item, downloaded: true } : item
        )
      )
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
              renderItem={({ item }) => {
                return (
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

                      {downloadProgress[item?.book?.id] !== null &&
                      downloadProgress[item?.book?.id] > 0 ? (
                        <TouchableOpacity className="p-4 mt-auto">
                          <Progress.Circle
                            size={20}
                            progress={downloadProgress[item?.book?.id]}
                            color="#FF9100"
                            showsText={false}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => downloadContent(item)}
                          disabled={item.downloaded}
                          className="p-4 mt-auto"
                        >
                          <FontAwesomeIcon
                            icon={item.downloaded ? faCircleCheck : faDownload}
                            size={20}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                );
              }}
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
