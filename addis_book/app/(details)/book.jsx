import { View, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";

const BookDetail = () => {
  return (
    <SafeAreaView className="bg-white  h-full">
      <ImageBackground
        source={images.bookcol}
        blurRadius={5}
        className="w-full h-[150px]  "
      >

      </ImageBackground>
    </SafeAreaView>
  );
};

export default BookDetail;
