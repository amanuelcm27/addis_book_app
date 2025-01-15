import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import FormField from "../../components/FormField";
import { router } from "expo-router";
import Button from "../../components/Button";

const login = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <View className="flex-1 justify-center items-center ">
            <Text className="font-primarySemiBold text-xl py-4 text-center text-white">
              Sign in with
            </Text>
            <View className="bg-white shadow-lg shadow-black flex-row gap-8 justify-center rounded-full p-4">
              <TouchableOpacity>
                <Image source={images.google} className="w-12 h-12 px-4" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={images.telegram} className="w-12 h-12 px-4" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={images.facebook} className="w-12 h-12 px-4" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={images.whatsapp} className="w-12 h-12 px-4" />
              </TouchableOpacity>
            </View>
            <View className="w-full">
              <FormField
                containerStyle={"mx-6 my-2"}
                labelStyle={"text-white"}
                inputContainerStyle={"border-white"}
                inputStyle={"text-white"}
                label={"Email"}
                placeholder={"enter your email"}
                placeholderColor="rgba(255, 255, 255, 0.7)"
              />
              <FormField
                containerStyle={"mx-6 my-2"}
                labelStyle={"text-white"}
                inputContainerStyle={"border-white"}
                inputStyle={"text-white"}
                label={"Password"}
              
                type={"password"}
                placeholder={"enter your password"}
                placeholderColor="rgba(255, 255, 255, 0.7)"
              />
              <Button
              text={"Sign in"}
              isLoading={isLoading}
              onClick={() => router.push("/home")}
            />
            </View>
            
            <View>
              <Text className="text-white font-primaryLight">
                Don't have an account?{" "}
                <Text
                  onPress={() => router.push("/register")}
                  className="font-primaryBlack"
                >
                  sign up here
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;
