import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useState, useEffect } from "react";

const InfoCard = ({ info, setInfo }) => {
  const [scaleAnim] = useState(new Animated.Value(0)); 
  const [opacityAnim] = useState(new Animated.Value(0)); 
  const [isVisible, setIsVisible] = useState(false); 

  useEffect(() => {
    if (info) {
      setIsVisible(true); 
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1, 
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1, 
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
    
  }, [info]); 

  const handleClose = () => {
    setIsVisible(false); 
    setInfo(""); 
  };

  return (
    <>
      {isVisible && (
        <View className="bg-transparent flex justify-center items-center h-full w-full absolute z-10 top-0">
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }], 
              opacity: opacityAnim, 
            }}
            className="bg-white p-6 h-[170px] w-[80%] rounded-lg shadow-sm"
          >
            <Text className="font-primarySemiBold py-4 text-black">{info}</Text>
            <TouchableOpacity
              onPress={handleClose} 
              className="bg-primary p-2 mt-auto rounded-full items-center w-1/4"
            >
              <Text className="text-white font-primaryBlack">Got it</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </>
  );
};

export default InfoCard;
