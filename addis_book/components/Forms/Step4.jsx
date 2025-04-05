import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as DocumentPicker from "expo-document-picker";

const Step4 = ({ setFormData, formData }) => {
  const handlePickFile = async (field) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
    });
    if (!result.canceled) {
      const selectedFile = result.assets[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: {
          uri: selectedFile.uri,
          name: selectedFile.name,
          type: "audio/*",
        },
      }));
    }
  };
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  const clearField = (field) => {
    setFormData((prevFormData) => ({ ...prevFormData, [field]: null }));
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView>
        <View className="m-4 flex-1">
          <Text className="font-primaryBold text-xl">optional </Text>
          {formData.sample_audio?.uri ? (
            <View className="flex-row mt-4 h-[50px] p-2 items-center border rounded-lg">
              <Text className="flex-1" numberOfLines={1} ellipsizeMode="tail">
                {formData.sample_audio.name}
              </Text>
              <TouchableOpacity onPress={() => clearField("sample_audio")}>
                <FontAwesomeIcon icon="fa-close" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => handlePickFile("sample_audio")}
              className=" mt-4 h-[50px]  items-center justify-center border rounded-lg"
            >
              <Text>Upload Sample Audio book File</Text>
            </TouchableOpacity>
          )}

          {formData.audio_book?.uri ? (
            <View className="flex-row mt-4 h-[50px] p-2 items-center border rounded-lg">
              <Text className="flex-1" numberOfLines={1} ellipsizeMode="tail">
                {formData.audio_book.name}
              </Text>
              <TouchableOpacity onPress={() => clearField("audio_book")}>
                <FontAwesomeIcon icon="fa-close" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => handlePickFile("audio_book")}
              className=" mt-4 h-[50px]  items-center justify-center border rounded-lg"
            >
              <Text>Upload Audio book File</Text>
            </TouchableOpacity>
          )}
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="font-primaryBold">pages</Text>
            </View>
            <View className="border p-4 rounded-lg mt-2">
              <TextInput
                value={formData.page_count}
                onChangeText={(value) => handleChange("page_count", value)}
                keyboardType="numeric"
                placeholder="enter the number of pages"
              />
            </View>
          </View>
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="font-primaryBold">Duration (in seconds )</Text>
            </View>
            <View className="border p-4 rounded-lg mt-2">
              <TextInput
                value={formData.duration}
                keyboardType="numeric"
                onChangeText={(value) => handleChange("duration", value)}
                placeholder="enter audio book duration"
              />
            </View>
          </View>
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="font-primaryBold">published (YYYY-MM-DD)</Text>
            </View>
            <View className="border p-4 rounded-lg mt-2">
              <TextInput
                value={formData.published}
                onChangeText={(value) => handleChange("published", value)}
                placeholder="Eg. YYYY-MM-DD"
              />
            </View>
          </View>
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="font-primaryBold">Edition</Text>
            </View>
            <View className="border p-4 rounded-lg mt-2">
              <TextInput
                value={formData.edition}
                onChangeText={(value) => handleChange("edition", value)}
                placeholder="Eg. 5th edition"
              />
            </View>
          </View>
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="font-primaryBold">Language</Text>
            </View>
            <View className="border p-4 rounded-lg mt-2">
              <TextInput
                value={formData.language}
                onChangeText={(value) => handleChange("language", value)}
                placeholder="Eg.  English"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Step4;
