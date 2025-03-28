import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Step1 from "./Forms/Step1";
import Step2 from "./Forms/Step2";
import Step3 from "./Forms/Step3";
import Step4 from "./Forms/Step4";

const AuthorBookFormModal = ({
  visible,
  onClose,
  onSubmit,
  setShowModal,
  genres,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    narrator: "",
    publisher: "",
    price: "",
    currency: "USD",
    isbn: "",
    cover: null,
    summary: "",
    genres: [],
    page_count: "",
    duration: "",
    published: "",
    edition: "",
    language: "",
    ebook: null,
    sample_ebook: null,
    audio_book: null,
    sample_audio: null,
  });
  const [info, setInfo] = useState(null);
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const goToNextStep = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };
  const goToPreviousStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };
  const renderCurrentStep = () => {
    const steps = {
      1: <Step1 formData={formData} setFormData={setFormData} />,
      2: <Step2 formData={formData} setFormData={setFormData} />,
      3: (
        <Step3 formData={formData} setFormData={setFormData} genres={genres} />
      ),
      4: <Step4 formData={formData} setFormData={setFormData} />,
    };
    return steps[step] || <Step1 />;
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View className="m-4 flex-row items-center">
        <Text className="flex-1 font-primaryBlack text-2xl">Adding Book</Text>
        <TouchableOpacity onPress={() => setShowModal(false)}>
          <FontAwesomeIcon icon="fa-close" size={24} />
        </TouchableOpacity>
      </View>
      {renderCurrentStep()}
      <View className="flex-row bg-white items-center justify-between m-6">
        <TouchableOpacity
          onPress={goToPreviousStep}
          activeOpacity={0.2}
          className={`border p-4 rounded-full ${
            step === 1 ? "opacity-50" : ""
          }`}
          disabled={step === 1}
        >
          <FontAwesomeIcon icon="fa-angle-left" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToNextStep}
          activeOpacity={0.5}
          className={`p-4 bg-primary rounded-full`}
          disabled={step === totalSteps}
        >
          <Text className="text-white font-primaryBlack">
            {step === totalSteps ? "Upload" : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AuthorBookFormModal;
