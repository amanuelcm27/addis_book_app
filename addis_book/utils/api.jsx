import axios from "axios";
import * as SecureStore from "expo-secure-store";
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL , 
});

api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("access_token");
    console.log('interceptor output' , token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => { console.log('interceptor error ', error), Promise.reject(error)}
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await SecureStore.getItemAsync("refresh_token");
        if (!refreshToken) throw new Error("No refresh token");

        const { data } = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}token/refresh/`, {
          refresh: refreshToken,
        });
        console.log('refresh interceptor function  ', data)

        await SecureStore.setItemAsync("access_token", data.access);
        await SecureStore.setItemAsync("refresh_token", data.refresh);

        api.defaults.headers.Authorization = `Bearer ${data.access}`;
        originalRequest.headers.Authorization = `Bearer ${data.access}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
