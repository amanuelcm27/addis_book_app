import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import InfoCard from "../../components/InfoCard";
import { apiRequest } from "../../utils/apiRequest";
import ProtectedScreen from "../ProtectedScreen";
const Contact = () => {
  const [selectedValue, setSelectedValue] = useState("Select an option");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    proposal: "",
    apply_for: "",
  });
  const options = [
    { label: "Author", value: "author" },
    { label: "Narrator", value: "narrator" },
  ];
  const proposalRef = useRef(null);
  const emailRef = useRef(null);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const selectOption = (value) => {
    setSelectedValue(value);
    setDropdownOpen(false);
  };
  const isFormValid = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (
      formData.email.trim() === "" ||
      formData.proposal.trim() === "" ||
      formData.apply_for === ""
    ) {
      setInfo("Please fill in all fields");
      return false;
    } else if (!emailRegex.test(formData.email)) {
      setInfo("Invalid email address");
      return false;
    }
    return true;
  };
  const submitProposal = async () => {
    if (isFormValid()) {
      setIsLoading(true);
      const response = await apiRequest("post", "create_proposal/", formData);
      if (response.success) {
        setInfo("Proposal submitted successfully");
        setFormData({
          email: "",
          proposal: "",
          apply_for: "",
        });
        setSelectedValue("Select an option");
      } else {
        setInfo("An error occurred while submitting proposal");
      }
      setIsLoading(false);
    }
  };
  return (
    <ProtectedScreen>
      <InfoCard info={info} setInfo={setInfo} />
      <SafeAreaView className="flex-1 bg-gray-50">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <FlatList
            data={[]}
            ListHeaderComponent={
              <>
                <View style={{ margin: 20, marginBottom: 5 }}>
                  <TouchableOpacity onPress={() => router.back()}>
                    <FontAwesomeIcon icon="fa-angle-left" size={30} />
                  </TouchableOpacity>
                </View>
                <View className="m-6">
                  <Text className="font-primaryBlackItalic text-2xl my-2">
                    Work with us
                  </Text>
                  <View className="my-4">
                    <Text className="text-lg font-primaryBlack text-gray-700 mb-2">
                      Apply as:
                    </Text>
                    <TouchableOpacity
                      onPress={toggleDropdown}
                      className="bg-white border border-gray-300 p-4 rounded-lg"
                      activeOpacity={0.6}
                    >
                      <Text className="text-gray-600">{selectedValue}</Text>
                    </TouchableOpacity>
                    {dropdownOpen && (
                      <View className="bg-white border border-gray-300 mt-2 rounded-lg">
                        {options.map((item) => (
                          <TouchableOpacity
                            key={item.value}
                            onPress={() => {
                              handleChange("apply_for", item.value),
                                selectOption(item.label);
                            }}
                            className="p-4 border-b border-gray-200 last:border-0"
                          >
                            <Text className="text-gray-600">{item.label}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                  <View className="my-4">
                    <Text className="text-lg font-primaryBlack text-gray-700 mb-2">
                      Your proposal
                    </Text>
                    <View className="border border-gray-200 p-4 rounded-lg">
                      <TextInput
                        multiline={true}
                        numberOfLines={10}
                        placeholder="Tell us about yourself and works"
                        onChangeText={(value) =>
                          handleChange("proposal", value)
                        }
                        value={formData.proposal}
                        ref={proposalRef}
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current.focus()}
                      />
                    </View>
                  </View>
                  <View className="my-4">
                    <Text className="text-lg font-primaryBlack mb-2">
                      Your Email
                    </Text>
                    <Text className="text-sm font-primaryLight mb-2">
                      we will use your email for your proposal status
                    </Text>
                    <View className="border border-gray-200 p-4 rounded-lg">
                      <TextInput
                        ref={emailRef}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        className="text-gray-600"
                        onChangeText={(value) => handleChange("email", value)}
                        value={formData.email}
                        returnKeyType="done"
                        onSubmitEditing={submitProposal}
                      />
                    </View>
                  </View>
                  <CustomButton
                    text="Submit"
                    onClick={submitProposal}
                    isLoading={isLoading}
                  />
                </View>
              </>
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ProtectedScreen>
  );
};

export default Contact;
