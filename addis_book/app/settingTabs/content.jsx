import {
  View,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import images from "../../constants/images";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AuthorBookFormModal from "../../components/AuthorBookFormModal";
import { useAuth } from "../../context/AuthContext";
import { apiRequest } from "../../utils/apiRequest";
const Content = () => {
  const [showModal, setShowModal] = useState(false);
  const sampleData = [
    { id: "1", title: "Book Title", uploaded: "Feb 4, 2020" },
    { id: "2", title: "Another Book", uploaded: "Mar 10, 2020" },
  ];
  const { user } = useAuth();
  const [genres, setGenres] = useState([]);
  const fetchGenres = async () => {
    const response = await apiRequest("get", "/genres/");
    if (response.success) {
      setGenres(response.data);
    } else {
      setInfo(response.error);
    }
  };
  useEffect(() => {
    fetchGenres();
  }, []);
  return (
    <View className="flex-1 mx-2 relative ">
      <AuthorBookFormModal
        genres={genres}
        setShowModal={setShowModal}
        visible={showModal}
        onClose={() => setShowModal(false)}
        user={user}
      />
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
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        className="absolute bottom-0 right-0 m-4 bg-white shadow-xl rounded-full p-4 "
      >
        <FontAwesomeIcon icon="fa-plus" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Content;
