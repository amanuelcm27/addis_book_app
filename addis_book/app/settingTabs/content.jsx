import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import images from "../../constants/images";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AuthorBookFormModal from "../../components/AuthorBookFormModal";
const Content = () => {
    const [showModal, setShowModal] = useState(false);
  const sampleData = [
    { id: "1", title: "Book Title", uploaded: "Feb 4, 2020" },
    { id: "2", title: "Another Book", uploaded: "Mar 10, 2020" },


  ];
  return (
    <View className="flex-1 mx-2 relative ">
      <AuthorBookFormModal visible={showModal} onClose={() => setShowModal(false)  } />
      <FlatList
        data={sampleData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator
        renderItem={() => (
          <ImageBackground
            className="mx-2 my-1 h-[120px] rounded-xl "
            blurRadius={1}
            source={images.atlas}
          >
            <View className="bg-[rgba(0,0,0,0.5)] flex-row h-full p-4 ">
              <View className="justify-end flex-1">
                <Text className="font-primaryBlack text-2xl text-white">
                  Book Title
                </Text>
                <Text className="font-primaryRegular text-lg text-white">
                  uploaded : feb 4 , 2020
                </Text>
              </View>
              <TouchableOpacity>
                <FontAwesomeIcon icon="fa-pen" color="white" size={24} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
      />
      <TouchableOpacity onPress={() => setShowModal(true)} className="absolute bottom-0 right-0 m-4 bg-white shadow-xl rounded-full p-4 ">
        <FontAwesomeIcon icon="fa-plus" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Content;
