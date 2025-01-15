import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { TabBar } from "../../components/TabBar";
import TabIcon from "../../components/TabIcon";
import { StatusBar } from "expo-status-bar";

const TabLayout = () => {
  return (
    <>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={"fa-house"}
                name="Home"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="audio"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={"fa-headphones"}
                name="Audio"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={"fa-magnifying-glass"}
                name="Search"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="ebook"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={"fa-book-open"}
                name="Ebook"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="setting"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                focused={focused}
                icon={"fa-gear"}
                name="setting"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
