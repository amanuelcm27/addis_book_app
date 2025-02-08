import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../../constants/images";
import shadowStyles from "../../../constants/shadowStyles";
import { TabView, SceneMap, TabBar } from "react-native-tab-view"; // Import TabBar for TabView
import profile from "../../settingTabs/profile";
import plan from "../../settingTabs/plan";
import downloads from "../../settingTabs/downloads";
import notifications from "../../settingTabs/Library";
import { router } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import ProtectedScreen from "../../ProtectedScreen";
import Library from "../../settingTabs/Library";
import InfoCard from "../../../components/InfoCard";
import { apiRequest } from "../../../utils/apiRequest";
import * as ImagePicker from 'expo-image-picker';
import { load } from "react-native-track-player/lib/src/trackPlayer";
const Setting = () => {
  const [index, setIndex] = useState(0);
  const { user, logout , loadUser } = useAuth();
  const [fetchedUser, setFetchedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [routes] = useState([
    { key: "profile", title: "Profile" },
    { key: "plan", title: "Plan" },
    { key: "library", title: "Library" },
    { key: "downloads", title: "Downloads" },
  ]);
  const renderScene = SceneMap({
    profile: profile,
    plan: plan,
    downloads: downloads,
    library: Library,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      android_ripple={{ color: "#e0dede" }}
      inactiveColor="#000"
      activeColor="#FF9100"
      indicatorStyle={{ backgroundColor: "#FF9100" }}
      style={{ backgroundColor: "white", marginBottom: 20 }}
      tabStyle={{ width: "auto", paddingHorizontal: 25, marginHorizontal: 20 }} // Adjust spacing
    />
  );
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1], // Keep the image square
      quality: 0.7, // Adjust quality (0 - 1
    });
    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setFetchedUser((prevUser) => ({
        ...prevUser,
        avatar: selectedImageUri,
      }));
      await uploadImage(selectedImageUri);
    }
  };
  const uploadImage = async (imageUri) => {
    const formData = new FormData();
    const imageType = imageUri.split(".").pop();
    formData.append("avatar", {
      uri: imageUri,
      name: new Date() + fetchedUser?.username + `.${imageType}`,
      type: `image/${imageType}`,
    });
    setLoading(true);
    const response = await apiRequest('post', '/update_avatar/', formData);
    if (response.success) {
      setInfo('Image uploaded successfully');
      loadUser();
    }
    else {
      setInfo(response.error);
    }
    setLoading(false);
  };
  
  const handleLogout = async () => {
    await logout();
  };
  useEffect(() => {
    setFetchedUser(user);
  }, [user]);

  return (
    <>
    <InfoCard info={info} setInfo={setInfo} />
      <ProtectedScreen>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={{ margin: 20, marginBottom: 10 }} className="flex-row">
            <TouchableOpacity className="flex-1" onPress={() => router.back()}>
              <FontAwesomeIcon icon="fa-angle-left" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <FontAwesomeIcon icon="fa-arrow-right-from-bracket" size={30} />
            </TouchableOpacity>
          </View>
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

          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: 100 }}
            renderTabBar={renderTabBar}
          />
        </SafeAreaView>
      </ProtectedScreen>
    </>
  );
};

export default Setting;
