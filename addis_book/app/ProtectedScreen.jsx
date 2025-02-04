import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";
import { router, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native-animatable";

const ProtectedScreen = ({ children }) => {
  const { user, loading } = useAuth();
  const pathname = usePathname(); // Get current screen path
  console.log("log from ProtectedScreen", pathname);
  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user]);

  if (loading) {
    return (
      <SafeAreaView className="h-full justify-center items-center">
        <ActivityIndicator size="large" color="#FF9100" />
      </SafeAreaView>
    );
  }

  if (!user)
    return (
      <SafeAreaView className="h-full justify-center items-center">
        <ActivityIndicator size="large" color="#FF9100" />
      </SafeAreaView>
    );

  return children;
};

export default ProtectedScreen;
