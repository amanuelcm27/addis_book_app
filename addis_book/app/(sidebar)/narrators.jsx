import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import images from "../../constants/images";
import ContentHeader from "../../components/ContentHeader";
import { router } from "expo-router";
import BackButton from "../../components/BackButton";
import CreatorCard from "../../components/CreatorCard";
import { apiRequest } from "../../utils/apiRequest";

const narrators = () => {
  const [searchText, setSearchText] = useState(""); 
  const colors = [
    "#EF0FA0", // pink
    "#BB07DF", // purple
    "#00B200", // green
    "#142F66", // blue
    "#EE1C1C", // red
    "#5598A0", // light blue
    "#F0A211", // yellow
    "#62615F", // dark gray
  ];
  const [narrators, setNarrators] = useState([]);
  const fetchNarrators = async () => {
    const response = await apiRequest("get", "/narrators");
    if (response.success) {
      setNarrators(response.data);
    } else {
      console.log(response.error);
    }
  };
  const searchNarrators = async () => {
    const response = await apiRequest(
      "get",
      `/narrator-search?narrator=${searchText}`
    );
    if (response.success) {
      setNarrators(response.data);
    } else {
      console.log(response.error);
    }
  };
  const clearSearch = () => { 
    setSearchText("");
    fetchNarrators();
  }
  useEffect(() => {
    fetchNarrators();
  }, []);
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <ContentHeader text={"search for Narrators"} icon={"fa-wave-square"} />
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
            {narrators.map((item, index) => (
              <CreatorCard
                route={`/narrator/${item.id}`}
                key={index}
                item={item}
                index={index}
                colors={colors}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <BackButton />
    </SafeAreaView>
  );
};

export default narrators;
