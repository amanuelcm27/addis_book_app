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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

const Step2 = ({ formData, setFormData }) => {
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      const imageType = selectedImageUri.split(".").pop();
      const imageFile = {
        uri: selectedImageUri,
        name: `cover_${formData.title}_${Date.now()}.${imageType}`,
        type: `image/${imageType}`,
      };
      setFormData((prevFormData) => ({ ...prevFormData, cover: imageFile }));
    }
  };

  const handlePickFile = async (field) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      
    });
    if (!result.canceled) {
      const selectedFile = result.assets[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: {
          uri: selectedFile.uri,
          name: selectedFile.name,
          type: "application/pdf",
        },
      }));
    }
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
          <View className="items-center">
            <View className="w-[200px] h-[300px] rounded-sm relative">
              {formData.cover?.uri ? (
                <>
                  <TouchableOpacity
                    onPress={() => clearField("cover")}
                    className="bg-white absolute right-0 top-0 p-2 rounded-full z-50"
                  >
                    <FontAwesomeIcon icon="fa-close" size={20} />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: formData.cover.uri }}
                    className="w-full h-full"
                  />
                </>
              ) : (
                <TouchableOpacity
                  onPress={handlePickImage}
                  className="w-full h-full items-center justify-center border rounded-lg"
                >
                  <FontAwesomeIcon icon="fa-download" size={32} />
                  <Text>Book Cover</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {formData.sample_ebook?.uri ? (
            <View className="flex-row mt-4 h-[50px] p-2 items-center border rounded-lg">
              <Text className="flex-1" numberOfLines={1} ellipsizeMode="tail">
                {formData.sample_ebook.name}
              </Text>
              <TouchableOpacity onPress={() => clearField("sample_ebook")}>
                <FontAwesomeIcon icon="fa-close" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => handlePickFile("sample_ebook")}
              className=" mt-4 h-[50px]  items-center justify-center border rounded-lg"
            >
              <Text>Upload Sample Ebook File</Text>
            </TouchableOpacity>
          )}

          {formData.ebook?.uri ? (
            <View className="flex-row mt-4 h-[50px] p-2 items-center border rounded-lg">
              <Text className="flex-1" numberOfLines={1} ellipsizeMode="tail">
                {formData.ebook.name}
              </Text>
              <TouchableOpacity onPress={() => clearField("ebook")}>
                <FontAwesomeIcon icon="fa-close" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => handlePickFile("ebook")}
              className=" mt-4 h-[50px]  items-center justify-center border rounded-lg"
            >
              <Text>Upload Ebook File</Text>
            </TouchableOpacity>
          )}
          <Text className="font-primaryLightItalic mt-4">
            only pdf files are supported{" "}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Step2;
