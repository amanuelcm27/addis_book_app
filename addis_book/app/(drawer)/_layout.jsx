import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { memo, useCallback } from "react";
import SideBar from "../(sidebar)/sidebar";

const MemoizedSideBar = memo(SideBar);

export default function DrawerLayout() {

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 300,
        },
        drawerType:'slide'
      }}
      drawerContent={(props) => <MemoizedSideBar {...props} />}
    >
      <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Home" }} />
    </Drawer>
  );
}
