import React, { createContext, useContext, useEffect, useState } from "react";
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
    } catch (error) {
      console.error("Login failed:", error);
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

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
