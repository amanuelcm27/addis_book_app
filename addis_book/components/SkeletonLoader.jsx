import React, { useEffect, useRef, useState } from "react";
import { Animated, View, StyleSheet } from "react-native";

const Skeleton = ({ isLoading, children, customStyles }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isLoading]);

  if (!isLoading) return children;

  return (
    <View
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setLayout({ width, height });
      }}
      className={`${customStyles}`} // Ensure it takes the full width
    >
      {layout && (
        <Animated.View
          style={[
            styles.skeleton,
            { opacity, width: layout.width, height: layout.height },
          ]}
        />
      )}
      <View style={{ opacity: 0 }}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default Skeleton;
