import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const FormField = ({ type, label, placeholder, value, onChangeText }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className="mx-6 my-2 ">
      <Text className="font-primarySemiBold text-xl text-white py-2">{label}</Text>
      <View className="border-2 flex-row items-center border-white rounded-sm p-2">
        <TextInput
          className="text-white flex-1"
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          secureTextEntry={type === "password" && !isPasswordVisible}
          value={value}
          onChangeText={onChangeText}
        />
        {type === "password" && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            className="px-2"
          >
            <FontAwesomeIcon
              color="white"
              size={20}
              icon={isPasswordVisible ? faEyeSlash : faEye}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
