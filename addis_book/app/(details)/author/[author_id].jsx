import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import images from "../../../constants/images";
import { StatusBar } from "expo-status-bar";
import BookCardContainer from "../../../components/BookCardContainer";
import BackButton from "../../../components/BackButton";
import { useLocalSearchParams } from "expo-router";
import { apiRequest } from "../../../utils/apiRequest";
import InfoCard from "../../../components/InfoCard";
import Skeleton from "../../../components/SkeletonLoader";


const AuthorDetail = () => {
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const { author_id, currentColor } = useLocalSearchParams();
  const fetchAuthor = async () => {
    setLoading(true);
    const response = await apiRequest("get", `/author/${author_id}`);
    if (response.success) {
      setAuthor(response.data);
    } else {
      setInfo(response.error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchAuthor();
  }, [author_id]);
  return (
    <>
      <InfoCard info={info} setInfo={setInfo} />
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="h-[150px] relative">
            {loading ? (
              <Skeleton isLoading={true}>
                <View className="h-[100px]"></View>
              </Skeleton>
            ) : (
              <View
                style={{
                  backgroundColor: currentColor ? currentColor : "black",
                }}
                className={`h-[100px] flex justify-end items-end`}
              >
                <Text className="text-2xl p-4 text-white font-primaryExtraBoldItalic">
                  {author?.name}
                </Text>
              </View>
            )}
            {loading ? (
              <Skeleton
                isLoading={true}
                customStyles={"w-28 h-28 mx-4 bottom-0 rounded-full absolute"}
              ></Skeleton>
            ) : (
              <Image
                className="absolute w-28 h-28 mx-4 bottom-0 rounded-full"
                source={{
                  uri: author?.photo,
                }}
              />
            )}
            <View className="ml-auto mr-8 my-4">
              <FontAwesomeIcon icon="fa-user-pen" size={32} />
            </View>
          </View>
          <View className="my-4 mx-4">
            {loading ? (
              <Skeleton isLoading={true}>
                <Text className="text-xl font-primaryItalic"></Text>
              </Skeleton>
            ) : (
              <Text className="text-xl font-primaryItalic">About Author</Text>
            )}
            <View className="border-l-2 border-gray-300 my-2 p-4">
              {loading ? (
                <Skeleton isLoading={true}>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                </Skeleton>
              ) : (
                <Text className="text-base font-primaryRegular">
                  {author?.about}
                </Text>
              )}
            </View>
          </View>
          <View className="my-4 mx-4">
            {loading ? (
              <Skeleton isLoading={true}>
                <Text className="text-xl font-primaryItalic"></Text>
              </Skeleton>
            ) : (
              <Text className="text-xl font-primaryItalic">
                Books by {author?.name}
              </Text>
            )}
            <BookCardContainer loading={loading} books={author?.books || []} />
          </View>
        </ScrollView>
        <BackButton />
      </SafeAreaView>
      <StatusBar
        style="light"
        backgroundColor={`${currentColor ? currentColor : "black"}`}
      />
    </>
  );
};

export default AuthorDetail;
