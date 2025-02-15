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
import React, { useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FormField from "../../components/FormField";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import InfoCard from "../../components/InfoCard";
import { apiRequest } from "../../utils/apiRequest";
import { useAuth } from "../../context/AuthContext";

const register = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmed: "",
  });
  const { login } = useAuth();
  const [info, setInfo] = useState(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const isFormValid = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.username || !formData.email || !formData.password) {
      setInfo("Please fill in all fields");
      return;
    } else if (formData.password !== formData.confirmed) {
      setInfo("Passwords do not match");
      return;
    } else if (!emailRegex.test(formData.email)) {
      setInfo("Invalid email address");
      return;
    } else {
      return true;
    }
  };
  const register = async () => {
    if (isFormValid()) {
      setLoading(true);
      const response = await apiRequest("post", "/register/", formData);
      if (response.success) {
        setInfo("Account created successfully");
        const result = await login(formData);
        if (result.success) {
          router.push("/home");
        } else {
          setInfo(result.error);
        }
      } else {
        setInfo(response.error);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <InfoCard info={info} setInfo={setInfo} />
      <SafeAreaView className="flex-1 bg-primary w-full">
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
            <View className="justify-center items-center ">
              <Text className="font-primarySemiBold text-xl py-4 text-center text-white">
                Sign up with
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                className="bg-white shadow-lg shadow-black rounded-full flex-row p-4 items-center gap-2"
              >
                <Image source={images.google} className="w-12 h-12 px-4" />
                <Text className="text-lg font-primaryBold">
                  Sign with Google
                </Text>
              </TouchableOpacity>
              <View className="w-full ">
                <FormField
                  onChangeText={(value) => handleChange("username", value)}
                  containerStyle={"mx-6 my-2"}
                  labelStyle={"text-white"}
                  inputContainerStyle={"border-white"}
                  inputStyle={"text-white"}
                  label={"Username"}
                  placeholder={"enter your username"}
                  placeholderColor="rgba(255, 255, 255, 0.7)"
                  returnKeyType="next"
                  onSubmitEditing={() => emailInputRef.current.focus()} // Move to email field
                />
                <FormField
                  inputRef={emailInputRef}
                  onChangeText={(value) => handleChange("email", value)}
                  containerStyle={"mx-6 my-2"}
                  labelStyle={"text-white"}
                  inputContainerStyle={"border-white"}
                  inputStyle={"text-white"}
                  label={"Email"}
                  placeholder={"enter your email"}
                  placeholderColor="rgba(255, 255, 255, 0.7)"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current.focus()} // Move to password field
                />
                <FormField
                  inputRef={passwordInputRef}
                  onChangeText={(value) => handleChange("password", value)}
                  containerStyle={"mx-6 my-2"}
                  labelStyle={"text-white"}
                  inputContainerStyle={"border-white"}
                  inputStyle={"text-white"}
                  label={"Password"}
                  type={"password"}
                  placeholder={"enter your password"}
                  placeholderColor="rgba(255, 255, 255, 0.7)"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    confirmPasswordInputRef.current.focus()
                  } // Move to confirm password field
                />
                <FormField
                  inputRef={confirmPasswordInputRef}
                  onChangeText={(value) => handleChange("confirmed", value)}
                  containerStyle={"mx-6 my-2"}
                  labelStyle={"text-white"}
                  inputContainerStyle={"border-white"}
                  inputStyle={"text-white"}
                  label={"Confirm Password"}
                  type={"password"}
                  placeholderColor="rgba(255, 255, 255, 0.7)"
                  placeholder={"confirm your password"}
                  returnKeyType="done"
                  onSubmitEditing={register}
                />
                <CustomButton
                  text={"Sign up"}
                  isLoading={loading}
                  onClick={register}
                />
              </View>

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
    </>
  );
};

export default register;
