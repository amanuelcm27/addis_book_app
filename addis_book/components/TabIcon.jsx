import React from "react";
import { View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as Animatable from 'react-native-animatable';  

const TabIcon = ({ icon, name, focused }) => {
  return (
    <Animatable.View
      animation={focused ? "jello" : ""}  
      duration={500}
      className="flex-row items-center px-2 py-2"
      style={{
        backgroundColor: focused ? 'white' : 'transparent', 
        borderRadius: 50,
        // Apply shadow for iOS and elevation for Android
        shadowOffset: { width: 5, height: 0 },
        shadowColor: 'black',
        shadowOpacity: focused ? 0.5 : 0,  
        shadowRadius: 5,
        elevation: focused ? 2 : 0,  // Elevation for Android when focused
        zIndex: focused ? 1 : 0,
      }}
    >
      <View className="m-2">
        <FontAwesomeIcon icon={icon} size={16} />
      </View>
      {focused && <Text className="font-primaryBlack text-sm">{name}</Text>}
    </Animatable.View>
  );
};

export default TabIcon;
