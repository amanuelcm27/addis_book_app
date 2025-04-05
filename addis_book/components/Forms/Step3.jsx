import { set } from "lodash";
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

const Step3 = ({ genres, setFormData, formData }) => {
  const handleSelectGenre = (genre) => {
    if (formData.genres.includes(genre)) {
      setFormData((prev) => ({
        ...prev,
        genres: prev.genres.filter((g) => g !== genre),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        genres: [...prev.genres, genre],
      }));
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView>
        <View className="m-4 flex-1">
          <Text className="font-primaryBold text-xl">Select Genres</Text>
          <View className="flex-row flex-wrap gap-2 ">
            {genres.map((genre) => (
              <TouchableOpacity
                onPress={() => handleSelectGenre(genre.id)}
                key={genre.id}
                className={` p-4 ${
                  formData.genres.includes(genre.id) ? "bg-gray-200" : ""
                }  mt-4 h-[50px] items-cente border rounded-lg `}
              >
                <Text>{genre.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Step3;
