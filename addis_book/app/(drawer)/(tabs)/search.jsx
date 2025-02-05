import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../../components/FormField";
import LargeBookCard from "../../../components/LargeBookCard";
import ContentHeader from "../../../components/ContentHeader";
import { apiRequest } from "../../../utils/apiRequest";

const Search = () => {
  const [sampleBooks, setSampleBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const fetchSampleBooks = async () => {
    const response = await apiRequest("get", "/books");
    if (response.success) {
      setSampleBooks(response.data);
      setFilteredBooks(response.data);
    } else {
      console.log(response.error);
    }
  };

  const fetchGenres = async () => {
    const response = await apiRequest("get", "/genres");
    if (response.success) {
      setGenres(response.data);
    } else {
      console.log(response.error);
    }
  };

  const searchBook = async () => {
    if (!searchText) return;
    const response = await apiRequest("get", `/search?book=${searchText}`);
    if (response.success) {
      setFilteredBooks(response.data);
    } else {
      console.log(response.error);
    }
  };

  const clearSearch = () => {
    setSearchText("");
    fetchSampleBooks();
  };

  const toggleGenreSelection = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id)
        ? prev.filter((genreId) => genreId !== id)
        : [...prev, id]
    );
  };

  const filterByGenres = async () => {
    console.log(selectedGenres);
    // if (selectedGenres.length === 0) {
    //   setFilteredBooks(sampleBooks); // Reset to all books if no genre is selected
    //   return;
    // }

    // const response = await apiRequest("get", `/filter?genres=${selectedGenres.join(",")}`);
    // if (response.success) {
    //   setFilteredBooks(response.data);
    // } else {
    //   console.log(response.error);
    // }
  };

  useEffect(() => {
    fetchSampleBooks();
    fetchGenres();
  }, []);

  useEffect(() => {
    filterByGenres();
  }, [selectedGenres]);

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <ContentHeader text={"Search for Books"} icon={"fa-search"} />
        <View>
          <FormField
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={searchBook}
            containerStyle="mx-4"
            inputContainerStyle="rounded-[50px]"
            inputStyle="text-black font-primaryRegular"
            placeholder="Search by title"
            returnKeyType="search"
            type="search"
            otherFunction={clearSearch}
          />
        </View>
        <View className="mx-4 items-center my-4">
          <FlatList
            data={genres}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const isSelected = selectedGenres.includes(item.id);
              return (
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => toggleGenreSelection(item.id)}
                >
                  <View
                    className={`rounded-full my-2 p-4 shadow-sm shadow-black ${
                      isSelected ? "bg-[#FF9100]" : "bg-white"
                    }`}
                  >
                    <Text className={isSelected ? "text-white" : "text-black"}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 4 }}
          />
        </View>
        <View className="flex-row flex-wrap justify-between mx-4 my-6">
          {filteredBooks.length > 0 &&
            filteredBooks
              .slice(0, 4)
              .map((book) => (
                <LargeBookCard
                  key={book.id}
                  styles="w-[48%] mb-4"
                  item={book}
                />
              ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
