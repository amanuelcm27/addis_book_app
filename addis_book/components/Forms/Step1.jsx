import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const Step1 = ({ formData, setFormData }) => {
  const [currency, setCurrency] = useState("USD");
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  const handleCurrencyChange = () => {
    setFormData({ ...formData, currency: currency === "USD" ? "ETB" : "USD" });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView>
        <View className="m-4 flex-1">
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="font-primaryBold">title</Text>
              <Text className="text-red-500 px-2">*</Text>
            </View>
            <View className="border p-4 rounded-lg mt-2">
              <TextInput
                value={formData.title}
                onChangeText={(value) => handleChange("title", value)}
                placeholder="Eg. Harry potter  , Atlas Shrugged"
              />
            </View>
          </View>
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="font-primaryBold">publisher</Text>
            </View>
            <View className="border p-4 rounded-lg mt-2">
              <TextInput
                value={formData.publisher}
                onChangeText={(value) => handleChange("publisher", value)}
                placeholder="your book publisher"
              />
            </View>
          </View>
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="font-primaryBold">price</Text>
              <Text className="text-red-500 px-2">*</Text>
            </View>
            <View className="border p-4 rounded-lg mt-2 flex-row items-center">
              <TextInput
                value={formData.price}
                placeholder="Enter price"
                keyboardType="numeric"
                className="flex-1"
                onChangeText={(value) => handleChange("price", value)}
              />
              <View className="relative ">
                <TouchableOpacity
                  onPress={() => {
                    setCurrency(currency === "USD" ? "ETB" : "USD");
                    handleCurrencyChange();
                  }}
                >
                  <Text className="font-primaryLight">{formData.currency}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="font-primaryBold">summary</Text>
              <Text className="text-red-500 px-2">*</Text>
            </View>
            <View className="border p-4 rounded-lg mt-2">
              <TextInput
                multiline={true}
                numberOfLines={10}
                onChangeText={(value) => handleChange("summary", value)}
                value={formData.summary}
                placeholder="short summary of your book"
              />
            </View>
            <Text className="ml-auto">max 900 </Text>
          </View>
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="font-primaryBold">ISBN</Text>
            </View>
            <View className="border p-4 rounded-lg mt-2">
              <TextInput
                onChangeText={(value) => handleChange("isbn", value)}
                value={formData.isbn}
                placeholder="enter the ISBN number"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Step1;
