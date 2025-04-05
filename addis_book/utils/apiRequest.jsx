import api from "./api";

export const apiRequest = async (method, url, data = null) => {
  try {
    const headers = data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    const response = await api[method](url, data, { headers });
    return { success: true, data: response.data };
  } catch (error) {
    const status = error.response?.status;
    const messages = {
      401: "please try again",
      400: "Bad request, please try again",
    };
    return { success: false, error: messages[status] || "Network error or something went wrong" , error_content: error};
  }
};
