import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import shadowStyles from "../constants/shadowStyles";

const PremiumBox = ({ plan, selectedPlan  , handleSelect}) => {
  return (
    <TouchableOpacity
      onPress={() => handleSelect(plan.id)}
      className="m-2 items-center h-[120px] p-4 rounded-lg relative"
      style={[
        shadowStyles.shadow,
        { backgroundColor: plan.category === "Int" ? "#EF0FA0" : "#FF9100" },
      ]}
      activeOpacity={0.8}
    >
      <View className="absolute left-0 top-0 z-10 rounded-br-xl p-2 bg-white">
        <Text className="font-primaryBlack">30% off</Text>
      </View>
      <View className="absolute top-2 right-2">
        <View
          className={`w-6 h-6 rounded-full border-2 border-gray-300 ${
            selectedPlan === plan.id ? "bg-black" : "bg-white"
          }`}
        />
      </View>
      <View className="mt-6">
        <Text className="text-center text-xl text-white font-primaryBlack">
          {plan.type}
        </Text>
        <Text className="text-center text-white font-primaryItalic">
          {plan.price} {plan.category === "Int" ? "USD" : "Birr"}
        </Text>
        <Text className="text-center text-white font-primaryItalic">
          {plan.duration_in_days} Days
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PremiumBox;
