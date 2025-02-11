import React, { memo } from "react";
import shadowStyles from "../constants/shadowStyles";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
const SettingHeader = memo(({ fetchedUser, loading, handlePickImage }) => {

  return (
    <>
      <View className="p-4 items-center">
        <View
          style={shadowStyles.shadow}
          className="w-36 h-36 rounded-full bg-white relative"
        >
          <Image
            source={{ uri: fetchedUser?.avatar }}
            className="w-full h-full rounded-full"
          />
          {loading && (
            <View className="absolute bg-[rgba(0,0,0,0.3)]  w-full h-full items-center justify-center rounded-full p-2">
              <ActivityIndicator size="large" color="#FF9100" />
            </View>
          )}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: 16,
              padding: 4,
            }}
            activeOpacity={0.5}
            onPress={handlePickImage}
          >
            <FontAwesomeIcon icon="fa-pen" size={16} opacity={0.7} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
});

export default SettingHeader;
