import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import * as SecureStore from "expo-secure-store";
import api from "../utils/api";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const network = useNetInfo();
  const loadUser = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      if (token) {
        const { data } = await api.get("user/");
        setUser(data);
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const { data } = await api.post("token/", credentials);
      await SecureStore.setItemAsync("access_token", data.access);
      await SecureStore.setItemAsync("refresh_token", data.refresh);
      await loadUser();
      return { success: true };
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            return { success: false, error: "Invalid username or password" };
          case 400:
            return { success: false, error: "Bad request, please try again" };
          default:
            return {
              success: false,
              error: "Network error or something went wrong",
            };
        }
      } else {
        return {
          success: false,
          error: "Network error, please check your connection",
        };
      }
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    setUser(null);
  };
  useEffect(() => {
    loadUser();
  }, []);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state,) =>{
      setIsOffline(!state.isConnected);
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    }) 
    return () => unsubscribe();
  }, []);
  


  const authValue = useMemo(
    () => ({ user, loading, isOffline, login, logout, loadUser }),
    [user, loading]
  );
  
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
