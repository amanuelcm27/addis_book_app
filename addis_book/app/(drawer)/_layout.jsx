import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import SideBar from "../(sidebar)/sidebar";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: 320,  // Adjust the width of the drawer
            backgroundColor: "white",  // Ensure the background is set for smooth transition
          },
          drawerType: "slide",  // Try "slide" for smooth transitions
          overlayColor: "rgba(0, 0, 0, 0.5)",  // Optional: add overlay when drawer is open
          drawerPosition: "left",  // Position of the drawer
          gestureHandlerProps: {
            activeOffsetX: [-10, 10], // Adjust swipe sensitivity for smoother animations
          },
        }}
        drawerContent={(props) => <SideBar {...props} />}
      >
        <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Home" }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
