import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const FormField = ({ type, label, placeholder, placeholderColor='black' , value, onChangeText , containerStyle , labelStyle , inputContainerStyle , inputStyle }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className={`${containerStyle}`}>
      {label && <Text className={` font-primarySemiBold text-xl ${labelStyle} py-2 `}>{label}</Text>}
      <View className={`border-2 flex-row items-center ${inputContainerStyle} justify-center p-2`}>
        <TextInput

          className={`${inputStyle} flex-1 `}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
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
