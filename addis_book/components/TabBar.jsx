
import { View, TouchableOpacity } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
export function TabBar({ state, descriptors, navigation }) {
    const { colors } = useTheme();
  
    return (
      <View className="flex-row h-20 shadow-md p-4 shadow-black bg-white mx-2 my-4 rounded-full items-center"
      style={{
        position: 'absolute',  // Fix the TabBar at the bottom
        bottom: 0,             // Keep it at the bottom
        left: 0,
        right: 0,
        zIndex: 1,            
      }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };
  
          const color = isFocused ? "#f0f0eb" : colors.text;
  
          return (
            <TouchableOpacity
              key={route.name}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: "center" }}
            >
              {options.tabBarIcon &&
                options.tabBarIcon({ color, focused: isFocused })}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  