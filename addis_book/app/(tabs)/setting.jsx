import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import shadowStyles from "../../utils/shadowStyles";
import { TabView, SceneMap, TabBar } from "react-native-tab-view"; // Import TabBar for TabView
import profile from "../settingTabs/profile";
import plan from "../settingTabs/plan";
import downloads from "../settingTabs/downloads";
import notifications from "../settingTabs/notifications";

const Setting = () => {
  const [index, setIndex] = useState(0); // State to control the active tab
  const [routes] = useState([
    { key: "profile", title: "Profile" },
    { key: "plan", title: "Plan" },
    { key: "downloads", title: "Downloads" },
    { key: "notifications", title: "Notifications" },
    { key: "extra", title: "Extra" },
  ]);

  const renderScene = SceneMap({
    profile: profile,
    plan: plan,
    downloads: downloads,
    notifications: notifications,
    extra: () => <Text>Extra</Text>,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      android_ripple={{ color: "#e0dede" }}
      inactiveColor="#000"
      activeColor="#FF9100"
      indicatorStyle={{ backgroundColor: "#FF9100" }}
      style={{ backgroundColor: "white", marginBottom: 20 }} // Apply custom font to tab bar

    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ margin: 20, marginBottom: 40 }}>
        <TouchableOpacity>
          <FontAwesomeIcon icon="fa-angle-left" size={30} />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", padding: 20 }}>
        <View
          style={shadowStyles.shadow}
          className="w-36 h-36 rounded-full bg-white relative"
        >
          <Image source={images.jk} className="w-full h-full rounded-full" />
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
  );
};

export default Setting;
