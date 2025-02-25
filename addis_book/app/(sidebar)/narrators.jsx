import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import ContentHeader from "../../components/ContentHeader";
import BackButton from "../../components/BackButton";
import CreatorCard from "../../components/CreatorCard";
import { apiRequest } from "../../utils/apiRequest";
import InfoCard from "../../components/InfoCard";
import Skeleton from "../../components/SkeletonLoader";
import { colors } from "../../constants/colors";

const narrators = () => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [narrators, setNarrators] = useState([]);
  const fetchNarrators = async () => {
    const response = await apiRequest("get", "/narrators/");
    if (response.success) {
      setNarrators(response.data);
    } else {
      setInfo(response.error);
    }
    setLoading(false);
  };
  const searchNarrators = async () => {
    setLoading(true);
    const response = await apiRequest(
      "get",
      `/narrator-search/?narrator=${searchText}`
    );
    if (response.success) {
      setNarrators(response.data);
    } else {
      setInfo(response.error);
    }
    setLoading(false);
  };
  const clearSearch = () => {
    setSearchText("");
    fetchNarrators();
  };
  useEffect(() => {
    fetchNarrators();
  }, []);
  return (
    <>
      <InfoCard info={info} setInfo={setInfo} />
      <SafeAreaView className="h-full bg-white">
        <ScrollView>
          <ContentHeader
            text={"search for Narrators"}
            icon={"fa-wave-square"}
          />
          <View>
            <FormField
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={searchNarrators}
              containerStyle={"mx-4"}
              inputContainerStyle={"rounded-full"}
              inputStyle={"text-black font-primaryRegular"}
              placeholder={"search by Narrator"}
              returnKeyType="search"
              type="search"
              otherFunction={clearSearch}
            />
          </View>
          <View className="w-full p-2 my-4">
            <View className="flex-row flex-wrap items-center  gap-2">
              {loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      isLoading={true}
                      customStyles={"w-[48%]"}
                    >
                      <View className="w-[48%] h-[120px]"></View>
                    </Skeleton>
                  ))
                : narrators.map((item, index) => (
                    <CreatorCard
                      route={`/narrator/${item.id}`}
                      key={index}
                      item={item}
                      index={index}
                      colors={colors()}
                    />
                  ))}
            </View>
          </View>
        </ScrollView>
        <BackButton />
      </SafeAreaView>
    </>
  );
};

export default narrators;
