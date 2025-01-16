import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = async () => {
  try {
    const response = await axios.get(API_URL, {
      timeout: 5000, // 5 seconds timeout
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // outside the range of 2xx
      console.error("Server responded with an error:", error.response.data);
      throw new Error(`Server Error: ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      throw new Error("Network Error: No response received from server");
    } else if (error.code === "ECONNABORTED") {
      // Timeout error
      console.error("Request timeout:", error.message);
      throw new Error("Request timeout: The server took too long to respond");
    } else {
      // Generic error
      console.error("Error occurred:", error.message);
      throw new Error("An unexpected error occurred");
    }
  }
};
