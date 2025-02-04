import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../../constants/images";
import shadowStyles from "../../../constants/shadowStyles";
import { TabView, SceneMap, TabBar } from "react-native-tab-view"; // Import TabBar for TabView
import profile from "../../settingTabs/profile";
import plan from "../../settingTabs/plan";
import downloads from "../../settingTabs/downloads";
import notifications from "../../settingTabs/notifications";
import { router } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import ProtectedScreen from "../../ProtectedScreen";

const Setting = () => {
  const [index, setIndex] = useState(0);
  const { user, logout } = useAuth();
  const [fetchedUser, setFetchedUser] = useState(null);
  const [routes] = useState([
    { key: "profile", title: "Profile" },
    { key: "plan", title: "Plan" },
    { key: "downloads", title: "Downloads" },
    { key: "notifications", title: "Notifications" },
  ]);

  const renderScene = SceneMap({
    profile: profile,
    plan: plan,
    downloads: downloads,
    notifications: notifications,
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
  const handleLogout = async () => {
    await logout();
  };
  useEffect(() => {
    setFetchedUser(user);
  }, [user]);

  return (
    <ProtectedScreen>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ margin: 20, marginBottom: 10 }} className="flex-row">
          <TouchableOpacity className="flex-1" onPress={() => router.back()}>
            <FontAwesomeIcon icon="fa-angle-left" size={30} />
          </TouchableOpacity>
          <TouchableOpacity className="" onPress={handleLogout}>
            <FontAwesomeIcon icon="fa-arrow-right-from-bracket" size={30} />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", padding: 10 }}>
          <View
            style={shadowStyles.shadow}
            className="w-36 h-36 rounded-full bg-white relative"
          >
            <Image
              source={{
                uri: fetchedUser?.avatar,
              }}
              className="w-full h-full rounded-full"
            />
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
  );
};

export default Setting;
