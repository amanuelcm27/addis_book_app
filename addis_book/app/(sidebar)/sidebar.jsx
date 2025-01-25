import React, { memo, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Touchable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";


const SideBar = memo(({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        position: "absolute", 
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        padding: 10,
        backgroundColor: "white",
        borderTopRightRadius: 50,
        borderBottomRightRadius: 25,
        shadowColor: "orange",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 20,
        zIndex: 999,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        activeOpacity={0.6}
      >
        <FontAwesomeIcon icon="fa-close" color="black" size={16} />
      </TouchableOpacity>
      <View style={{ marginTop: 20, flex: 1 }}>
        {[
          { label: "Account", icon: "fa-user" , route:"/setting" },
          { label: "Genre", icon: "fa-meteor" , route:"/search"},
          { label: "Authors", icon: "fa-user-pen", route: "/authors" },
          { label: "Narrators", icon: "fa-wave-square" , route: "/narrators"},
          { label: "About us", icon: "fa-users", route: "/aboutus" },
          { label: "FAQ", icon: "fa-question" , route: "/faq"},
          { label: "Support", icon: "fa-comment" , route: "/support"},

        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.4}
            className="flex-row items-center my-2 p-4  rounded-full"          style={{
              borderRadius: 50,
              shadowColor: "black",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 2,
              backgroundColor: "white",
            }}
            onPress={() => router.push(`${item.route}`)}
          >
            <FontAwesomeIcon icon={item.icon} size={22} />
            <Text className="px-4 font-primaryBlack">{item.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={()=>router.push('/contact')}
          className="flex-row justify-center bg-primary items-center my-2 p-4  rounded-full"
        >
          <Text className="px-4 text-white  font-primaryBlack">
            work with us
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={()=>router.push('/terms')} className='flex-row'>
        <Text className=" text-gray-500 font-primaryRegular flex-1">
          Terms and Conditions
        </Text>
        <FontAwesomeIcon icon="fa-circle-exclamation" color="#FF9100" size={22} />
      </TouchableOpacity>
    </SafeAreaView>
  );
});

export default SideBar;
