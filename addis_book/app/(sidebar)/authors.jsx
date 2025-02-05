import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import ContentHeader from "../../components/ContentHeader";
import BackButton from "../../components/BackButton";
import CreatorCard from "../../components/CreatorCard";
import { apiRequest } from "../../utils/apiRequest";

const Authors = () => {
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
  const [searchText, setSearchText] = useState("");
  const [authors, setAuthors] = useState([]);
  const fetchAuthors = async () => {
    const response = await apiRequest("get", "/authors");
    if (response.success) {
      setAuthors(response.data);
    } else {
      console.log(response.error);
    }
  };
  const searchAuthors = async () => {
    const response = await apiRequest(
      "get",
      `/author-search?author=${searchText}`
    );
    if (response.success) {
      setAuthors(response.data);
    } else {
      console.log(response.error);
    }
  };
  useEffect(() => {
    fetchAuthors();
  }, []);
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <ContentHeader text={"search for Authors"} icon={"fa-user-pen"} />
        <View>
          <FormField
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={searchAuthors}
            containerStyle={"mx-4"}
            inputContainerStyle={"rounded-full"}
            inputStyle={"text-black font-primaryRegular"}
            placeholder={"search by author"}
            returnKeyType="search"
            type={"search"}
            otherFunction={() => {setSearchText(""), fetchAuthors()}}
          />
        </View>
        <View className="w-full p-2 my-4">
          <View className="flex-row flex-wrap items-center  gap-2">
            {authors.map((item, index) => (
              <CreatorCard
                key={item.id}
                route={`/author/${item.id}`}
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

export default Authors;
