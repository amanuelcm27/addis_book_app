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



const Step3 = ({ genres }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const handleSelectGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres((prev) => prev.filter((g) => g !== genre));
    } else {
      setSelectedGenres((prev) => [...prev, genre]);
    }
  };
  console.log(selectedGenres);
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
                className="p-4 mt-4 h-[50px] items-cente border rounded-lg"
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