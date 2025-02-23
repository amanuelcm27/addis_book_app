import { View, Text, Modal  , TouchableOpacity} from "react-native";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { router } from "expo-router";

const OfflineModal = () => {
  const { isOffline } = useAuth();
  return (
    <Modal visible={isOffline} transparent onRequestClose={() => router.push('/downloads')}>
      <View className="bg-[rgba(0,0,0,0.2)] flex-1 items-center justify-center ">
        <View className="bg-white p-6 h-[150px] w-[80%] rounded-lg shadow-sm">
          <Text className="font-primaryLight py-4 text-black">
            Your currently offline in the mean time access your downloads
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/downloads')}
            className="bg-primary p-2 mt-auto rounded-full items-center "
          >
            <Text className="text-white font-primaryBlack">Go to  downloads</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OfflineModal;
