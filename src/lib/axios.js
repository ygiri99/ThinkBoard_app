import axios from "axios";

// Set the base URL for all axios requests
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URI, // Use the backend URI from the environment variable
});

export default api;
