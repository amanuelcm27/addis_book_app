import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FormField from "../../components/FormField";
import { router } from "expo-router";
import Button from "../../components/Button";

const register = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View className="flex- justify-center items-center ">
            <Text className="font-primarySemiBold text-xl py-4 text-center text-white">
              Sign up with
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
              <FormField label={"Email"} placeholder={"enter your email"} />
              <FormField
                label={"Password"}
                type={"password"}
                placeholder={"enter your password"}
              />
              <FormField
                label={"Confirm Password"}
                type={"password"}
                placeholder={"confirm your password"}
              />
            </View>
            <Button
              text={"Sign up"}
              isLoading={isLoading}
              onClick={() => setIsLoading(!isLoading)}
            />
            <View>
              <Text className="text-white font-primaryLight">
                Already have an account?{" "}
                <Text
                  onPress={() => router.push("/login")}
                  className="font-primaryBlack"
                >
                  sign in here
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;
