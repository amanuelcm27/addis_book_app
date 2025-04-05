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
import { apiRequest } from "../utils/apiRequest";

const AuthorBookFormModal = ({
  visible,
  onClose,
  onSubmit,
  setShowModal,
  genres,
  user,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    author: user.author,
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
    ebook: '',
    sample_ebook: '',
    audio_book: '',
    sample_audio: '',
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

  const prepareData = () => {
    const data = new FormData();
  
    const optionalFields = [
      "publisher", "isbn", "page_count", "duration", "edition",
      "language", "audio_book", "sample_audio",
    ];
  
    console.log("Starting to prepare FormData with:", formData);
  
    Object.entries(formData).forEach(([key, value]) => {
      console.log(`Processing field: ${key} - Value:`, value);
  
      const isOptional = optionalFields.includes(key);
      const isEmpty = value === "" || value === null || (Array.isArray(value) && value.length === 0);
  
      if (!isOptional || !isEmpty) {
        if (value !== null && typeof value === "object" && value.uri) {
          console.log(`Appending FILE to FormData: ${key}`, {
            uri: value.uri,
            name: value.name,
            type: value.type,
          });
  
          data.append(key, {
            uri: value.uri,
            name: value.name,
            type: value.type,
          });
        } else if (Array.isArray(value)) {
          value.forEach((item) => {
            console.log(`Appending ARRAY item to FormData: ${key}`, item);
            data.append(key, item);
          });
        } else {
          console.log(`Appending VALUE to FormData: ${key}`, value);
          data.append(key, value);
        }
      } else {
        console.log(`Skipping optional empty field: ${key}`);
      }
    });
  
    console.log("FormData preparation complete");
    return data;
  };
  
  

  const uploadContent = async () => {
    const data = prepareData();
    console.log("final data for uplaod", data);
    try {
      const response = await apiRequest('post', "content/", data);
      console.log("response in upload content", response);
      if (response.success) {
        console.log("successfully uploaded");
        console.log('response data' ,response.data);
      } else {
        console.log('upload failed : ' , response.error_content);
      }
    } catch (error) {
      console.log("Error in uploadContent:", error);
    }
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
          onPress={step !== totalSteps ? goToNextStep : uploadContent}
          activeOpacity={0.5}
          className={`p-4 bg-primary rounded-full`}
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
