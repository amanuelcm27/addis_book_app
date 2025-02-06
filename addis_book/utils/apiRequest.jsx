import api from "./api";

export const apiRequest = async (method, url, data = null) => {
  try {
    const response = await api[method](url, data); 
    return { success: true, data: response.data };
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
