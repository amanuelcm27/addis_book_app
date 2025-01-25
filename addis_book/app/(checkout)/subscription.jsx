import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import shadowStyles from "../../utils/shadowStyles";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null); // State to track selected plan

  const handleSelect = (plan) => {
    setSelectedPlan(plan); // Update selected plan
  };

  return (
    <View className="h-full bg-white">
      <View className="h-[40%]">
        <Image source={images.bookcol} className="w-full h-full" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="my-4">
          <Text className="text-black text-2xl text-center font-primaryBlackItalic">
            Unlimited Reading
          </Text>
          <View className="m-6">
            <Text className="text-lg font-primaryRegular">Ethiopia</Text>
            <View className="flex-row mx-4 items-center justify-center">
              <TouchableOpacity
                onPress={() => handleSelect("Ethiopia-Basic")}
                className="m-2 items-center w-1/2 bg-white h-[100px] p-4 rounded-lg relative"
                style={[shadowStyles.shadow]}
                activeOpacity={0.8}
              >
                <View className="absolute top-2 right-2">
                  <View
                    className={`w-6 h-6 rounded-full border-2 border-gray-300 ${
                      selectedPlan === "Ethiopia-Basic"
                        ? "bg-black"
                        : "bg-white"
                    }`}
                  />
                </View>
                <Text className="text-center text-xl font-primaryBlack">
                  Basic
                </Text>
                <Text className="text-center font-primaryItalic">30 Birr</Text>
                <Text className="text-center font-primaryItalic">Monthly</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSelect("Ethiopia-Premium")}
                className="m-2 items-center w-1/2 h-[120px] p-4 rounded-lg relative"
                style={[shadowStyles.shadow, { backgroundColor: "#FF9100" }]}
              >
                <View className="absolute left-0 top-0 z-10 rounded-br-xl p-2 bg-white">
                  <Text className="font-primaryBlack">30% off</Text>
                </View>
                <View className="absolute top-2 right-2">
                  <View
                    className={`w-6 h-6 rounded-full border-2 border-gray-300 ${
                      selectedPlan === "Ethiopia-Premium"
                        ? "bg-black"
                        : "bg-white"
                    }`}
                  />
                </View>
                <View className="mt-6">
                  <Text className="text-center text-xl text-white font-primaryBlack">
                    Premium
                  </Text>
                  <Text className="text-center text-white font-primaryItalic">
                    40 Birr
                  </Text>
                  <Text className="text-center text-white font-primaryItalic">
                    Monthly
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mx-6">
            <Text className="text-lg font-primaryRegular">International</Text>
            <View className="flex-row mx-4 items-center justify-center">
              <TouchableOpacity
                onPress={() => handleSelect("International-Basic")}
                className="m-2 items-center w-1/2 bg-white h-[100px] p-4 rounded-lg relative"
                style={[shadowStyles.shadow]}
                activeOpacity={0.8}
              >
                <View className="absolute top-2 right-2">
                  <View
                    className={`w-6 h-6 rounded-full border-2 border-gray-300 ${
                      selectedPlan === "International-Basic"
                        ? "bg-black"
                        : "bg-white"
                    }`}
                  />
                </View>
                <Text className="text-center text-xl font-primaryBlack">
                  Basic
                </Text>
                <Text className="text-center font-primaryItalic">5 USD</Text>
                <Text className="text-center font-primaryItalic">Monthly</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSelect("International-Premium")}
                className="m-2 items-center w-1/2 h-[120px] p-4 rounded-lg relative"
                style={[shadowStyles.shadow, { backgroundColor: "#EF0FA0" }]}
                activeOpacity={0.8}
              >
                <View className="absolute left-0 top-0 z-10 rounded-br-xl p-2 bg-white">
                  <Text className="font-primaryBlack">30% off</Text>
                </View>
                <View className="absolute top-2 right-2">
                  <View
                    className={`w-6 h-6 rounded-full border-2 border-gray-300 ${
                      selectedPlan === "International-Premium"
                        ? "bg-black"
                        : "bg-white"
                    }`}
                  />
                </View>
                <View className="mt-6">
                  <Text className="text-center text-xl text-white font-primaryBlack">
                    Premium
                  </Text>
                  <Text className="text-center text-white font-primaryItalic">
                    8 USD
                  </Text>
                  <Text className="text-center text-white font-primaryItalic">
                    Monthly
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <CustomButton
        text={"Continue"}
        textColor="text-white"
        background="bg-black"
        onClick={() => router.push("/checkout")}
      />
    </View>
  );
};

export default Subscription;
