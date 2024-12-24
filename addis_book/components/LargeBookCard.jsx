import { View, Text, Image } from "react-native";

import React from "react";

const LargeBookCard = ({ source }) => {
  return (
    <View
      className="h-[300px] w-[200px] rounded-xl bg-white "
      style={{
        shadowOffset: { width: 5, height: 0 },
        shadowColor: "black",
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 1,
      }}
    >
      <Image className="w-full h-full rounded-xl" source={source} />
    </View>
  );
};

export default LargeBookCard;
