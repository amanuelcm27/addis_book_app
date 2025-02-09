import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import shadowStyles from "../../constants/shadowStyles";
import CustomButton from "../../components/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { apiRequest } from "../../utils/apiRequest";
import BasicBox from "../../components/BasicBox";
import PremiumBox from "../../components/PremiumBox";
import InfoCard from "../../components/InfoCard"
import { useAuth } from "../../context/AuthContext";
import { router, useLocalSearchParams } from "expo-router";

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading , setLoading ] = useState(false)
  const handleSelect = (planId) => {
    setSelectedPlan(planId);
  };
  const { loadUser } = useAuth();
  const { redirect } = useLocalSearchParams();
  console.log(redirect)
  const fetchPlans = async () => {
    const response = await apiRequest("get", "/plans");
    if (response.success) {
      setPlans(response.data); 
    } else {
      setInfo(response.error);
    }
  };
  const subscribe = async () => {
    if (!selectedPlan) {
      setInfo("Select a plan")
      return;
    }
    setLoading(true)
    const response = await apiRequest('post', '/subscribe/' , {"plan_id": selectedPlan})
    if (response.success) {
      setInfo("Subscribed Successfully")
      loadUser();
      router.replace(redirect ? decodeURIComponent(redirect) : "/setting");
    }
    else {
      setInfo(response.error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <View className="h-full bg-white">
      <InfoCard info={info} setInfo={setInfo} />
      <View className="h-[40%]">
        <Image source={images.bookcol} className="w-full h-full" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="my-2">
          <Text className="text-black text-2xl text-center font-primaryBlackItalic">
            Unlimited Reading
          </Text>
          <View className="mx-6 items-center justify-center h-full flex-row gap-2">
            <View className="w-1/2">
              {plans
                .filter((plan) => plan.type === "Basic")
                .map((plan) => (
                  <BasicBox
                    key={plan.id}
                    plan={plan}
                    selectedPlan={selectedPlan}
                    handleSelect={handleSelect}
                  />
                ))}
            </View>

            <View className="flex-1">
              {plans
                .filter((plan) => plan.type === "Premium")
                .map((plan) => (
                  <PremiumBox
                    key={plan.id}
                    plan={plan}
                    selectedPlan={selectedPlan}
                    handleSelect={handleSelect}
                  />
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <CustomButton
        text={"Continue"}
        textColor="text-white"
        background="bg-black"
        onClick={subscribe}
        isLoading={loading}
      />
      <TouchableOpacity className="ml-auto mb-4 mr-8">
        <FontAwesomeIcon
          icon="fa-circle-exclamation"
          color="#FF9100"
          size={22}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Subscription;
