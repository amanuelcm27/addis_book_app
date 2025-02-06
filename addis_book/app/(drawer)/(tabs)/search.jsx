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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { counter } from "@fortawesome/fontawesome-svg-core";
import { set } from "react-native-reanimated";
import InfoCard from "../../../components/InfoCard";
import Skeleton from "../../../components/SkeletonLoader";

const Search = () => {
  const [sampleBooks, setSampleBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const fetchSampleBooks = async () => {
    setLoading(true);
    const response = await apiRequest("get", "/books");
    if (response.success) {
      setSampleBooks(response.data);
      setFilteredBooks(response.data);
    } else {
      setInfo(response.error);
    }
    setLoading(false);
  };

  const fetchGenres = async () => {
    setLoading(true);
    const response = await apiRequest("get", "/genres");
    if (response.success) {
      setGenres(response.data);
    } else {
      setInfo(response.error);
    }
    setLoading(false);
  };

  const searchBook = async () => {
    if (!searchText) return;
    setLoading(true);
    const response = await apiRequest("get", `/search?book=${searchText}`);
    if (response.success) {
      setFilteredBooks(response.data);
    } else {
      setInfo(response.error);
    }
    setLoading(false);
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
    if (selectedGenres.length === 0) {
      setFilteredBooks(sampleBooks); 
      return;
    }
    setLoading(true);
    const response = await apiRequest(
      "get",
      `/filter?genres=${selectedGenres}`
    );
    if (response.success) {
      setFilteredBooks(response.data);
    } else {
      setInfo(response.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSampleBooks();
    fetchGenres();
  }, []);

  useEffect(() => {
    filterByGenres();
  }, [selectedGenres]);

  return (
    <>
      <InfoCard info={info} setInfo={setInfo} />
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
          <View className="mx-4  my-4">
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
                      <Text
                        className={isSelected ? "text-white" : "text-black"}
                      >
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
            {selectedGenres.length > 0 && (
              <View className="flex-row items-center">
                <Text>{selectedGenres.length} filter applied</Text>
                <TouchableOpacity
                  className="ml-auto flex-row items-center rounded-full bg-[#f7f7f7] p-2 "
                  onPress={() => setSelectedGenres([])}
                >
                  <Text className="font-primaryRegular">clear filters </Text>
                  <FontAwesomeIcon icon="fa-close" />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View className="flex-row flex-wrap justify-between mx-4 my-6">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} isLoading={true}>
                    <View
                      className="h-[300px] w-[170px] m-2 relative rounded-xl bg-white overflow-hidden"
                    ></View>
                  </Skeleton>
                ))
              : filteredBooks.map((book) => (
                  <LargeBookCard
                    key={book.id}
                    styles="w-[48%] mb-4"
                    item={book}
                  />
                ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Search;
