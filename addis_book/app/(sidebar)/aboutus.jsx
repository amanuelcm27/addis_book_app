import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BackButton from "../../components/BackButton";

const aboutus = () => {
  return (
    <SafeAreaView className="h-full">
      <View className="h-full">
        <View style={{ margin: 20, marginBottom: 5 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesomeIcon icon="fa-angle-left" size={30} />
          </TouchableOpacity>
        </View>
        <View className="m-6 flex-1">
          <Text className="font-primaryBlackItalic text-2xl">About us</Text>
          <Text className='text-justify'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia vero
            animi quam explicabo tenetur suscipit, magnam et vitae aliquam
            eligendi, rerum, quaerat minus. Quibusdam explicabo nam deserunt.
            Tenetur, assumenda magnam. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quae accusamus ratione sint, non magni sed
            accusantium adipisci nobis porro numquam commodi architecto ea
            veritatis velit iure excepturi nemo cum voluptates! Lorem ipsum
            dolor, sit amet consectetur adipisicing elit. Explicabo ipsa minus
            laudantium eos qui eius sint excepturi pariatur sed cumque modi
            numquam expedita maiores distinctio repellendus suscipit tenetur,
            facilis deleniti? Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Dolores natus porro eveniet reiciendis, dolore alias ex
            excepturi non consequuntur officia nihil est, libero corrupti
            tenetur expedita tempora. Ipsam, voluptas quam!
          </Text>
        </View>
        <BackButton />
      </View>
    </SafeAreaView>
  );
};

export default aboutus;
