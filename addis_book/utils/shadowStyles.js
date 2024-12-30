import { StyleSheet } from "react-native";

const shadowStyles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8, // Android shadow
    backgroundColor: "white",
  },
});

export default shadowStyles;
