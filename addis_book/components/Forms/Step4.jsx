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



const Step4 = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView>
        <View className="m-4 flex-1">
          <Text className="font-primaryBold text-xl">optional </Text>
          <TouchableOpacity className=" mt-4 h-[50px]  items-center justify-center border rounded-lg">
            <Text>Upload Audiobook file</Text>
          </TouchableOpacity>
          <TouchableOpacity className=" mt-4 h-[50px]  items-center justify-center border rounded-lg">
            <Text>Upload Sample Audiobook File</Text>
          </TouchableOpacity>
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="font-primaryBold">pages</Text>
            </View>
            <View className="border p-4 rounded-lg mt-2">
              <TextInput placeholder="enter the number of pages" />
            </View>
          </View>
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="font-primaryBold">Duration (in seconds )</Text>
            </View>
            <View className="border p-4 rounded-lg mt-2">
              <TextInput placeholder="enter audio book duration" />
            </View>
          </View>
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="font-primaryBold">published</Text>
            </View>
            <View className="border p-4 rounded-lg mt-2">
              <TextInput placeholder="Eg.  Aug 2 ,2000" />
            </View>
          </View>
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="font-primaryBold">Edition</Text>
            </View>
            <View className="border p-4 rounded-lg mt-2">
              <TextInput placeholder="Eg.  Aug 2 ,2000" />
            </View>
          </View>
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="font-primaryBold">Language</Text>
            </View>
            <View className="border p-4 rounded-lg mt-2">
              <TextInput placeholder="Eg.  Aug 2 ,2000" />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Step4;
