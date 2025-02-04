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
import { router, useLocalSearchParams } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { useAuth } from "../../context/AuthContext";

const login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { redirect } = useLocalSearchParams();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  const handleLogin = async () => {
    console.log(formData);
    if (!formData.username || !formData.password) {
      alert("Please fill all fields");
      return;
    } else {
      setIsLoading(true);
      await login(formData);
      setIsLoading(false);
      router.replace(redirect ? decodeURIComponent(redirect) : "/home");
    }
  }; 

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
                onChangeText={(value) => handleChange("username", value)}
                containerStyle={"mx-6 my-2"}
                labelStyle={"text-white"}
                inputContainerStyle={"border-white"}
                inputStyle={"text-white"}
                label={"username"}
                placeholder={"enter your username"}
                placeholderColor="rgba(255, 255, 255, 0.7)"
              />
              <FormField
                onChangeText={(value) => handleChange("password", value)}
                containerStyle={"mx-6 my-2"}
                labelStyle={"text-white"}
                inputContainerStyle={"border-white"}
                inputStyle={"text-white"}
                label={"Password"}
                type={"password"}
                placeholder={"enter your password"}
                placeholderColor="rgba(255, 255, 255, 0.7)"
              />
              <CustomButton
                text={"Sign in"}
                isLoading={isLoading}
                onClick={handleLogin}
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
