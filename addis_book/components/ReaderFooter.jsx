import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ReaderFooter = ({
  isInputVisible,
  pageInput,
  setPageInput,
  handlePageChange,
  currentPage,
  totalNoPages,
  setInputVisible,
}) => {
  return (
    <View className="flex-row items-center justify-between p-4 bg-[#FFF] border-t border-[#DDD]">
      <TouchableOpacity>
        <Ionicons name="download-outline" size={24} color="black" />
      </TouchableOpacity>
      {isInputVisible ? (
        <View className="flex-row items-center">
          <TextInput 
            keyboardType="numeric"
            value={pageInput}
            onChangeText={setPageInput}
            placeholder="Enter page number"
            maxLength={3}
            className="border-b-2 border-[#ddd] w-[100px]"
            returnKeyType="done"
            onSubmitEditing={() => handlePageChange(parseInt(pageInput))}
          />
        </View>
      ) : (
        <Text className="text-lg">
          {currentPage + 1} - {totalNoPages}
        </Text>
      )}
      <TouchableOpacity onPress={() => setInputVisible(!isInputVisible)}>
        <Ionicons name="search-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ReaderFooter;
