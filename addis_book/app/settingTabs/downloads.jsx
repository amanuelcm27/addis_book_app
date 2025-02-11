import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import shadowStyles from "../../constants/shadowStyles";

const downloads = () => {
  return (
    <ScrollView>
      <View className="mx-4 my-2">
        <Text className="font-primaryBlack text-2xl">Downloads</Text>

        <View className="bg-white rounded-lg my-2">
          <View
            className="flex-row items-center h-[80px] rounded-lg overflow-hidden"
            style={shadowStyles.shadow}
          >
            <Image source={images.atlas} className="w-[25%] h-full" />
            <View className="p-4 flex-1">
              {/* Truncated Title */}
              <Text className="text-xl font-primaryBold" numberOfLines={1}>
                Unscripted: The Great Path to Freedom Beyond the Conventional
              </Text>
              <Text className="text-sm font-primaryRegular">
                by <Text className="text-gray-500">Ayn Rand</Text>
              </Text>
            </View>
            <TouchableOpacity className="p-4 mt-auto">
              <FontAwesomeIcon icon="fa-book-open" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white rounded-lg my-2">
          <View
            className="flex-row items-center h-[80px] rounded-lg overflow-hidden"
            style={shadowStyles.shadow}
          >
            <Image source={images.animal} className="w-[25%] h-full" />
            <View className="p-4 flex-1">
              {/* Truncated Title */}
              <Text className="text-xl font-primaryBold" numberOfLines={1}>
                Unscripted: The Great Path to Freedom Beyond the Conventional
              </Text>
              <Text className="text-sm font-primaryRegular">
                by <Text className="text-gray-500">Orwell</Text>
              </Text>
            </View>
            <TouchableOpacity className="p-4 mt-auto">
              <FontAwesomeIcon icon="fa-play-circle" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white rounded-lg my-2">
          <View
            className="flex-row items-center h-[80px] rounded-lg overflow-hidden"
            style={shadowStyles.shadow}
          >
            <Image source={images.htw} className="w-[25%] h-full" />
            <View className="p-4 flex-1">
              {/* Truncated Title */}
              <Text className="text-xl font-primaryBold" numberOfLines={1}>
                Unscripted: The Great Path to Freedom Beyond the Conventional
              </Text>
              <Text className="text-sm font-primaryRegular">
                by <Text className="text-gray-500">Marcus Jones</Text>
              </Text>
            </View>
            <TouchableOpacity className="p-4 mt-auto">
              <FontAwesomeIcon icon="fa-play-circle" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white rounded-lg my-2">
          <View
            className="flex-row items-center h-[80px] rounded-lg overflow-hidden"
            style={shadowStyles.shadow}
          >
            <Image source={images.got} className="w-[25%] h-full" />
            <View className="p-4 flex-1">
              {/* Truncated Title */}
              <Text className="text-xl font-primaryBold" numberOfLines={1}>
                Unscripted: The Great Path to Freedom Beyond the Conventional
              </Text>
              <Text className="text-sm font-primaryRegular">
                by <Text className="text-gray-500">Mj Demarco</Text>
              </Text>
            </View>
            <TouchableOpacity className="p-4 mt-auto">
              <FontAwesomeIcon icon="fa-book-open" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white rounded-lg my-2">
          <View
            className="flex-row items-center h-[80px] rounded-lg overflow-hidden"
            style={shadowStyles.shadow}
          >
            <Image source={images.unscripted} className="w-[25%] h-full" />
            <View className="p-4 flex-1">
              {/* Truncated Title */}
              <Text className="text-xl font-primaryBold" numberOfLines={1}>
                Unscripted: The Great Path to Freedom Beyond the Conventional
              </Text>
              <Text className="text-sm font-primaryRegular">
                by <Text className="text-gray-500">Mj Demarco</Text>
              </Text>
            </View>
            <TouchableOpacity className="p-4 mt-auto">
              <FontAwesomeIcon icon="fa-book-open" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default downloads;
