import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { SafeAreaView } from "react-native-safe-area-context";
import shadowStyles from "../../../constants/shadowStyles";
import { TabView, SceneMap, TabBar } from "react-native-tab-view"; // Import TabBar for TabView
import profile from "../../settingTabs/profile";
import plan from "../../settingTabs/plan";
import downloads from "../../settingTabs/downloads";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import ProtectedScreen from "../../ProtectedScreen";
import Library from "../../settingTabs/Library";
import InfoCard from "../../../components/InfoCard";
import { apiRequest } from "../../../utils/apiRequest";
import * as ImagePicker from "expo-image-picker";
import SettingHeader from "../../../components/SettingHeader";
import Content from "../../settingTabs/content";

const Setting = () => {
  const { initialTab } = useLocalSearchParams();
  const [index, setIndex] = useState(initialTab ? parseInt(initialTab) : 0);
  const { user, logout, loadUser } = useAuth();
  const [fetchedUser, setFetchedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [routes] = useState([
    { key: "profile", title: "Profile" },
    { key: "plan", title: "Plan" },
    { key: "library", title: "Library" },
    { key: "downloads", title: "Downloads" },
    { key: "content" , title:"Content"},

  ]);
  const renderScene = SceneMap({
    profile: profile,
    plan: plan,
    downloads: downloads,
    library: Library,
    content: Content
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      android_ripple={{ color: "#e0dede" }}
      inactiveColor="#000"
      activeColor="#FF9100"
      indicatorStyle={{ backgroundColor: "#FF9100" }}
      style={{ backgroundColor: "white", marginBottom: 20, elevation: 0 }}
      tabStyle={{ width: "auto", paddingHorizontal: 25, marginHorizontal: 20 }} // Adjust spacing
    />
  );
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
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
    const response = await apiRequest("post", "/update_avatar/", formData);
    if (response.success) {
      setInfo("Image uploaded successfully");
      loadUser();
    } else {
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
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "white", height: "100%" }}
        >
          <View style={{ margin: 20, marginBottom: 10 }} className="flex-row">
            <TouchableOpacity className="flex-1" onPress={() => router.back()}>
              <FontAwesomeIcon icon="fa-angle-left" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <FontAwesomeIcon icon="fa-arrow-right-from-bracket" color="red"  size={30} />
            </TouchableOpacity>
          </View>
          <SettingHeader
            loading={loading}
            fetchedUser={fetchedUser}
            handlePickImage={handlePickImage}
          />
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get("window").width }}
            renderTabBar={renderTabBar}
          />
        </SafeAreaView>
      </ProtectedScreen>
    </>
  );
};

export default Setting;
