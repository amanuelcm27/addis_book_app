import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import EmptyCard from "../../components/EmptyCard";
import images from "../../constants/images";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { apiRequest } from "../../utils/apiRequest";
import InfoCard from "../../components/InfoCard";

const Library = () => {
  const [library, setLibrary] = useState([]);
  const [info , setInfo] = useState(null);
  const fetchLibrary = async () => { 
    const response = await apiRequest('get' , '/library');
    if(response.success){
      setLibrary(response.data);
      console.log(response.data);
    }
    else {
      setInfo(response.error)
    }
  }
  useEffect(() => {
    fetchLibrary();
  }, []);

  return ( 
    <View>
      <InfoCard  info={info} setInfo={setInfo} />
      {library.length > 0 ? (
        <ScrollView>
          <View className="mx-4 my-4">
            <Text className="font-primaryBlack text-2xl">Books owned</Text> 

            {library.map((item) => <View className="bg-white rounded-lg my-2">
              <View key={item.id} className="flex-row items-center h-[80px] rounded-lg overflow-hidden">
                <Image source={{uri:item?.book?.cover}} className="w-[25%] h-full" />
                <View className="p-4 flex-1">
                  <Text className="text-xl font-primaryBold" numberOfLines={1}>
                    {item?.book.title}
                  </Text>
                  <Text className="text-sm font-primaryRegular">
                    by <Text className="text-gray-500">{item?.book?.author}</Text>
                  </Text>
                </View>
                <TouchableOpacity className="p-4 mt-auto">
                  <FontAwesomeIcon icon="fa-book-open" size={24} />
                </TouchableOpacity>
              </View>
              
            </View>)}
            
          </View>
        </ScrollView> 
      ) : (
        <EmptyCard goto={'/ebook'} text={'Your Library is empty '} buttonText={'Buy here'} />
      )}
    </View>
  );
};

export default Library;
