import { View, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../../components/FormField";
import LargeBookCard from "../../../components/LargeBookCard";
import ContentHeader from "../../../components/ContentHeader";
import { apiRequest } from "../../../utils/apiRequest";
import InfoCard from "../../../components/InfoCard";
import Skeleton from "../../../components/SkeletonLoader";
import GenreList from "../../../components/GenreList";

const LIMIT = 10;

const Search = () => {
  const [sampleBooks, setSampleBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [offset, setOffset] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchSampleBooks = async () => {
    setLoading(true);
    const response = await apiRequest("get", "/books/");
    if (response.success) {
      setSampleBooks(response.data.results);
    } else {
      setInfo(response.error);
    }
    setLoading(false);
  };

  const fetchGenres = async () => {
    const response = await apiRequest("get", "/genres/");
    if (response.success) {
      setGenres(response.data);
    } else {
      setInfo(response.error);
    }
  };

  const searchBook = async (newOffset = 0, append = false) => {
    if (!searchText.trim()) return; // Prevent empty searches
    console.log("search term ", searchText);
    if (newOffset === 0) {
      setFilteredBooks([]); // Reset book list for new search
      setHasMore(true); // Reset pagination
    }
    if (!hasMore) return;
    console.log("has more to load", hasMore);

    setLoading(newOffset === 0);
    setLoadingMore(newOffset > 0);

    const response = await apiRequest(
      "get",
      `/search/?book=${searchText}&limit=${LIMIT}&offset=${newOffset}`
    );

    if (response.success) {
      setHasMore(response.data.next !== null);
      setFilteredBooks((prevBooks) =>
        append
          ? [...prevBooks, ...response.data.results]
          : response.data.results
      );
      setOffset(newOffset);
    } else {
      setInfo(response.error);
    }

    setLoading(false);
    setLoadingMore(false);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      searchBook(offset + LIMIT, true);
    }
  };

  const clearSearch = () => {
    setSearchText("");
    setFilteredBooks([]);
    setHasMore(true);
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
        <ContentHeader text="Search for Books" icon="fa-search" />

        {/* Search Input */}
        <View>
          <FormField
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              setHasMore(true); // Reset hasMore for new searches
            }}
            onSubmitEditing={() => searchBook(0)}
            containerStyle="mx-4"
            inputContainerStyle="rounded-[50px]"
            inputStyle="text-black font-primaryRegular"
            placeholder="Search by title"
            returnKeyType="search"
            type="search"
            otherFunction={clearSearch}
          />
        </View>

        {/* Genre List */}
        <GenreList
          genres={genres}
          selectedGenres={selectedGenres}
          toggleGenreSelection={toggleGenreSelection}
          setSelectedGenres={setSelectedGenres}
        />

        {/* Book List */}
        {loading ? (
          <View className="flex-row flex-wrap justify-between mx-4 my-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} isLoading={true} customStyles="w-[48%]">
                <View className="h-[300px] w-[170px] m-2 relative rounded-xl bg-white overflow-hidden" />
              </Skeleton>
            ))}
          </View>
        ) : (
          <FlatList
            data={filteredBooks.length > 0 ? filteredBooks : sampleBooks}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginHorizontal: 16,
            }}
            renderItem={({ item }) => (
              <LargeBookCard key={item.id} styles="w-[48%] mb-4" item={item} />
            )}
            showsVerticalScrollIndicator={false}
            onEndReached={filteredBooks.length > 0 ? handleLoadMore : null}
            onEndReachedThreshold={0.4}
            ListFooterComponent={
              loadingMore ? (
                <ActivityIndicator size="large" color="#FF9100" />
              ) : null
            }
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default Search;
