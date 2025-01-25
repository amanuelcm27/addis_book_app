import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import BackButton from "../../components/BackButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const faq = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const faqs = [
    { question: "Can I unsubscribe?", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit..." },
    { question: "How do I update my profile?", answer: "To update your profile, go to Settings and..." },
    { question: "What is the refund policy?", answer: "Our refund policy states that you must request a refund within 30 days..." },
    { question: "Can I change my email address?", answer: "Yes, you can change your email address by navigating to Account Settings." },
    { question: "What payment methods are accepted?", answer: "We accept credit cards, PayPal, and other major payment methods." },

  ];
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  return (
    <SafeAreaView>
      <View className="h-full">
        <View style={{ margin: 20, marginBottom: 5 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesomeIcon icon="fa-angle-left" size={30} />
          </TouchableOpacity>
        </View>
        <View className="m-6 flex-1">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="font-primaryBlackItalic text-2xl my-2">FAQ</Text>
            {faqs.map((faq, index) => (
              <View
                key={index}
                className="p-4 my-4"
                style={{borderRadius:10 ,
                  shadowColor:'black',
                  shadowOffset:{width:0,height:2},
                  shadowOpacity:0.3,
                  shadowRadius:10,
                  elevation:2,
                  backgroundColor:'white',

                }}
              >
                <TouchableOpacity
                  onPress={() => toggleExpand(index)}
                  className="flex-row justify-center items-center"
                >
                  <Text className="font-primaryRegular flex-1">
                    {faq.question}
                  </Text>
                  <FontAwesomeIcon
                    icon={expandedIndex === index ? "fa-sort-up" : "fa-sort-down"}
                    size={20}
                  />
                </TouchableOpacity>
                {expandedIndex === index && (
                  <View className="mt-4">
                    <Text className="font-primaryRegular">{faq.answer}</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
          <BackButton />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default faq;

