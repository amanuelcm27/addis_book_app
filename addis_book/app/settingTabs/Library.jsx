import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import EmptyCard from "../../components/EmptyCard";
import images from "../../constants/images";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Library = () => {
  const [library, setLibrary] = useState([]);

  return (
    <View>
      {library.length > 0 ? (
        <ScrollView>
          <View className="mx-4 my-4">
            <Text className="font-primaryBlack text-2xl">Downloads</Text>

            <View className="bg-white rounded-lg my-2">
              <View className="flex-row items-center h-[80px] rounded-lg overflow-hidden">
                <Image source={images.atlas} className="w-[25%] h-full" />
                <View className="p-4 flex-1">
                  <Text className="text-xl font-primaryBold" numberOfLines={1}>
                    Unscripted: The Great Path to Freedom Beyond the
                    Conventional
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
          </View>
        </ScrollView>
      ) : (
        <EmptyCard goto={'/ebook'} text={'Your Library is empty '} buttonText={'Buy here'} />
      )}
    </View>
  );
};

export default Library;
