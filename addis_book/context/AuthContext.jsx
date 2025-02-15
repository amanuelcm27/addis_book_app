import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import * as SecureStore from "expo-secure-store";
import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
            return { success: false, error: "Network error or something went wrong" };
        }
      } else {
        return { success: false, error: "Network error, please check your connection" };
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

  const authValue = useMemo(() => ({ user, loading, login, logout, loadUser }), [user, loading]);

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
