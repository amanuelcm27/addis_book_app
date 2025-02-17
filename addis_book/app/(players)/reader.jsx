import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Pdf from "react-native-pdf";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ReaderHeader from "../../components/ReaderHeader";
import ReaderFooter from "../../components/ReaderFooter";

const Reader = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [totalNoPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // Keep track of current page
  const [isInputVisible, setInputVisible] = useState(false); // Show text input for page jump
  const [pageInput, setPageInput] = useState(""); // Store the page number input by user
  const { fileUri, book_id, title } = useLocalSearchParams();
  const pdfRef = useRef(null); // Reference for Pdf component
  const menuOptions = [
    {
      id: "1",
      title: "Downloads",
      icon: "download",
      route: "/setting?initialTab=3",
    },
    {
      id: "2",
      title: "Purchases",
      icon: "cart",
      route: "/setting?initialTab=2",
    },
    {
      id: "3",
      title: "Details",
      icon: "information-circle",
      route: `/book/${book_id}`,
    },
  ];

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalNoPages) {
      setCurrentPage(page - 1);
      setInputVisible(false);
      if (pdfRef.current) {
        pdfRef.current.setPage(page);
      }
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
        <ReaderHeader setMenuVisible={setMenuVisible} title={title} />
        <Pdf
          ref={pdfRef} // Reference the Pdf component
          trustAllCerts={false}
          source={{ uri: fileUri }}
          style={{ flex: 1 }}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          onPageChanged={(page, numberOfPages) => {
            setCurrentPage(page);
            setTotalPages(numberOfPages);
          }}
          onError={(error) => {
            console.log("Error loading PDF:", error);
          }}
        />
        <ReaderFooter
          isInputVisible={isInputVisible}
          pageInput={pageInput}
          setPageInput={setPageInput}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalNoPages={totalNoPages}
          setInputVisible={setInputVisible}
        />
        <Modal transparent={true} visible={menuVisible} animationType="fade">
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setMenuVisible(false)}
          />
          <View
            style={{
              position: "absolute",
              top: 60,
              right: 10,
              backgroundColor: "white",
              borderRadius: 8,
              elevation: 5,
            }}
          >
            <FlatList
              data={menuOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 20,
                  }}
                  onPress={() => router.push(item.route)}
                >
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color="black"
                    style={{ marginRight: 10 }}
                  />
                  <Text style={{ fontSize: 16 }}>{item.title}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ width: 200 }}
            />
          </View>
        </Modal>
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#FF9100" />
    </>
  );
};

export default Reader;
