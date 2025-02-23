import React, { memo, useCallback, useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";
import { useDrawerStatus } from "@react-navigation/drawer";
const SideBar = ({ navigation }) => {
  const navigateTo = useCallback((route) => {
    router.push(route);
  }, []);
  const menuItems = useMemo(
    () => [
      { label: "Account", icon: "fa-user", route: "/setting" },
      { label: "Genres", icon: "fa-meteor", route: "/search" },
      { label: "Authors", icon: "fa-user-pen", route: "/authors" },
      { label: "Narrators", icon: "fa-wave-square", route: "/narrators" },
      { label: "Downloads", icon: "fa-folder", route: "/downloads" },
      // { label: "About us", icon: "fa-users", route: "/aboutus" },
      // { label: "FAQ", icon: "fa-question", route: "/faq" },
      // { label: "Support", icon: "fa-comment", route: "/support" },
    ],
    []
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 30,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.closeDrawer()}
        activeOpacity={0.6}
      >
        <FontAwesomeIcon icon="fa-close" color="black" size={24} />
      </TouchableOpacity>
      <View style={{ marginTop: 20, flex: 1 }}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.4}
            className="flex-row items-center my-2 p-4  rounded-full"
            style={{
              borderRadius: 50,
              borderColor: "black",
              borderWidth: 2,
              backgroundColor: "white",
            }}
            onPress={() => {
              navigateTo(item.route);
            }}
          >
            <FontAwesomeIcon icon={item.icon} size={22} />
            <Text className="px-4 font-primaryBlack">{item.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => router.push("/contact")}
          className="flex-row justify-center bg-primary items-center my-2 p-4  rounded-full"
        >
          <Text className="px-4 text-white  font-primaryBlack">
            work with us
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          router.push("/terms");
        }}
        className="flex-row"
      >
        <Text className=" text-gray-500 font-primaryRegular flex-1">
          Terms and Conditions
        </Text>
        <FontAwesomeIcon
          icon="fa-circle-exclamation"
          color="#FF9100"
          size={22}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SideBar;
