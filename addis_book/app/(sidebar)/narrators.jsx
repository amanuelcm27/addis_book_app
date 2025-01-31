import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import images from "../../constants/images";
import ContentHeader from "../../components/ContentHeader";
import { router } from "expo-router";
import BackButton from "../../components/BackButton";
import CreatorCard from "../../components/CreatorCard";

const narrators = () => {
  const filters = [
    { id: "1", filter: "J.K. Rowling" },
    { id: "2", filter: "George R.R. Martin" },
    { id: "3", filter: "Stephen King" },
    { id: "4", filter: "Jane Austen" },
    { id: "5", filter: "Mark Twain" },
    { id: "6", filter: "Agatha Christie" },
    { id: "7", filter: "J.R.R. Tolkien" },
    { id: "8", filter: "Ernest Hemingway" },
    { id: "9", filter: "F. Scott Fitzgerald" },
    { id: "10", filter: "Oscar Wilde" },
  ];

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

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <ContentHeader text={"search for Narrators"} icon={"fa-wave-square"} />
        <View>
          <FormField
            containerStyle={"mx-4"}
            inputContainerStyle={"rounded-full"}
            inputStyle={"text-black font-primaryRegular"}
            placeholder={"search by Narrator"}
          />
        </View>
        <View className="w-full p-2 my-4">
          <View className="flex-row flex-wrap items-center justify-center gap-2">
            {filters.map((item, index) => (
              <CreatorCard route={'narrator'} key={index} item={item} index={index} colors={colors} />
            ))}
          </View>
        </View>
      </ScrollView>
      <BackButton />
    </SafeAreaView>
  );
};

export default narrators;
