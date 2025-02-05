import api from "./api";

export const apiRequest = async (method, url, data = null) => {
  try {
    const response = await api[method](url, data); 
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message || "An error occurred" }; // Return error with flag
  }
};
