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
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";

const Contact = () => {
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
        <FlatList
          data={[]}
          ListHeaderComponent={
            <>
              <View style={{ margin: 20, marginBottom: 5 }}>
                <TouchableOpacity onPress={() => router.back()}>
                  <FontAwesomeIcon icon="fa-angle-left" size={30} />
                </TouchableOpacity>
              </View>
              <View className="m-6">
                <Text className="font-primaryBlackItalic text-2xl my-2">
                  Work with us
                </Text>
                <View className="my-4">
                  <Text className="text-lg font-primaryBold text-gray-700 mb-2">
                    You are:
                  </Text>
                  <TouchableOpacity
                    onPress={toggleDropdown}
                    className="bg-white border border-gray-300 p-4 rounded-lg"
                  >
                    <Text className="text-gray-600">{selectedValue}</Text>
                  </TouchableOpacity>
                  {dropdownOpen && (
                    <View className="bg-white border border-gray-300 mt-2 rounded-lg">
                      {options.map((item) => (
                        <TouchableOpacity
                          key={item.value}
                          onPress={() => selectOption(item.label)}
                          className="p-4 border-b border-gray-200 last:border-0"
                        >
                          <Text className="text-gray-600">{item.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
                <View className="my-4">
                  <Text className="text-lg font-bold text-gray-700 mb-2">
                    About yourself:
                  </Text>
                  <View className="border border-gray-200 p-4 h-56 rounded-lg">
                    <TextInput
                      multiline={true}
                      numberOfLines={10}
                      placeholder="Tell us about yourself"
                    />
                  </View>
                </View>
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
                <CustomButton
                  textColor="text-white"
                  text="Submit"
                  background="bg-primary"
                />
              </View>
            </>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Contact;
