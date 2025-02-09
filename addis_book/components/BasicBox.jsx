import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import shadowStyles from "../constants/shadowStyles";

const BasicBox = ({ plan, selectedPlan  , handleSelect}) => {
  return (
    <>
      <Text className="font-primaryItalic text-lg">
        {plan.category === "Int" ? "International" : "Ethiopia"}
      </Text>
      <TouchableOpacity
        onPress={() => handleSelect(plan.id)}
        className="m-2 items-center bg-white h-[100px] p-4 rounded-lg relative"
        style={[shadowStyles.shadow]}
        activeOpacity={0.8}
      >
        <View className="absolute top-2 right-2">
          <View
            className={`w-6 h-6 rounded-full border-2 border-gray-300 ${
              selectedPlan === plan.id ? "bg-black" : "bg-white"
            }`}
          />
        </View>
        <Text className="text-center text-xl font-primaryBlack">
          {plan.type}
        </Text>
        <Text className="text-center font-primaryItalic">
          {plan.price} {plan.category === "Int" ? "USD" : "Birr"}
        </Text>
        <Text className="text-center font-primaryItalic">
          {plan.duration_in_days} Days
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default BasicBox;
