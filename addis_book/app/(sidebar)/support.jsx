import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";

const Support = () => {
  const [selectedValue, setSelectedValue] = useState("Select an option");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const options = [
    { label: "Author", value: "author" },
    { label: "Narrator", value: "narrator" },
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectOption = (value) => {
    setSelectedValue(value);
    setDropdownOpen(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={{ margin: 20, marginBottom: 5 }}>
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesomeIcon icon="fa-angle-left" size={30} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="m-6">
            <Text className="font-primaryBlackItalic text-2xl my-2">
              Support
            </Text>
            <View className="my-4">
              <Text className="text-lg font-bold mb-2">Your Email</Text>
              <View className="border border-gray-200 p-4 rounded-lg">
                <TextInput
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  className="text-gray-600"
                />
              </View>
            </View>
            <View className="my-4">
              <Text className="text-lg font-bold text-gray-700 mb-2">
                Your message
              </Text>
              <View className="border border-gray-200 p-4 h-56 rounded-lg">
                <TextInput
                  multiline={true}
                  numberOfLines={10}
                  placeholder="write your message here ..."
                />
              </View>
            </View>

            <CustomButton
              textColor="text-white"
              text="Submit"
              background="bg-primary"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Support;
