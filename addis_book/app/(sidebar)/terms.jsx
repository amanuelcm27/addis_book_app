import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import BackButton from "../../components/BackButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import shadowStyles from "../../utils/shadowStyles";

const Terms = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const terms = [
    {
      term: "Legal Policy",
      policy:
        "Users must comply with all applicable local, state, national, and international laws and regulations when using the platform.",
    },
    {
      term: "Privacy Policy",
      policy:
        "We respect your privacy and are committed to protecting your personal data. Please refer to our detailed Privacy Policy for information on data collection and usage.",
    },
    {
      term: "Refund Policy",
      policy:
        "Refunds are available for requests made within 30 days of purchase. Refund eligibility is subject to meeting specific conditions outlined in the Refund Policy.",
    },
    {
      term: "User Conduct Policy",
      policy:
        "Users are prohibited from posting harmful, offensive, or illegal content. Violations may result in account suspension or termination.",
    },
    {
      term: "Content Ownership",
      policy:
        "All content uploaded by users remains their property. By uploading, users grant the platform a license to use the content for operational purposes.",
    },
    {
      term: "Payment Policy",
      policy:
        "Payments must be made via accepted methods, including credit card and PayPal. All transactions are processed securely.",
    },
    {
      term: "Account Suspension Policy",
      policy:
        "Accounts may be suspended or terminated if users violate terms or engage in fraudulent activities. Appeals may be submitted for review.",
    },
    {
      term: "Modification of Services",
      policy:
        "We reserve the right to modify or discontinue services without prior notice. Significant changes will be communicated to users.",
    },
    {
      term: "Dispute Resolution",
      policy:
        "All disputes will be resolved through arbitration or mediation, as outlined in the dispute resolution section of our terms.",
    },
    {
      term: "Intellectual Property Policy",
      policy:
        "All intellectual property rights related to the platform, including trademarks and software, are owned by the platform or its licensors.",
    },
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
        <View className="m-4 flex-1">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="font-primaryBlackItalic text-2xl my-2">
              Terms & Conditions
            </Text>
            {terms.map((term, index) => (
              <View
                key={index}
                className="p-4 my-4"
                style={{
                  borderRadius: 10,
                  shadowColor: "black",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 10,
                  elevation: 2,
                  backgroundColor: "white",
                }}
              >
                <TouchableOpacity
                  onPress={() => toggleExpand(index)}
                  className="flex-row items-center"
                >
                  <Text className="font-primaryRegular flex-1">
                    {term.term}
                  </Text>
                  <FontAwesomeIcon
                    icon={
                      expandedIndex === index ? "fa-sort-up" : "fa-sort-down"
                    }
                    size={20}
                  />
                </TouchableOpacity>
                {expandedIndex === index && (
                  <View className="mt-4">
                    <Text className="font-primaryRegular">{term.policy}</Text>
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

export default Terms;
